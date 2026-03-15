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
              ? "bg-pink-50 text-pink-600 border border-pink-200"
              : "bg-white text-gray-500 border border-pink-100 hover:bg-pink-50/50"
          }`}
        >
          {level.label}
        </button>
      ))}
    </div>
  );
}
