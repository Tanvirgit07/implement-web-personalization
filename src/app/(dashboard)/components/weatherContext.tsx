"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type WeatherCategory = "sunny" | "rainy" | "cloudy" | "stormy" | "night";

export interface WeatherThemeStyles {
  bgClass: string;
  cardBorderClass: string;
  cardBgClass: string;
  sidebarBgClass: string;
  sidebarBorderClass: string;
  accentBadgeClass: string;
  accentTextClass: string;
  headerGradient: string;
  headerGlow: string;
}

export const weatherThemes: Record<WeatherCategory, WeatherThemeStyles> = {
  sunny: {
    bgClass: "bg-amber-50/40 text-slate-900",
    cardBorderClass: "border-amber-200/80 dark:border-amber-900/40",
    cardBgClass: "bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100",
    sidebarBgClass: "bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100",
    sidebarBorderClass: "border-amber-200/80 dark:border-amber-900/40",
    accentBadgeClass: "bg-amber-100 text-amber-800 border-amber-300",
    accentTextClass: "text-amber-600",
    headerGradient: "from-amber-400 via-orange-400 to-rose-400",
    headerGlow: "bg-yellow-200/30",
  },
  rainy: {
    bgClass: "bg-slate-950 text-cyan-50",
    cardBorderClass: "border-cyan-800/60",
    cardBgClass: "bg-cyan-950/40 backdrop-blur-md text-cyan-50",
    sidebarBgClass: "bg-slate-950 text-cyan-50",
    sidebarBorderClass: "border-cyan-900/80",
    accentBadgeClass: "bg-cyan-900/60 text-cyan-200 border-cyan-700",
    accentTextClass: "text-cyan-400",
    headerGradient: "from-teal-600 via-cyan-600 to-blue-800",
    headerGlow: "bg-cyan-300/30",
  },
  cloudy: {
    bgClass: "bg-slate-900 text-slate-100",
    cardBorderClass: "border-indigo-800/60",
    cardBgClass: "bg-slate-850/95 backdrop-blur-md text-slate-100",
    sidebarBgClass: "bg-slate-900 text-slate-100",
    sidebarBorderClass: "border-indigo-900/80",
    accentBadgeClass: "bg-indigo-950/80 text-indigo-200 border-indigo-700",
    accentTextClass: "text-indigo-400",
    headerGradient: "from-slate-700 via-indigo-800 to-blue-950",
    headerGlow: "bg-indigo-300/30",
  },
  stormy: {
    bgClass: "bg-slate-950 text-slate-100",
    cardBorderClass: "border-purple-800/60",
    cardBgClass: "bg-slate-900/95 text-slate-100",
    sidebarBgClass: "bg-slate-950 text-slate-100",
    sidebarBorderClass: "border-purple-900/80",
    accentBadgeClass: "bg-purple-950/80 text-purple-200 border-purple-700",
    accentTextClass: "text-amber-400",
    headerGradient: "from-purple-800 via-indigo-900 to-slate-950",
    headerGlow: "bg-amber-400/25",
  },
  night: {
    bgClass: "bg-slate-900 text-slate-100",
    cardBorderClass: "border-indigo-800/60",
    cardBgClass: "bg-slate-850/95 text-slate-100",
    sidebarBgClass: "bg-slate-900 text-slate-100",
    sidebarBorderClass: "border-indigo-900/80",
    accentBadgeClass: "bg-indigo-950/80 text-indigo-200 border-indigo-700",
    accentTextClass: "text-indigo-400",
    headerGradient: "from-indigo-950 via-slate-900 to-blue-950",
    headerGlow: "bg-indigo-300/25",
  },
};

interface WeatherContextType {
  weatherCategory: WeatherCategory;
  setWeatherCategory: (category: WeatherCategory) => void;
  theme: WeatherThemeStyles;
}

const WeatherContext = createContext<WeatherContextType>({
  weatherCategory: "sunny",
  setWeatherCategory: () => {},
  theme: weatherThemes.sunny,
});

export const useWeather = () => useContext(WeatherContext);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [weatherCategory, setWeatherCategory] = useState<WeatherCategory>("sunny");

  // Dynamic Weather Synchronization (cycles smoothly every 18 seconds)
  useEffect(() => {
    const categories: WeatherCategory[] = ["sunny", "rainy", "cloudy", "stormy", "night"];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % categories.length;
      setWeatherCategory(categories[index]);
    }, 18000);

    return () => clearInterval(interval);
  }, []);

  const theme = weatherThemes[weatherCategory];

  return (
    <WeatherContext.Provider value={{ weatherCategory, setWeatherCategory, theme }}>
      <div
        className={`min-h-screen font-sans flex flex-col lg:flex-row transition-all duration-700 ease-in-out ${theme.bgClass}`}
      >
        {children}
      </div>
    </WeatherContext.Provider>
  );
}
