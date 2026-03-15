import { getDashboardData } from "@/lib/queries/dashboard";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { StatusChart } from "@/components/dashboard/status-chart";
import { OverdueTasksList } from "@/components/dashboard/overdue-tasks-list";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ListTodo,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-heading text-gray-800">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Tasks"
          value={data.totalTasks}
          icon={<ListTodo size={20} />}
          color="sky"
        />
        <KpiCard
          title="In Progress"
          value={data.inProgressTasks}
          icon={<Clock size={20} />}
          color="teal"
        />
        <KpiCard
          title="Completion Rate"
          value={`${data.completionRate}%`}
          icon={<CheckCircle2 size={20} />}
          color="emerald"
        />
        <KpiCard
          title="Overdue"
          value={data.overdueCount}
          icon={<AlertTriangle size={20} />}
          color="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Distribution */}
        <div className="bg-white/70 backdrop-blur-sm border border-sky-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-600 mb-4">
            Status Distribution
          </h2>
          <StatusChart distribution={data.statusDistribution} total={data.totalTasks} />
        </div>

        {/* Project Progress */}
        <div className="bg-white/70 backdrop-blur-sm border border-sky-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-600 mb-4">
            Project Progress
          </h2>
          {data.projectStats.length === 0 ? (
            <p className="text-gray-400 text-sm">プロジェクトがありません</p>
          ) : (
            <div className="space-y-4">
              {data.projectStats.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}/tasks`}
                  className="block group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700 group-hover:text-sky-600 transition-colors">
                      {p.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {p.doneTasks}/{p.totalTasks}
                    </span>
                  </div>
                  <div className="h-2 bg-sky-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${p.progress}%`,
                        backgroundColor: p.color,
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Completion Ring */}
        <div className="bg-white/70 backdrop-blur-sm border border-sky-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center">
          <h2 className="text-sm font-semibold text-gray-600 mb-4">
            Overall Completion
          </h2>
          <ProgressRing percentage={data.completionRate} />
        </div>
      </div>

      {/* Overdue Tasks */}
      {data.overdueTasks.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm border border-rose-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-rose-500 mb-4">
            Overdue Tasks
          </h2>
          <OverdueTasksList tasks={data.overdueTasks} />
        </div>
      )}
    </div>
  );
}
