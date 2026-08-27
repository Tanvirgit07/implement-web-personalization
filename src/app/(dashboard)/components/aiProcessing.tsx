"use client";

import React from "react";
import { CheckCircle2, RefreshCw, XCircle } from "lucide-react";
import { useWeather } from "./weatherContext";

export interface AIProcessingStatus {
  id: string;
  label: string;
  percentage: number;
  icon: React.ElementType;
  iconColor: string;
  barColor: string;
}

const processingData: AIProcessingStatus[] = [
  {
    id: "completed",
    label: "Completed",
    percentage: 78,
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    barColor: "bg-emerald-500",
  },
  {
    id: "processing",
    label: "Processing",
    percentage: 15,
    icon: RefreshCw,
    iconColor: "text-blue-500 animate-spin",
    barColor: "bg-blue-500",
  },
  {
    id: "failed",
    label: "Failed",
    percentage: 7,
    icon: XCircle,
    iconColor: "text-rose-500",
    barColor: "bg-rose-500",
  },
];

export default function AiProcessing() {
  const { theme } = useWeather();

  return (
    <div className={`${theme.cardBgClass} border ${theme.cardBorderClass} rounded-none p-5 shadow-sm transition-all duration-700`}>
      <h3 className="text-base font-semibold mb-4">
        AI Processing
      </h3>

      <div className="space-y-4">
        {processingData.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${item.iconColor}`} />
                  <span>{item.label}</span>
                </div>
                <span className="font-bold">
                  {item.percentage}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${item.barColor}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
