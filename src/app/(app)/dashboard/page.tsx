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
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-extrabold font-heading text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">プロジェクトの進捗を確認しましょう</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard
          title="Total Tasks"
          value={data.totalTasks}
          icon={<ListTodo size={22} />}
          color="sky"
        />
        <KpiCard
          title="In Progress"
          value={data.inProgressTasks}
          icon={<Clock size={22} />}
          color="teal"
        />
        <KpiCard
          title="Completion"
          value={`${data.completionRate}%`}
          icon={<CheckCircle2 size={22} />}
          color="emerald"
        />
        <KpiCard
          title="Overdue"
          value={data.overdueCount}
          icon={<AlertTriangle size={22} />}
          color="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Distribution */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">
            Status Distribution
          </h2>
          <StatusChart distribution={data.statusDistribution} total={data.totalTasks} />
        </div>

        {/* Project Progress */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">
            Project Progress
          </h2>
          {data.projectStats.length === 0 ? (
            <p className="text-gray-400 text-sm">プロジェクトがありません</p>
          ) : (
            <div className="space-y-5">
              {data.projectStats.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}/tasks`}
                  className="block group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-sky-600 transition-colors">
                      {p.name}
                    </span>
                    <span className="text-xs font-bold text-gray-400">
                      {p.doneTasks}/{p.totalTasks}
                    </span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
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
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">
            Overall Completion
          </h2>
          <ProgressRing percentage={data.completionRate} />
        </div>
      </div>

      {/* Overdue Tasks */}
      {data.overdueTasks.length > 0 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <h2 className="text-xs font-bold text-rose-500 uppercase tracking-wider">
              Overdue Tasks
            </h2>
          </div>
          <OverdueTasksList tasks={data.overdueTasks} />
        </div>
      )}
    </div>
  );
}
