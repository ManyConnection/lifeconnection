const colorMap = {
  violet: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    icon: "text-violet-400",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    icon: "text-cyan-400",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: "text-emerald-400",
  },
  rose: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    icon: "text-rose-400",
  },
};

export function KpiCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: keyof typeof colorMap;
}) {
  const c = colorMap[color];

  return (
    <div
      className={`${c.bg} border ${c.border} rounded-2xl p-5 transition-colors hover:bg-opacity-20`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-400">{title}</span>
        <div className={c.icon}>{icon}</div>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}
