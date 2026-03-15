import { createClient } from "@/lib/supabase/server";

export async function getDashboardData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Get all projects the user is a member of
  const { data: projects } = await supabase
    .from("projects")
    .select(
      `
      *,
      tasks(id, status, due_date, title, task_number, priority, assignee_id)
    `
    )
    .order("created_at", { ascending: false });

  const allTasks = (projects ?? []).flatMap((p) => p.tasks ?? []);
  const totalTasks = allTasks.length;
  const doneTasks = allTasks.filter((t) => t.status === "done" || t.status === "closed").length;
  const inProgressTasks = allTasks.filter((t) => t.status === "in_progress").length;
  const today = new Date().toISOString().split("T")[0];
  const overdueTasks = allTasks.filter(
    (t) =>
      t.due_date &&
      t.due_date < today &&
      t.status !== "done" &&
      t.status !== "closed"
  );

  const completionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const projectStats = (projects ?? []).map((p) => {
    const tasks = p.tasks ?? [];
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "done" || t.status === "closed").length;
    return {
      id: p.id,
      name: p.name,
      color: p.color,
      key: p.key,
      totalTasks: total,
      doneTasks: done,
      progress: total > 0 ? Math.round((done / total) * 100) : 0,
    };
  });

  const statusDistribution = {
    open: allTasks.filter((t) => t.status === "open").length,
    in_progress: inProgressTasks,
    in_review: allTasks.filter((t) => t.status === "in_review").length,
    done: allTasks.filter((t) => t.status === "done").length,
    closed: allTasks.filter((t) => t.status === "closed").length,
  };

  return {
    totalTasks,
    inProgressTasks,
    completionRate,
    overdueTasks: overdueTasks.map((t) => ({
      ...t,
      project: (projects ?? []).find((p) =>
        (p.tasks ?? []).some((pt) => pt.id === t.id)
      ),
    })),
    overdueCount: overdueTasks.length,
    projectStats,
    statusDistribution,
  };
}
