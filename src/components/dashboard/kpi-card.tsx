const colorMap = {
  sky: {
    bg: "bg-gradient-to-br from-sky-400 to-sky-500",
    light: "bg-sky-50",
    text: "text-sky-600",
  },
  teal: {
    bg: "bg-gradient-to-br from-teal-400 to-teal-500",
    light: "bg-teal-50",
    text: "text-teal-600",
  },
  emerald: {
    bg: "bg-gradient-to-br from-emerald-400 to-emerald-500",
    light: "bg-emerald-50",
    text: "text-emerald-600",
  },
  rose: {
    bg: "bg-gradient-to-br from-rose-400 to-rose-500",
    light: "bg-rose-50",
    text: "text-rose-600",
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
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl ${c.bg} flex items-center justify-center text-white shadow-lg shadow-${color}-200/40`}>
          {icon}
        </div>
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-extrabold font-heading text-gray-800 mt-0.5">{value}</p>
        </div>
      </div>
    </div>
  );
}
