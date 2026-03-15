"use client";

type ZoomLevel = "day" | "week" | "month";

export function GanttToolbar({
  zoom,
  onZoomChange,
}: {
  zoom: ZoomLevel;
  onZoomChange: (z: ZoomLevel) => void;
}) {
  const levels: { value: ZoomLevel; label: string }[] = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-400 mr-2">Zoom:</span>
      {levels.map((level) => (
        <button
          key={level.value}
          onClick={() => onZoomChange(level.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            zoom === level.value
              ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
              : "bg-slate-800/50 text-slate-400 border border-white/5 hover:bg-white/5"
          }`}
        >
          {level.label}
        </button>
      ))}
    </div>
  );
}
