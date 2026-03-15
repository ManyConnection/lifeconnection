import { createClient } from "@/lib/supabase/server";

const emptyData = {
  totalTasks: 0,
  inProgressTasks: 0,
  completionRate: 0,
  overdueTasks: [] as { id: string; title: string; task_number: number; due_date: string | null; priority: string; status: string; assignee_id: string | null; project?: { id: string; name: string; key: string; color: string } | null }[],
  overdueCount: 0,
  projectStats: [] as { id: string; name: string; color: string; key: string; totalTasks: number; doneTasks: number; progress: number }[],
  statusDistribution: { open: 0, in_progress: 0, in_review: 0, done: 0, closed: 0 },
};

export async function getDashboardData() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return emptyData;

    const { data: projects, error } = await supabase
      .from("projects")
      .select(
        `
      *,
      tasks(id, status, due_date, title, task_number, priority, assignee_id)
    `
      )
      .order("created_at", { ascending: false });

    if (error) return emptyData;

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
  } catch {
    return emptyData;
  }
}
