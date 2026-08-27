"use client";

import React from "react";
import { useWeather } from "./weatherContext";

export interface QueueItem {
  id: string;
  title: string;
  status: "Processing" | "Completed" | "Queued";
  time: string;
}

const queueData: QueueItem[] = [
  {
    id: "1",
    title: "Q3 Strategy Review",
    status: "Processing",
    time: "~7 min",
  },
  {
    id: "2",
    title: "Client Onboarding",
    status: "Completed",
    time: "Done",
  },
  {
    id: "3",
    title: "Design Sync",
    status: "Processing",
    time: "~5 min",
  },
  {
    id: "4",
    title: "Weekly Standup",
    status: "Queued",
    time: "~8 min",
  },
];

export default function RecentProcessingQueue() {
  const { theme } = useWeather();

  const getBadgeStyle = (status: QueueItem["status"]) => {
    switch (status) {
      case "Processing":
        return "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400";
      case "Completed":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400";
      case "Queued":
        return "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className={`${theme.cardBgClass} border ${theme.cardBorderClass} rounded-none p-5 shadow-sm transition-all duration-700`}>
      <h3 className="text-base font-semibold mb-4">
        Recent Processing Queue
      </h3>

      <div className="space-y-3">
        {queueData.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800/60 last:border-0"
          >
            <span className="text-xs font-semibold truncate pr-2">
              {item.title}
            </span>

            <div className="flex items-center gap-3 shrink-0">
              <span
                className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${getBadgeStyle(
                  item.status
                )}`}
              >
                {item.status}
              </span>
              <span className="text-[11px] font-medium text-slate-400 min-w-[45px] text-right">
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
