"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  personalize,
  PersonalizedResult,
  getGreeting,
  getEnvironmentMessage,
  getTimePeriod,
} from "web-personalization";
import { Sparkles, Compass, CloudSun } from "lucide-react";

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
  personalizedResult: PersonalizedResult | null;
  isLoading: boolean;
}

const WeatherContext = createContext<WeatherContextType>({
  weatherCategory: "sunny",
  setWeatherCategory: () => {},
  theme: weatherThemes.sunny,
  personalizedResult: null,
  isLoading: true,
});

export const useWeather = () => useContext(WeatherContext);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [weatherCategory, setWeatherCategory] = useState<WeatherCategory>("sunny");
  const [personalizedResult, setPersonalizedResult] = useState<PersonalizedResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [greetingText, setGreetingText] = useState<string>("Good Day");
  const [loadingSubtitle, setLoadingSubtitle] = useState<string>("Detecting live location & climate environment...");

  useEffect(() => {
    // Derive initial immediate greeting based on client device time
    try {
      const initialTime = getTimePeriod(new Date());
      setGreetingText(getGreeting(initialTime));
    } catch {
      setGreetingText("Good Day");
    }

    let isMounted = true;

    async function fetchPersonalization() {
      try {
        setIsLoading(true);
        const result = await personalize({
          fallbackLocation: {
            latitude: 23.8103,
            longitude: 90.4125,
            city: "Dhaka",
            country: "Bangladesh",
          },
          enableCache: true,
          includeExperience: true,
        });

        if (!isMounted) return;

        console.log("==========================================");
        console.log("[web-personalization] personalize() result:", result);
        console.log("[web-personalization] getGreeting():", getGreeting(result.context.time));
        console.log(
          "[web-personalization] getEnvironmentMessage():",
          getEnvironmentMessage(
            result.context.weather.category,
            result.context.temperature.category
          )
        );
        console.log("==========================================");

        setPersonalizedResult(result);

        // Update greeting and dynamic message from actual SDK result
        const greeting = getGreeting(result.context.time);
        const envMsg = getEnvironmentMessage(
          result.context.weather.category,
          result.context.temperature.category
        );
        const locationName = result.context.location.city || "Dhaka";
        const tempValue = result.context.temperature.value.toFixed(1);

        setGreetingText(greeting);
        setLoadingSubtitle(`${envMsg} in ${locationName} • ${tempValue}°C`);

        // Derive weatherCategory for theme styling based on SDK output
        const time = result.context.time;
        const sdkCategory = result.context.weather.category;

        let effectiveCategory: WeatherCategory = sdkCategory;
        if (time === "night" && sdkCategory !== "rainy" && sdkCategory !== "stormy") {
          effectiveCategory = "night";
        }

        setWeatherCategory(effectiveCategory);
      } catch (error) {
        console.error("Error fetching web-personalization context:", error);
      } finally {
        if (isMounted) {
          // 1400ms delay so user can read the personalized greeting and message comfortably
          setTimeout(() => {
            if (isMounted) {
              setIsLoading(false);
            }
          }, 1400);
        }
      }
    }

    fetchPersonalization();

    return () => {
      isMounted = false;
    };
  }, []);

  // Lock body scrollbar when loading screen is active
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const theme = weatherThemes[weatherCategory] || weatherThemes.sunny;

  return (
    <WeatherContext.Provider
      value={{
        weatherCategory,
        setWeatherCategory,
        theme,
        personalizedResult,
        isLoading,
      }}
    >
      {/* Full Screen Premium Glassmorphic Personalized Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 text-white p-4 sm:p-6 transition-all duration-700 ease-in-out select-none overflow-hidden">
          {/* Subtle Ambient Glow Background */}
          <div className="absolute w-96 h-96 bg-gradient-to-tr from-amber-500/20 via-indigo-600/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

          {/* Centered Glass Card */}
          <div className="relative z-10 max-w-md w-full p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-2xl backdrop-blur-2xl text-center flex flex-col items-center transition-all">
            {/* Animated Header Icon */}
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute w-24 h-24 bg-gradient-to-r from-amber-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse" />
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 shadow-xl flex items-center justify-center relative z-10 animate-bounce">
                <CloudSun className="w-10 h-10 text-amber-400 animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -right-1 z-20 bg-cyan-500/20 border border-cyan-400/50 p-1.5 rounded-full backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" style={{ animationDuration: '5s' }} />
              </div>
            </div>

            {/* Personalized Greeting with Gradient Typography */}
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2 font-sans flex items-center justify-center gap-2 drop-shadow-sm">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
                {greetingText}, tanvir
              </span>
              <span className="text-2xl animate-bounce">👋</span>
            </h1>

            {/* Dynamic Environment & Weather Message */}
            <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed mb-6 px-2 min-h-[40px] flex items-center justify-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{loadingSubtitle}</span>
            </p>

            {/* Badge Indicator */}
            <div className="inline-flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-full px-4 py-1.5 shadow-inner mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">
                Preparing Personalization Engine
              </span>
            </div>

            {/* Animated Dots */}
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}

      <div
        className={`min-h-screen font-sans flex flex-col lg:flex-row transition-all duration-700 ease-in-out ${theme.bgClass}`}
      >
        {children}
      </div>
    </WeatherContext.Provider>
  );
}


