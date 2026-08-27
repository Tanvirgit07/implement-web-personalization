"use client";

import React from "react";
import { Video, Clock, FileCheck, Target, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useWeather } from "./weatherContext";

export interface StatCardItem {
  id: string;
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const defaultStats: StatCardItem[] = [
  {
    id: "1",
    title: "Meetings Today",
    value: "06",
    trend: "+2",
    isPositive: true,
    icon: Video,
    iconBg: "bg-blue-50 dark:bg-blue-950/40",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "2",
    title: "AI Minutes Saved",
    value: "17.6H",
    trend: "+3.2H",
    isPositive: true,
    icon: Clock,
    iconBg: "bg-purple-50 dark:bg-purple-950/40",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    id: "3",
    title: "Meetings Processed",
    value: "128",
    trend: "+12",
    isPositive: true,
    icon: FileCheck,
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "4",
    title: "AI Accuracy",
    value: "96.8%",
    trend: "+0.4%",
    isPositive: true,
    icon: Target,
    iconBg: "bg-amber-50 dark:bg-amber-950/40",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    id: "5",
    title: "Upcoming Meetings",
    value: "04",
    trend: "-1",
    isPositive: false,
    icon: Calendar,
    iconBg: "bg-pink-50 dark:bg-pink-950/40",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
];

export default function StateCard() {
  const { theme } = useWeather();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {defaultStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className={`${theme.cardBgClass} border ${theme.cardBorderClass} rounded-none p-4 shadow-sm hover:shadow-md transition-all duration-700 flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <div
                className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  stat.isPositive
                    ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50"
                    : "text-rose-500 bg-rose-50 dark:bg-rose-950/50"
                }`}
              >
                {stat.isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                <span>{stat.trend}</span>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-2xl font-bold tracking-tight">
                {stat.value}
              </h3>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                {stat.title}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
