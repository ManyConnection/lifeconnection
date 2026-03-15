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
      <span className="text-sm text-gray-500 mr-2">Zoom:</span>
      {levels.map((level) => (
        <button
          key={level.value}
          onClick={() => onZoomChange(level.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            zoom === level.value
              ? "bg-sky-50 text-sky-600 border border-sky-200"
              : "bg-white text-gray-500 border border-sky-100 hover:bg-sky-50/50"
          }`}
        >
          {level.label}
        </button>
      ))}
    </div>
  );
}
