"use client";

import React from "react";
import { Sparkles, UserPlus, FileOutput, Radio, Activity } from "lucide-react";
import { useWeather } from "./weatherContext";

export interface ActivityLog {
  id: string;
  action: string;
  time: string;
  type: "ai" | "user" | "export" | "system";
}

const activityLogs: ActivityLog[] = [
  {
    id: "a1",
    action: "AI Summary generated for Client Onboarding",
    time: "2 min ago",
    type: "ai",
  },
  {
    id: "a2",
    action: "New action item assigned to Sarah Khan",
    time: "15 min ago",
    type: "user",
  },
  {
    id: "a3",
    action: "Meeting transcript exported to PDF format",
    time: "1 hour ago",
    type: "export",
  },
  {
    id: "a4",
    action: "Sync completed with Zoom cloud storage",
    time: "3 hours ago",
    type: "system",
  },
];

export default function RecentActivity() {
  const { theme } = useWeather();

  const getActivityIcon = (type: ActivityLog["type"]) => {
    switch (type) {
      case "ai":
        return <Sparkles className="w-3.5 h-3.5 text-purple-500" />;
      case "user":
        return <UserPlus className="w-3.5 h-3.5 text-blue-500" />;
      case "export":
        return <FileOutput className="w-3.5 h-3.5 text-emerald-500" />;
      case "system":
        return <Radio className="w-3.5 h-3.5 text-amber-500" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className={`${theme.cardBgClass} border ${theme.cardBorderClass} rounded-none p-5 shadow-sm transition-all duration-700`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold flex items-center gap-2">
          Recent Activity
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </h3>
        <span className="text-[11px] text-slate-400 font-medium">Real-time</span>
      </div>

      <div className="relative border-l border-slate-100 dark:border-slate-800 ml-2 space-y-4 py-1">
        {activityLogs.map((log) => (
          <div key={log.id} className="relative pl-5">
            <div className="absolute -left-2.5 top-0.5 bg-white dark:bg-slate-900 p-0.5 border border-slate-200 dark:border-slate-700 rounded-full">
              {getActivityIcon(log.type)}
            </div>
            <div className="text-xs">
              <p className="font-medium leading-snug">
                {log.action}
              </p>
              <span className="text-[10px] text-slate-400 font-normal mt-0.5 inline-block">
                {log.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
