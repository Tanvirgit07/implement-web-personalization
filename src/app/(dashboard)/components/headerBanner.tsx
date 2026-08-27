"use client";

import React, { useState, useEffect } from "react";
import { Sun, CloudRain, Cloud, Zap, Moon, MapPin } from "lucide-react";
import { getGreeting, getEnvironmentMessage } from "web-personalization";
import { useWeather, WeatherCategory } from "./weatherContext";

interface WeatherConfig {
  category: WeatherCategory;
  temp: string;
  condition: string;
  icon: React.ElementType;
}

const weatherPresets: Record<WeatherCategory, WeatherConfig> = {
  sunny: {
    category: "sunny",
    temp: "30.5°C",
    condition: "Sunny • Hot",
    icon: Sun,
  },
  rainy: {
    category: "rainy",
    temp: "22.0°C",
    condition: "Rainy • Humid",
    icon: CloudRain,
  },
  cloudy: {
    category: "cloudy",
    temp: "24.5°C",
    condition: "Cloudy • Breezy",
    icon: Cloud,
  },
  stormy: {
    category: "stormy",
    temp: "19.5°C",
    condition: "Stormy • Heavy Rain",
    icon: Zap,
  },
  night: {
    category: "night",
    temp: "21.0°C",
    condition: "Clear • Calm Night",
    icon: Moon,
  },
};

interface HeaderBannerProps {
  category?: WeatherCategory;
}

export default function HeaderBanner({ category }: HeaderBannerProps) {
  const { weatherCategory, theme, personalizedResult } = useWeather();
  const currentCategory = category || weatherCategory || "sunny";
  const [isGraphicVisible, setIsGraphicVisible] = useState<boolean>(true);

  // Periodic entrance/exit animation for ONLY the current weather graphic
  useEffect(() => {
    const interval = setInterval(() => {
      // Step 1: Smoothly hide only the current weather graphic
      setIsGraphicVisible(false);

      // Step 2: After exit animation completes (700ms), slide back in from left showing the SAME current weather graphic
      setTimeout(() => {
        setIsGraphicVisible(true);
      }, 800);
    }, 15000); // Cycles every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const config = weatherPresets[currentCategory] || weatherPresets.sunny;
  const SmallIcon = config.icon;

  // Render SVG Graphic Illustration based on Current Weather Category
  const renderWeatherGraphic = () => {
    switch (currentCategory) {
      case "rainy":
        return (
          <div className="relative flex items-center justify-center">
            <div className="absolute w-14 h-14 bg-cyan-300/40 rounded-full blur-md" />
            <svg
              className="w-14 h-14 text-white fill-cyan-100 drop-shadow-lg relative z-10"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"
                className="fill-cyan-100 stroke-white"
              />
              <line x1="8" y1="16" x2="8" y2="20" stroke="#67e8f9" strokeWidth="2.5" strokeLinecap="round" className="animate-bounce" />
              <line x1="12" y1="18" x2="12" y2="22" stroke="#67e8f9" strokeWidth="2.5" strokeLinecap="round" className="animate-bounce [animation-delay:200ms]" />
              <line x1="16" y1="16" x2="16" y2="20" stroke="#67e8f9" strokeWidth="2.5" strokeLinecap="round" className="animate-bounce [animation-delay:400ms]" />
            </svg>
          </div>
        );

      case "cloudy":
        return (
          <div className="relative flex items-center justify-center">
            <div className="absolute w-14 h-14 bg-indigo-200/40 rounded-full blur-md" />
            <svg
              className="w-14 h-14 text-indigo-100 fill-white drop-shadow-lg relative z-10"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
                className="fill-white stroke-indigo-100"
              />
            </svg>
          </div>
        );

      case "stormy":
        return (
          <div className="relative flex items-center justify-center">
            <div className="absolute w-14 h-14 bg-amber-400/50 rounded-full blur-md" />
            <svg
              className="w-14 h-14 text-amber-200 fill-slate-800 drop-shadow-lg relative z-10"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M17.5 15H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
                className="fill-slate-800 stroke-purple-200"
              />
              <polygon
                points="13 11 9 17 12 17 11 23 17 15 14 15 17 11"
                className="fill-amber-400 stroke-amber-200 animate-pulse"
              />
            </svg>
          </div>
        );

      case "night":
        return (
          <div className="relative flex items-center justify-center">
            <div className="absolute w-14 h-14 bg-indigo-400/40 rounded-full blur-md" />
            <svg
              className="w-14 h-14 text-indigo-100 fill-amber-300 drop-shadow-lg relative z-10"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
                className="fill-amber-300 stroke-amber-100"
              />
              <circle cx="19" cy="5" r="1.2" className="fill-white" />
              <circle cx="21" cy="9" r="1" className="fill-white" />
            </svg>
          </div>
        );

      case "sunny":
      default:
        return (
          <div className="relative flex items-center justify-center">
            <div className="absolute w-14 h-14 bg-yellow-300/40 rounded-full blur-md" />
            <svg
              className="w-14 h-14 text-yellow-200 fill-amber-300 drop-shadow-md relative z-10"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" className="fill-amber-300 stroke-yellow-100" />
              <line x1="12" y1="1" x2="12" y2="3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="21" x2="12" y2="23" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <line x1="1" y1="12" x2="3" y2="12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <line x1="21" y1="12" x2="23" y2="12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        );
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 w-full bg-gradient-to-r ${theme.headerGradient} text-white rounded-none p-6 sm:p-8 shadow-none overflow-hidden transition-all duration-700 ease-in-out`}
    >
      {/* Background Subtle Glow Effect */}
      <div
        className={`absolute right-12 -top-10 w-48 h-48 ${theme.headerGlow} rounded-full blur-2xl pointer-events-none transition-all duration-700`}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm uppercase flex items-center gap-2">
            <span>
              {personalizedResult
                ? `${getGreeting(personalizedResult.context.time)}, tanvir`
                : "Good Evening, tanvir"}
            </span>
            <span className="text-2xl">👋</span>
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs sm:text-sm font-medium text-white/90">
            <span className="flex items-center gap-1">
              <SmallIcon className="w-4 h-4 text-white/90" />
              {personalizedResult
                ? getEnvironmentMessage(
                    personalizedResult.context.weather.category,
                    personalizedResult.context.temperature.category
                  )
                : `It's ${config.condition.toLowerCase()} outside`}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {personalizedResult
                ? `${personalizedResult.context.location.city || "Dhaka"}, ${personalizedResult.context.location.country || "Bangladesh"}`
                : "Dhaka, Bangladesh"}
            </span>
          </div>
        </div>

        {/* Right side Weather & Profile avatar matching reference image */}
        <div className="flex items-center gap-3 sm:gap-5 self-end sm:self-center">
          {/* Temperature and condition text (ALWAYS FIXED & VISIBLE) */}
          <div className="flex flex-col items-end sm:items-start text-right sm:text-left">
            <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm leading-none">
              <SmallIcon className="w-6 h-6 text-white stroke-[2.5]" />
              <span>
                {personalizedResult
                  ? `${personalizedResult.context.temperature.value.toFixed(1)}°C`
                  : config.temp}
              </span>
            </div>
            <span className="text-xs font-medium text-white/90 mt-1 capitalize">
              {personalizedResult
                ? `${personalizedResult.context.weather.category} • ${personalizedResult.context.temperature.category}`
                : config.condition}
            </span>
          </div>

          {/* ONLY the current weather category SVG graphic illustration slides in/out smoothly */}
          <div
            className={`transition-all duration-700 transform ease-in-out ${
              isGraphicVisible
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 -translate-x-6 scale-90 pointer-events-none"
            }`}
          >
            {renderWeatherGraphic()}
          </div>

          {/* Vertical Divider Line (ALWAYS FIXED & VISIBLE) */}
          <div className="h-9 w-[1px] bg-white/40 my-auto shrink-0" />

          {/* Circular Translucent Profile Avatar (ALWAYS FIXED & VISIBLE) */}
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white font-extrabold flex items-center justify-center text-xs shadow-inner shrink-0">
            SK
          </div>
        </div>
      </div>
    </header>
  );
}
