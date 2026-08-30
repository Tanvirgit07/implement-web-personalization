"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  personalize,
  PersonalizedResult,
  getGreeting,
  getEnvironmentMessage,
  trackImpression,
  UserContext,
} from "web-personalization";
import { Sparkles, Compass, CloudSun, Play, Pause, RefreshCw } from "lucide-react";

export type WeatherCategory = "sunny" | "rainy" | "cloudy" | "stormy" | "night";
export type LanguageOption = "en" | "bn";

export interface WeatherThemeStyles {
  key: string;
  name: string;
  isDark: boolean;
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

// 🎨 High-Contrast, Crystal-Clear Theme Palette Matrix
export const weatherThemes: Record<string, WeatherThemeStyles> = {
  // 1. Morning Fresh & Sunny Theme (Bright Amber)
  "morning-sunny": {
    key: "morning-sunny",
    name: "Morning Sunrise Amber",
    isDark: false,
    bgClass: "bg-amber-50/60 text-slate-950 font-sans",
    cardBorderClass: "border-amber-300/80 shadow-md",
    cardBgClass: "bg-white text-slate-950 shadow-sm border border-amber-200/80",
    sidebarBgClass: "bg-white text-slate-950 border-r border-amber-200/80",
    sidebarBorderClass: "border-amber-200/80",
    accentBadgeClass: "bg-amber-100 text-amber-950 border border-amber-400 font-bold",
    accentTextClass: "text-amber-700 font-bold",
    headerGradient: "from-amber-500 via-orange-500 to-rose-500",
    headerGlow: "bg-yellow-300/40",
  },

  // 2. Daytime Light Cloudy & Breezy Theme (Crystal Clear Daylight Sky Slate)
  "cloudy-daytime": {
    key: "cloudy-daytime",
    name: "Daylight Breezy Sky",
    isDark: false,
    bgClass: "bg-slate-100/90 text-slate-950 font-sans",
    cardBorderClass: "border-sky-300/80 shadow-md",
    cardBgClass: "bg-white text-slate-950 shadow-sm border border-slate-200/90",
    sidebarBgClass: "bg-white text-slate-950 border-r border-slate-200/90",
    sidebarBorderClass: "border-slate-200/90",
    accentBadgeClass: "bg-sky-100 text-sky-950 border border-sky-400 font-bold",
    accentTextClass: "text-sky-700 font-bold",
    headerGradient: "from-sky-600 via-indigo-600 to-slate-800",
    headerGlow: "bg-sky-300/40",
  },

  // 3. Afternoon Solar Warmth
  "afternoon-sunny": {
    key: "afternoon-sunny",
    name: "Midday Solar Glow",
    isDark: false,
    bgClass: "bg-orange-50/60 text-slate-950 font-sans",
    cardBorderClass: "border-orange-300/80 shadow-md",
    cardBgClass: "bg-white text-slate-950 shadow-sm border border-orange-200/80",
    sidebarBgClass: "bg-white text-slate-950 border-r border-orange-200/80",
    sidebarBorderClass: "border-orange-200/80",
    accentBadgeClass: "bg-orange-100 text-orange-950 border border-orange-400 font-bold",
    accentTextClass: "text-orange-700 font-bold",
    headerGradient: "from-amber-500 via-amber-600 to-orange-600",
    headerGlow: "bg-amber-300/40",
  },

  // 4. Rainy Daytime / Humid
  "rainy-daytime": {
    key: "rainy-daytime",
    name: "Daylight Rain Teal",
    isDark: true,
    bgClass: "bg-slate-950 text-cyan-50 font-sans",
    cardBorderClass: "border-cyan-700/80 shadow-lg",
    cardBgClass: "bg-cyan-950/80 backdrop-blur-md text-cyan-50 border border-cyan-800/80",
    sidebarBgClass: "bg-slate-950 text-cyan-50 border-r border-cyan-900",
    sidebarBorderClass: "border-cyan-900/80",
    accentBadgeClass: "bg-cyan-900 text-cyan-100 border border-cyan-600 font-bold",
    accentTextClass: "text-cyan-300 font-bold",
    headerGradient: "from-teal-600 via-cyan-700 to-blue-900",
    headerGlow: "bg-cyan-300/30",
  },

  // 5. Heavy Stormy Severe
  stormy: {
    key: "stormy",
    name: "Severe Thunderstorm",
    isDark: true,
    bgClass: "bg-slate-950 text-purple-50 font-sans",
    cardBorderClass: "border-purple-700/80 shadow-lg",
    cardBgClass: "bg-slate-900/95 text-purple-50 border border-purple-800/80",
    sidebarBgClass: "bg-slate-950 text-purple-50 border-r border-purple-900",
    sidebarBorderClass: "border-purple-900/80",
    accentBadgeClass: "bg-purple-900 text-purple-100 border border-purple-600 font-bold",
    accentTextClass: "text-amber-300 font-bold",
    headerGradient: "from-purple-800 via-indigo-900 to-slate-950",
    headerGlow: "bg-amber-400/25",
  },

  // 6. Night Sky / Midnight Indigo
  night: {
    key: "night",
    name: "Midnight Indigo",
    isDark: true,
    bgClass: "bg-slate-950 text-slate-100 font-sans",
    cardBorderClass: "border-indigo-700/80 shadow-lg",
    cardBgClass: "bg-slate-900/95 text-slate-100 border border-indigo-800/80",
    sidebarBgClass: "bg-slate-950 text-slate-100 border-r border-indigo-900",
    sidebarBorderClass: "border-indigo-900/80",
    accentBadgeClass: "bg-indigo-900 text-indigo-100 border border-indigo-600 font-bold",
    accentTextClass: "text-indigo-300 font-bold",
    headerGradient: "from-indigo-950 via-slate-900 to-blue-950",
    headerGlow: "bg-indigo-300/25",
  },
};

/**
 * 🧠 Multi-Factor Theme Resolver Algorithm
 */
export function resolveDynamicTheme(
  category: WeatherCategory,
  context?: UserContext | null
): WeatherThemeStyles {
  if (category === "stormy") return weatherThemes["stormy"];
  if (category === "night") return weatherThemes["night"];
  if (category === "rainy") return weatherThemes["rainy-daytime"];
  if (category === "cloudy") return weatherThemes["cloudy-daytime"];
  
  if (context?.time === "afternoon") return weatherThemes["afternoon-sunny"];
  return weatherThemes["morning-sunny"];
}

interface WeatherContextType {
  weatherCategory: WeatherCategory;
  setWeatherCategory: (category: WeatherCategory) => void;
  language: LanguageOption;
  setLanguage: (lang: LanguageOption) => void;
  theme: WeatherThemeStyles;
  personalizedResult: PersonalizedResult | null;
  isLoading: boolean;
  isAutoRotating: boolean;
  setIsAutoRotating: (auto: boolean) => void;
}

const WeatherContext = createContext<WeatherContextType>({
  weatherCategory: "sunny",
  setWeatherCategory: () => {},
  language: "en",
  setLanguage: () => {},
  theme: weatherThemes["morning-sunny"],
  personalizedResult: null,
  isLoading: true,
  isAutoRotating: true,
  setIsAutoRotating: () => {},
});

export const useWeather = () => useContext(WeatherContext);

const weatherRotationOrder: WeatherCategory[] = [
  "sunny",
  "cloudy",
  "rainy",
  "stormy",
  "night",
];

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [weatherCategory, setWeatherCategory] = useState<WeatherCategory>("sunny");
  const [language, setLanguage] = useState<LanguageOption>("en");
  const [personalizedResult, setPersonalizedResult] = useState<PersonalizedResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [greetingText, setGreetingText] = useState<string>("Good Day");
  const [loadingSubtitle, setLoadingSubtitle] = useState<string>("Detecting live location & climate environment...");
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);

  // Fetch real-time web personalization SDK data on load
  useEffect(() => {
    let isMounted = true;

    async function fetchPersonalization() {
      try {
        setIsLoading(true);
        const result = await personalize({
          language,
          enableIPFallback: true,
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

        setPersonalizedResult(result);

        const greeting = getGreeting(result.context.time, language);
        const envMsg = getEnvironmentMessage(
          result.context.weather.category,
          result.context.temperature.category,
          language
        );
        const suburb = result.context.location.suburb;
        const city = result.context.location.city || "Dhaka";
        const locationName = suburb ? `${suburb}, ${city}` : city;
        const tempValue = result.context.temperature.value.toFixed(1);

        setGreetingText(greeting);
        setLoadingSubtitle(`${envMsg} in ${locationName} • ${tempValue}°C`);

        const time = result.context.time;
        const sdkCategory = result.context.weather.category;

        let effectiveCategory: WeatherCategory = sdkCategory;
        if (time === "night" && sdkCategory !== "rainy" && sdkCategory !== "stormy") {
          effectiveCategory = "night";
        }

        setWeatherCategory(effectiveCategory);

        if (result.experience) {
          trackImpression(result.experience);
        }
      } catch (error) {
        console.error("Error fetching web-personalization context:", error);
      } finally {
        if (isMounted) {
          setTimeout(() => {
            if (isMounted) {
              setIsLoading(false);
            }
          }, 1000);
        }
      }
    }

    fetchPersonalization();

    return () => {
      isMounted = false;
    };
  }, [language]);

  // 🔄 40-Second Automatic Theme Rotation Timer for Testing All Themes
  useEffect(() => {
    if (!isAutoRotating || isLoading) return;

    const timer = setInterval(() => {
      setWeatherCategory((prev) => {
        const currentIndex = weatherRotationOrder.indexOf(prev);
        const nextIndex = (currentIndex + 1) % weatherRotationOrder.length;
        return weatherRotationOrder[nextIndex];
      });
    }, 40000); // 40 Seconds

    return () => clearInterval(timer);
  }, [isAutoRotating, isLoading]);

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

  const theme = resolveDynamicTheme(weatherCategory, personalizedResult?.context);

  return (
    <WeatherContext.Provider
      value={{
        weatherCategory,
        setWeatherCategory,
        language,
        setLanguage,
        theme,
        personalizedResult,
        isLoading,
        isAutoRotating,
        setIsAutoRotating,
      }}
    >
      {/* Full Screen Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 text-white p-4 sm:p-6 transition-all duration-700 ease-in-out select-none overflow-hidden">
          <div className="absolute w-96 h-96 bg-gradient-to-tr from-amber-500/20 via-indigo-600/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

          <div className="relative z-10 max-w-md w-full p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-2xl text-center flex flex-col items-center">
            <div className="relative flex items-center justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 shadow-xl flex items-center justify-center relative z-10 animate-bounce">
                <CloudSun className="w-10 h-10 text-amber-400 animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -right-1 z-20 bg-cyan-500/20 border border-cyan-400/50 p-1.5 rounded-full backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" style={{ animationDuration: "5s" }} />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2 font-sans flex items-center justify-center gap-2 drop-shadow-md">
              <span>{greetingText}, tanvir</span>
              <span className="text-2xl animate-bounce">👋</span>
            </h1>

            <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed mb-6 px-2 min-h-[40px] flex items-center justify-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400 shrink-0 animate-spin" style={{ animationDuration: "6s" }} />
              <span>{loadingSubtitle}</span>
            </p>

            <div className="inline-flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-full px-4 py-1.5 shadow-inner mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-extrabold tracking-wider text-slate-200 uppercase">
                {language === "bn" ? "পার্সোনালাইজেশন ইঞ্জিন প্রস্তুত করা হচ্ছে" : "Preparing Personalization Engine"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      )}

      {/* 🔄 Testing Purpose Theme Auto-Rotation Control Floating Widget */}
      {!isLoading && (
        <div className="fixed bottom-5 right-5 z-40 bg-slate-950/90 backdrop-blur-xl border border-slate-800 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 select-none transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-2">
            <RefreshCw
              className={`w-4 h-4 text-cyan-400 ${
                isAutoRotating ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "10s" }}
            />
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold tracking-wider text-white capitalize">
                Theme: {weatherCategory}
              </span>
              <span className="text-[9px] font-medium text-slate-400">
                {isAutoRotating
                  ? "Auto Switch Mode (Every 40s)"
                  : "Fixed Theme Mode"}
              </span>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-slate-800 my-auto" />

          {/* Toggle Pause / Resume */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`p-1.5 rounded-xl border transition-all ${
              isAutoRotating
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30"
                : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
            }`}
            title={isAutoRotating ? "Pause 40s Auto Rotation" : "Resume 40s Auto Rotation"}
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
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
