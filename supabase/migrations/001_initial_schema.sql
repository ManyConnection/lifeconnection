-- ============================================================
-- LifeConnection Task Management - Initial Schema
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. profiles (auth.users の拡張)
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 2. projects
-- ============================================================
create table public.projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  key text not null,  -- e.g. "PROJ" for task numbering like PROJ-1
  description text default '',
  color text not null default '#8b5cf6', -- violet-500
  owner_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_key_unique unique (key)
);

-- ============================================================
-- 3. project_members
-- ============================================================
create type public.project_role as enum ('admin', 'member', 'viewer');

create table public.project_members (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.project_role not null default 'member',
  created_at timestamptz not null default now(),
  constraint project_members_unique unique (project_id, user_id)
);

-- ============================================================
-- 4. labels
-- ============================================================
create table public.labels (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  color text not null default '#8b5cf6',
  created_at timestamptz not null default now(),
  constraint labels_project_name_unique unique (project_id, name)
);

-- ============================================================
-- 5. tasks
-- ============================================================
create type public.task_status as enum ('open', 'in_progress', 'in_review', 'done', 'closed');
create type public.task_priority as enum ('low', 'medium', 'high', 'critical');

create table public.tasks (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  task_number integer not null, -- auto-incremented per project via trigger
  title text not null,
  description text default '',
  status public.task_status not null default 'open',
  priority public.task_priority not null default 'medium',
  assignee_id uuid references public.profiles(id) on delete set null,
  parent_task_id uuid references public.tasks(id) on delete set null,
  start_date date,
  due_date date,
  sort_order integer not null default 0,
  created_by uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tasks_project_number_unique unique (project_id, task_number)
);

-- ============================================================
-- 6. task_labels (多対多)
-- ============================================================
create table public.task_labels (
  task_id uuid not null references public.tasks(id) on delete cascade,
  label_id uuid not null references public.labels(id) on delete cascade,
  primary key (task_id, label_id)
);

-- ============================================================
-- 7. task_dependencies (ガントチャート用)
-- ============================================================
create type public.dependency_type as enum ('finish_to_start', 'start_to_start', 'finish_to_finish', 'start_to_finish');

create table public.task_dependencies (
  id uuid primary key default uuid_generate_v4(),
  predecessor_id uuid not null references public.tasks(id) on delete cascade,
  successor_id uuid not null references public.tasks(id) on delete cascade,
  dependency_type public.dependency_type not null default 'finish_to_start',
  created_at timestamptz not null default now(),
  constraint task_dependencies_unique unique (predecessor_id, successor_id)
);

-- ============================================================
-- 8. task_comments
-- ============================================================
create table public.task_comments (
  id uuid primary key default uuid_generate_v4(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_tasks_project_id on public.tasks(project_id);
create index idx_tasks_status on public.tasks(status);
create index idx_tasks_assignee_id on public.tasks(assignee_id);
create index idx_tasks_due_date on public.tasks(due_date);
create index idx_tasks_parent_task_id on public.tasks(parent_task_id);
create index idx_tasks_sort_order on public.tasks(project_id, status, sort_order);
create index idx_task_labels_task_id on public.task_labels(task_id);
create index idx_task_labels_label_id on public.task_labels(label_id);
create index idx_task_comments_task_id on public.task_comments(task_id);
create index idx_project_members_user_id on public.project_members(user_id);
create index idx_project_members_project_id on public.project_members(project_id);

-- ============================================================
-- TRIGGERS: updated_at 自動更新
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profiles_updated
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger on_projects_updated
  before update on public.projects
  for each row execute function public.handle_updated_at();

create trigger on_tasks_updated
  before update on public.tasks
  for each row execute function public.handle_updated_at();

create trigger on_task_comments_updated
  before update on public.task_comments
  for each row execute function public.handle_updated_at();

-- ============================================================
-- TRIGGER: task_number 自動採番 (プロジェクト毎)
-- ============================================================
create or replace function public.handle_task_number()
returns trigger as $$
begin
  select coalesce(max(task_number), 0) + 1
  into new.task_number
  from public.tasks
  where project_id = new.project_id;
  return new;
end;
$$ language plpgsql;

create trigger on_task_number
  before insert on public.tasks
  for each row execute function public.handle_task_number();

-- ============================================================
-- TRIGGER: 新規ユーザー → profiles 自動作成
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- TRIGGER: プロジェクト作成時にオーナーをadminとして自動追加
-- ============================================================
create or replace function public.handle_project_owner_member()
returns trigger as $$
begin
  insert into public.project_members (project_id, user_id, role)
  values (new.id, new.owner_id, 'admin');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_project_created
  after insert on public.projects
  for each row execute function public.handle_project_owner_member();

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================

-- profiles
alter table public.profiles enable row level security;

create policy "Users can view all profiles"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (id = auth.uid());

-- projects
alter table public.projects enable row level security;

create policy "Members can view projects"
  on public.projects for select
  to authenticated
  using (
    exists (
      select 1 from public.project_members
      where project_members.project_id = projects.id
        and project_members.user_id = auth.uid()
    )
  );

create policy "Authenticated users can create projects"
  on public.projects for insert
  to authenticated
  with check (owner_id = auth.uid());

create policy "Project admins can update projects"
  on public.projects for update
  to authenticated
  using (
    exists (
      select 1 from public.project_members
      where project_members.project_id = projects.id
        and project_members.user_id = auth.uid()
        and project_members.role = 'admin'
    )
  );

create policy "Project admins can delete projects"
  on public.projects for delete
  to authenticated
  using (
    exists (
      select 1 from public.project_members
      where project_members.project_id = projects.id
        and project_members.user_id = auth.uid()
        and project_members.role = 'admin'
    )
  );

-- project_members
alter table public.project_members enable row level security;

create policy "Members can view project members"
  on public.project_members for select
  to authenticated
  using (
    exists (
      select 1 from public.project_members as pm
      where pm.project_id = project_members.project_id
        and pm.user_id = auth.uid()
    )
  );

create policy "Project admins can manage members"
  on public.project_members for insert
  to authenticated
  with check (
    exists (
      select 1 from public.project_members as pm
      where pm.project_id = project_members.project_id
        and pm.user_id = auth.uid()
        and pm.role = 'admin'
    )
  );

create policy "Project admins can update members"
  on public.project_members for update
  to authenticated
  using (
    exists (
      select 1 from public.project_members as pm
      where pm.project_id = project_members.project_id
        and pm.user_id = auth.uid()
        and pm.role = 'admin'
    )
  );

create policy "Project admins can remove members"
  on public.project_members for delete
  to authenticated
  using (
    exists (
      select 1 from public.project_members as pm
      where pm.project_id = project_members.project_id
        and pm.user_id = auth.uid()
        and pm.role = 'admin'
    )
  );

-- labels
alter table public.labels enable row level security;

create policy "Members can view labels"
  on public.labels for select
  to authenticated
  using (
    exists (
      select 1 from public.project_members
      where project_members.project_id = labels.project_id
        and project_members.user_id = auth.uid()
    )
  );

create policy "Admins/members can manage labels"
  on public.labels for insert
  to authenticated
  with check (
    exists (
      select 1 from public.project_members
      where project_members.project_id = labels.project_id
        and project_members.user_id = auth.uid()
        and project_members.role in ('admin', 'member')
    )
  );

create policy "Admins/members can update labels"
  on public.labels for update
  to authenticated
  using (
    exists (
      select 1 from public.project_members
      where project_members.project_id = labels.project_id
        and project_members.user_id = auth.uid()
        and project_members.role in ('admin', 'member')
    )
  );

create policy "Admins can delete labels"
  on public.labels for delete
  to authenticated
  using (
    exists (
      select 1 from public.project_members
      where project_members.project_id = labels.project_id
        and project_members.user_id = auth.uid()
        and project_members.role = 'admin'
    )
  );

-- tasks
alter table public.tasks enable row level security;

create policy "Members can view tasks"
  on public.tasks for select
  to authenticated
  using (
    exists (
      select 1 from public.project_members
      where project_members.project_id = tasks.project_id
        and project_members.user_id = auth.uid()
    )
  );

create policy "Admins/members can create tasks"
  on public.tasks for insert
  to authenticated
  with check (
    exists (
      select 1 from public.project_members
      where project_members.project_id = tasks.project_id
        and project_members.user_id = auth.uid()
        and project_members.role in ('admin', 'member')
    )
  );

create policy "Admins/members can update tasks"
  on public.tasks for update
  to authenticated
  using (
    exists (
      select 1 from public.project_members
      where project_members.project_id = tasks.project_id
        and project_members.user_id = auth.uid()
        and project_members.role in ('admin', 'member')
    )
  );

create policy "Admins can delete tasks"
  on public.tasks for delete
  to authenticated
  using (
    exists (
      select 1 from public.project_members
      where project_members.project_id = tasks.project_id
        and project_members.user_id = auth.uid()
        and project_members.role = 'admin'
    )
  );

-- task_labels
alter table public.task_labels enable row level security;

create policy "Members can view task labels"
  on public.task_labels for select
  to authenticated
  using (
    exists (
      select 1 from public.tasks
      join public.project_members on project_members.project_id = tasks.project_id
      where tasks.id = task_labels.task_id
        and project_members.user_id = auth.uid()
    )
  );

create policy "Admins/members can manage task labels"
  on public.task_labels for insert
  to authenticated
  with check (
    exists (
      select 1 from public.tasks
      join public.project_members on project_members.project_id = tasks.project_id
      where tasks.id = task_labels.task_id
        and project_members.user_id = auth.uid()
        and project_members.role in ('admin', 'member')
    )
  );

create policy "Admins/members can remove task labels"
  on public.task_labels for delete
  to authenticated
  using (
    exists (
      select 1 from public.tasks
      join public.project_members on project_members.project_id = tasks.project_id
      where tasks.id = task_labels.task_id
        and project_members.user_id = auth.uid()
        and project_members.role in ('admin', 'member')
    )
  );

-- task_dependencies
alter table public.task_dependencies enable row level security;

create policy "Members can view task dependencies"
  on public.task_dependencies for select
  to authenticated
  using (
    exists (
      select 1 from public.tasks
      join public.project_members on project_members.project_id = tasks.project_id
      where tasks.id = task_dependencies.predecessor_id
        and project_members.user_id = auth.uid()
    )
  );

create policy "Admins/members can manage task dependencies"
  on public.task_dependencies for insert
  to authenticated
  with check (
    exists (
      select 1 from public.tasks
      join public.project_members on project_members.project_id = tasks.project_id
      where tasks.id = task_dependencies.predecessor_id
        and project_members.user_id = auth.uid()
        and project_members.role in ('admin', 'member')
    )
  );

create policy "Admins/members can delete task dependencies"
  on public.task_dependencies for delete
  to authenticated
  using (
    exists (
      select 1 from public.tasks
      join public.project_members on project_members.project_id = tasks.project_id
      where tasks.id = task_dependencies.predecessor_id
        and project_members.user_id = auth.uid()
        and project_members.role in ('admin', 'member')
    )
  );

-- task_comments
alter table public.task_comments enable row level security;

create policy "Members can view task comments"
  on public.task_comments for select
  to authenticated
  using (
    exists (
      select 1 from public.tasks
      join public.project_members on project_members.project_id = tasks.project_id
      where tasks.id = task_comments.task_id
        and project_members.user_id = auth.uid()
    )
  );

create policy "Admins/members can create comments"
  on public.task_comments for insert
  to authenticated
  with check (
    exists (
      select 1 from public.tasks
      join public.project_members on project_members.project_id = tasks.project_id
      where tasks.id = task_comments.task_id
        and project_members.user_id = auth.uid()
        and project_members.role in ('admin', 'member')
    )
  );

create policy "Users can update own comments"
  on public.task_comments for update
  to authenticated
  using (user_id = auth.uid());

create policy "Users can delete own comments or admins"
  on public.task_comments for delete
  to authenticated
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.tasks
      join public.project_members on project_members.project_id = tasks.project_id
      where tasks.id = task_comments.task_id
        and project_members.user_id = auth.uid()
        and project_members.role = 'admin'
    )
  );
