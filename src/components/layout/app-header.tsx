import { createClient } from "@/lib/supabase/server";
import { UserMenu } from "@/components/auth/user-menu";
import { ProjectSwitcher } from "./project-switcher";

export async function AppHeader() {
  let displayName = "";
  let avatarUrl: string | null = null;
  let projects: { id: string; name: string; key: string; color: string }[] = [];

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      displayName = profile?.display_name ?? user.email ?? "";
      avatarUrl = profile?.avatar_url ?? null;

      const { data: projectData } = await supabase
        .from("projects")
        .select("id, name, key, color")
        .order("name");

      projects = projectData ?? [];
    }
  } catch {
    // Silently handle errors
  }

  return (
    <header className="sticky top-0 z-30 h-[72px] bg-white/70 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-6 lg:px-8">
        <div className="lg:hidden w-10" />
        <ProjectSwitcher projects={projects} />
        <div className="flex-1" />
        <UserMenu displayName={displayName} avatarUrl={avatarUrl} />
      </div>
    </header>
  );
}
