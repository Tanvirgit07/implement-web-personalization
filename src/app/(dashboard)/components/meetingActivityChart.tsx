"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useWeather } from "./weatherContext";

interface ChartDataPoint {
  date: string;
  meetings: number;
  processed: number;
}

const dummyChartData: ChartDataPoint[] = [
  { date: "Jul 15", meetings: 8, processed: 6 },
  { date: "Jul 18", meetings: 12, processed: 10 },
  { date: "Jul 21", meetings: 9, processed: 7 },
  { date: "Jul 24", meetings: 15, processed: 12 },
  { date: "Jul 27", meetings: 10, processed: 9 },
  { date: "Jul 30", meetings: 13, processed: 11 },
  { date: "Aug 2", meetings: 17, processed: 15 },
  { date: "Aug 5", meetings: 11, processed: 10 },
  { date: "Aug 8", meetings: 16, processed: 14 },
  { date: "Aug 11", meetings: 19, processed: 18 },
  { date: "Aug 14", meetings: 14, processed: 13 },
  { date: "Aug 17", meetings: 17, processed: 15 },
  { date: "Aug 20", meetings: 18, processed: 17 },
];

export default function MeetingActivityChart() {
  const { theme } = useWeather();

  return (
    <div className={`${theme.cardBgClass} border ${theme.cardBorderClass} rounded-none p-5 shadow-sm flex flex-col h-full transition-all duration-700`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-semibold">
            Meeting Activity Chart
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Jul 15 — Aug 20
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
            <span>Meetings</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block"></span>
            <span>Processed</span>
          </div>
        </div>
      </div>

      <div className="w-full h-48 sm:h-56 mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dummyChartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorMeetings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              ticks={[5, 10, 15, 20]}
              domain={[0, 20]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="meetings"
              stroke="#2563eb"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorMeetings)"
            />
            <Area
              type="monotone"
              dataKey="processed"
              stroke="#38bdf8"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorProcessed)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
