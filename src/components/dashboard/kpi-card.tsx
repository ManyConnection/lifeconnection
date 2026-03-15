const colorMap = {
  sky: {
    bg: "bg-sky-50",
    border: "border-sky-200",
    icon: "text-sky-500",
  },
  teal: {
    bg: "bg-teal-50",
    border: "border-teal-200",
    icon: "text-teal-500",
  },
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "text-emerald-500",
  },
  rose: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    icon: "text-rose-500",
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
      className={`${c.bg} border ${c.border} rounded-2xl p-5 transition-all hover:shadow-md hover:-translate-y-0.5 cursor-default`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-500">{title}</span>
        <div className={c.icon}>{icon}</div>
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
  );
}
