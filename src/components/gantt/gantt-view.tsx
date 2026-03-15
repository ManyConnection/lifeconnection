"use client";

import { useState, useMemo } from "react";
import { GanttToolbar } from "./gantt-toolbar";
import { GanttTaskBar } from "./gantt-task-bar";
import {
  startOfDay,
  endOfDay,
  addDays,
  differenceInDays,
  format,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  isToday,
} from "date-fns";
import { getStatusConfig } from "@/lib/constants";

type ZoomLevel = "day" | "week" | "month";

interface Task {
  id: string;
  task_number: number;
  title: string;
  status: "open" | "in_progress" | "in_review" | "done" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  start_date: string | null;
  due_date: string | null;
  assignee: { id: string; display_name: string } | null;
}

interface Dependency {
  id: string;
  predecessor_id: string;
  successor_id: string;
  dependency_type: string;
}

export function GanttView({
  tasks,
  dependencies,
  projectId,
}: {
  tasks: Task[];
  dependencies: Dependency[];
  projectId: string;
}) {
  const [zoom, setZoom] = useState<ZoomLevel>("day");

  const { startDate, endDate, columns, colWidth } = useMemo(() => {
    if (tasks.length === 0) {
      const today = new Date();
      return {
        startDate: startOfDay(today),
        endDate: addDays(today, 30),
        columns: eachDayOfInterval({ start: today, end: addDays(today, 30) }),
        colWidth: 40,
      };
    }

    const dates = tasks.flatMap((t) =>
      [t.start_date, t.due_date].filter(Boolean).map((d) => new Date(d!))
    );
    const min = new Date(Math.min(...dates.map((d) => d.getTime())));
    const max = new Date(Math.max(...dates.map((d) => d.getTime())));

    const padding = zoom === "month" ? 30 : zoom === "week" ? 14 : 7;
    const start = startOfDay(addDays(min, -padding));
    const end = endOfDay(addDays(max, padding));

    let cols: Date[];
    let width: number;

    if (zoom === "day") {
      cols = eachDayOfInterval({ start, end });
      width = 40;
    } else if (zoom === "week") {
      cols = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });
      width = 80;
    } else {
      cols = eachMonthOfInterval({ start, end });
      width = 120;
    }

    return { startDate: start, endDate: end, columns: cols, colWidth: width };
  }, [tasks, zoom]);

  const totalWidth = columns.length * colWidth;

  const getBarPosition = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    const totalDays = differenceInDays(endDate, startDate) || 1;
    const left = (differenceInDays(s, startDate) / totalDays) * totalWidth;
    const width = Math.max(
      (differenceInDays(e, s) / totalDays) * totalWidth,
      colWidth
    );
    return { left, width };
  };

  const formatHeader = (date: Date) => {
    if (zoom === "day") return format(date, "d");
    if (zoom === "week") return format(date, "MM/dd");
    return format(date, "yyyy/MM");
  };

  const formatSubHeader = (date: Date) => {
    if (zoom === "day") return format(date, "EEE").charAt(0);
    return "";
  };

  return (
    <div className="space-y-4">
      <GanttToolbar zoom={zoom} onZoomChange={setZoom} />

      {tasks.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400">
            開始日が設定されたタスクがありません
          </p>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-sm border border-sky-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <div style={{ minWidth: totalWidth + 280 }}>
              {/* Header */}
              <div className="flex border-b border-sky-100">
                <div className="w-[280px] shrink-0 px-4 py-2 text-xs font-medium text-gray-400 border-r border-sky-100">
                  Task
                </div>
                <div className="flex">
                  {columns.map((col, i) => (
                    <div
                      key={i}
                      className={`text-center border-r border-sky-50 py-2 ${
                        isToday(col) ? "bg-sky-50" : ""
                      }`}
                      style={{ width: colWidth }}
                    >
                      <div className="text-[10px] text-gray-500">
                        {formatHeader(col)}
                      </div>
                      {zoom === "day" && (
                        <div className="text-[9px] text-gray-300">
                          {formatSubHeader(col)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rows */}
              {tasks.map((task) => {
                const config = getStatusConfig(task.status);
                const bar =
                  task.start_date && task.due_date
                    ? getBarPosition(task.start_date, task.due_date)
                    : null;

                return (
                  <div
                    key={task.id}
                    className="flex border-b border-sky-50 hover:bg-sky-50/30"
                  >
                    <div className="w-[280px] shrink-0 px-4 py-3 text-sm text-gray-700 border-r border-sky-100 flex items-center gap-2 truncate">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${config.dotColor}`} />
                      <span className="text-gray-400 text-xs">
                        #{task.task_number}
                      </span>
                      <span className="truncate">{task.title}</span>
                    </div>
                    <div className="relative flex-1" style={{ height: 44 }}>
                      {bar && (
                        <GanttTaskBar
                          task={task}
                          left={bar.left}
                          width={bar.width}
                          projectId={projectId}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SVG Dependencies */}
          {dependencies.length > 0 && (
            <svg className="absolute inset-0 pointer-events-none">
              {dependencies.map((dep) => {
                const pred = tasks.find((t) => t.id === dep.predecessor_id);
                const succ = tasks.find((t) => t.id === dep.successor_id);
                if (!pred?.due_date || !succ?.start_date) return null;
                const predBar = getBarPosition(pred.start_date!, pred.due_date);
                const succBar = getBarPosition(succ.start_date, succ.due_date!);
                const predIdx = tasks.indexOf(pred);
                const succIdx = tasks.indexOf(succ);
                const x1 = 280 + predBar.left + predBar.width;
                const y1 = 44 + predIdx * 44 + 22;
                const x2 = 280 + succBar.left;
                const y2 = 44 + succIdx * 44 + 22;

                return (
                  <g key={dep.id}>
                    <path
                      d={`M${x1},${y1} C${x1 + 20},${y1} ${x2 - 20},${y2} ${x2},${y2}`}
                      fill="none"
                      stroke="rgba(14,165,233,0.4)"
                      strokeWidth={1.5}
                      markerEnd="url(#arrowhead)"
                    />
                  </g>
                );
              })}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="6"
                  markerHeight="6"
                  refX="5"
                  refY="3"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 6 3, 0 6"
                    fill="rgba(14,165,233,0.6)"
                  />
                </marker>
              </defs>
            </svg>
          )}
        </div>
      )}
    </div>
  );
}
