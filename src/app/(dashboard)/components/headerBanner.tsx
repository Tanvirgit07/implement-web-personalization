"use client";

import React, { useState, useEffect } from "react";
import { Sun, CloudRain, Cloud, Zap, Moon, MapPin, Laptop, Smartphone, Tablet } from "lucide-react";
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
  const { weatherCategory, theme, personalizedResult, language, setLanguage } = useWeather();
  const currentCategory = category || weatherCategory || "sunny";
  const [isGraphicVisible, setIsGraphicVisible] = useState<boolean>(true);

  // Periodic entrance/exit animation for the right weather badge
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGraphicVisible(false);

      setTimeout(() => {
        setIsGraphicVisible(true);
      }, 800);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const config = weatherPresets[currentCategory] || weatherPresets.sunny;
  const SmallIcon = config.icon;

  const getLocationString = () => {
    if (!personalizedResult?.context?.location) return "Dhaka, Bangladesh";
    const loc = personalizedResult.context.location;
    const suburb = loc.suburb;
    const city = loc.city || "Dhaka";
    const country = loc.country || "Bangladesh";

    if (suburb) {
      return `${suburb}, ${city}`;
    }
    return `${city}, ${country}`;
  };

  const getDeviceIcon = () => {
    const deviceType = personalizedResult?.context?.device?.type;
    if (deviceType === "mobile") return Smartphone;
    if (deviceType === "tablet") return Tablet;
    return Laptop;
  };

  const DeviceIcon = getDeviceIcon();

  // 🌤️ Full Header Ambient Animated Background System
  const renderHeaderAmbientAnimation = () => {
    switch (currentCategory) {
      case "cloudy":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <style>{`
              @keyframes floatCloudLeft {
                0% { transform: translateX(0px) translateY(0px); }
                50% { transform: translateX(35px) translateY(-10px); }
                100% { transform: translateX(0px) translateY(0px); }
              }
              @keyframes floatCloudRight {
                0% { transform: translateX(0px) translateY(0px); }
                50% { transform: translateX(-30px) translateY(8px); }
                100% { transform: translateX(0px) translateY(0px); }
              }
            `}</style>

            {/* Cloud 1: Far Left Cloud */}
            <div
              className="absolute -top-4 left-4 opacity-45 animate-pulse"
              style={{
                animation: "floatCloudLeft 14s ease-in-out infinite, pulse 6s ease-in-out infinite",
              }}
            >
              <Cloud className="w-28 h-28 text-white fill-white/20" />
            </div>

            {/* Cloud 2: Left Center Cloud */}
            <div
              className="absolute top-2 left-1/4 opacity-40"
              style={{
                animation: "floatCloudRight 11s ease-in-out infinite, pulse 8s ease-in-out infinite",
                animationDelay: "1s",
              }}
            >
              <Cloud className="w-24 h-24 text-sky-100 fill-sky-100/30" />
            </div>

            {/* Cloud 3: Center Cloud */}
            <div
              className="absolute -top-6 left-1/2 opacity-35"
              style={{
                animation: "floatCloudLeft 16s ease-in-out infinite, pulse 7s ease-in-out infinite",
                animationDelay: "2s",
              }}
            >
              <Cloud className="w-36 h-36 text-white fill-white/25" />
            </div>

            {/* Cloud 4: Right Center Cloud */}
            <div
              className="absolute top-1 right-1/4 opacity-45"
              style={{
                animation: "floatCloudRight 13s ease-in-out infinite, pulse 9s ease-in-out infinite",
                animationDelay: "0.5s",
              }}
            >
              <Cloud className="w-30 h-30 text-indigo-100 fill-indigo-100/20" />
            </div>

            {/* Cloud 5: Far Right Cloud */}
            <div
              className="absolute -bottom-6 right-6 opacity-35"
              style={{
                animation: "floatCloudLeft 15s ease-in-out infinite, pulse 10s ease-in-out infinite",
                animationDelay: "1.5s",
              }}
            >
              <Cloud className="w-40 h-40 text-slate-100 fill-slate-100/20" />
            </div>
          </div>
        );

      case "rainy":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <style>{`
              @keyframes realisticRain {
                0% {
                  transform: translateY(-50px) translateX(0px) rotate(-12deg);
                  opacity: 0;
                }
                15% {
                  opacity: 0.85;
                }
                85% {
                  opacity: 0.85;
                }
                100% {
                  transform: translateY(240px) translateX(-35px) rotate(-12deg);
                  opacity: 0;
                }
              }
              @keyframes cloudDriftRain {
                0% { transform: translateX(0px); }
                50% { transform: translateX(20px); }
                100% { transform: translateX(0px); }
              }
            `}</style>

            {/* Overcast Rain Clouds floating in background */}
            <div className="absolute -top-8 left-10 opacity-30 animate-pulse" style={{ animationDuration: "7s" }}>
              <Cloud className="w-36 h-36 text-teal-200 fill-teal-100/30" />
            </div>
            <div className="absolute -top-10 right-1/4 opacity-25" style={{ animation: "cloudDriftRain 12s ease-in-out infinite" }}>
              <Cloud className="w-44 h-44 text-cyan-200 fill-cyan-100/20" />
            </div>
            <div className="absolute -top-6 right-10 opacity-35 animate-pulse" style={{ animationDuration: "9s" }}>
              <Cloud className="w-32 h-32 text-blue-200 fill-blue-100/25" />
            </div>

            {/* Hyper-Realistic Rain Streak Overlay (32 Staggered Diagonal Falling Raindrops) */}
            <div className="absolute inset-0 flex justify-between px-2">
              {[...Array(32)].map((_, i) => {
                const height = 30 + (i % 5) * 10;
                const duration = 0.65 + (i % 4) * 0.18;
                const delay = (i * 0.08) % 1.5;
                const opacity = 0.45 + (i % 3) * 0.25;

                return (
                  <div
                    key={i}
                    className="w-[1.5px] bg-gradient-to-b from-cyan-100 via-cyan-300 to-transparent rounded-full"
                    style={{
                      height: `${height}px`,
                      animation: `realisticRain ${duration}s linear infinite`,
                      animationDelay: `${delay}s`,
                      opacity,
                    }}
                  />
                );
              })}
            </div>
          </div>
        );

      case "stormy":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <style>{`
              @keyframes lightningFlashFull {
                0%, 86%, 94%, 100% {
                  opacity: 0;
                  background-color: transparent;
                }
                88% {
                  opacity: 0.75;
                  background-color: rgba(253, 230, 138, 0.25);
                }
                90% {
                  opacity: 0.2;
                  background-color: rgba(192, 132, 252, 0.15);
                }
                92% {
                  opacity: 0.9;
                  background-color: rgba(255, 255, 255, 0.35);
                }
              }
              @keyframes stormCloudDrift {
                0% { transform: translateX(0px) translateY(0px); }
                50% { transform: translateX(25px) translateY(-6px); }
                100% { transform: translateX(0px) translateY(0px); }
              }
            `}</style>

            {/* ⚡ Full-Header Dynamic Lightning Flash Reflection Overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none transition-all"
              style={{
                animation: "lightningFlashFull 5s ease-in-out infinite",
              }}
            />

            {/* Thunderstorm Dark Ambient Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-950/40 via-indigo-950/50 to-slate-950/60 pointer-events-none z-0" />

            {/* Heavy Storm Clouds */}
            <div className="absolute -top-6 left-6 opacity-50" style={{ animation: "stormCloudDrift 10s ease-in-out infinite" }}>
              <Cloud className="w-40 h-40 text-purple-200 fill-slate-900/80 drop-shadow-2xl" />
            </div>

            <div className="absolute -top-10 left-1/3 opacity-40" style={{ animation: "stormCloudDrift 14s ease-in-out infinite", animationDelay: "1s" }}>
              <Cloud className="w-48 h-48 text-indigo-200 fill-indigo-950/70" />
            </div>

            <div className="absolute -top-8 right-12 opacity-45" style={{ animation: "stormCloudDrift 11s ease-in-out infinite", animationDelay: "2s" }}>
              <Cloud className="w-36 h-36 text-purple-300 fill-purple-950/80" />
            </div>

            {/* Electric Zap Lightning Bolts */}
            <div className="absolute right-1/3 top-1 animate-pulse opacity-70" style={{ animationDuration: "2.2s" }}>
              <Zap className="w-24 h-24 text-amber-300 fill-amber-300/40 drop-shadow-[0_0_18px_rgba(252,211,77,0.7)]" />
            </div>

            <div className="absolute left-1/4 top-3 animate-pulse opacity-60" style={{ animationDuration: "3.5s", animationDelay: "800ms" }}>
              <Zap className="w-16 h-16 text-cyan-200 fill-cyan-200/30 drop-shadow-[0_0_14px_rgba(165,243,252,0.6)]" />
            </div>
          </div>
        );

      case "night":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <style>{`
              @keyframes twinkleStar {
                0%, 100% {
                  opacity: 0.2;
                  transform: scale(0.7);
                }
                50% {
                  opacity: 1;
                  transform: scale(1.3);
                }
              }
              @keyframes moonGlowPulse {
                0%, 100% {
                  transform: scale(1) translateY(0px);
                  opacity: 0.85;
                }
                50% {
                  transform: scale(1.05) translateY(-4px);
                  opacity: 1;
                }
              }
            `}</style>

            {/* Glowing Golden Crescent Moon with Ambient Aura */}
            <div className="absolute right-1/4 -top-3 z-0 pointer-events-none" style={{ animation: "moonGlowPulse 8s ease-in-out infinite" }}>
              <div className="w-36 h-36 bg-amber-300/20 rounded-full blur-2xl absolute -top-4 -left-4" />
              <Moon className="w-28 h-28 text-amber-200 fill-amber-200/30 drop-shadow-[0_0_20px_rgba(253,230,138,0.5)]" />
            </div>

            {/* 36 Twinkling Stars Scattered Across Full Header */}
            <div className="absolute inset-0">
              {[...Array(36)].map((_, i) => {
                const size = 1.5 + (i % 3) * 1.2;
                const top = 5 + ((i * 17) % 85);
                const left = 2 + ((i * 23) % 94);
                const duration = 1.5 + (i % 5) * 0.7;
                const delay = (i * 0.12) % 2.5;

                return (
                  <div
                    key={i}
                    className="absolute bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.9)]"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      top: `${top}%`,
                      left: `${left}%`,
                      animation: `twinkleStar ${duration}s ease-in-out infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        );

      case "sunny":
      default:
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <style>{`
              @keyframes solarPulseGlow {
                0%, 100% {
                  transform: scale(1);
                  opacity: 0.85;
                }
                50% {
                  transform: scale(1.1);
                  opacity: 1;
                }
              }
              @keyframes floatSunnyCloud {
                0% { transform: translateX(0px) translateY(0px); }
                50% { transform: translateX(25px) translateY(-5px); }
                100% { transform: translateX(0px) translateY(0px); }
              }
            `}</style>

            {/* Radiant Lens Flare Atmosphere Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-yellow-300/15 to-transparent pointer-events-none" />

            {/* Glowing Golden Solar Corona Glow */}
            <div
              className="absolute -right-12 -top-16 w-80 h-80 bg-gradient-to-tr from-amber-400/35 via-yellow-300/30 to-amber-100/20 rounded-full blur-3xl"
              style={{ animation: "solarPulseGlow 6s ease-in-out infinite" }}
            />

            {/* Outer Slow Rotating Solar Rays */}
            <div
              className="absolute -right-10 -top-10 animate-spin opacity-45 text-amber-200"
              style={{ animationDuration: "35s" }}
            >
              <svg className="w-56 h-56" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="22" className="fill-amber-300/40" />
                {[...Array(12)].map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="10"
                    x2="50"
                    y2="2"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    transform={`rotate(${i * 30} 50 50)`}
                  />
                ))}
              </svg>
            </div>

            {/* Inner Reverse Rotating Radiant Rays */}
            <div
              className="absolute -right-4 -top-4 animate-spin opacity-60 text-yellow-100"
              style={{ animationDuration: "22s", animationDirection: "reverse" }}
            >
              <svg className="w-44 h-44" viewBox="0 0 100 100">
                {[...Array(8)].map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="16"
                    x2="50"
                    y2="6"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    transform={`rotate(${i * 45 + 22.5} 50 50)`}
                  />
                ))}
              </svg>
            </div>

            {/* Glowing Core Sun */}
            <div className="absolute right-10 top-4 w-20 h-20 bg-gradient-to-tr from-amber-400 via-yellow-300 to-white rounded-full shadow-[0_0_40px_rgba(251,191,36,0.8)] border border-amber-100/50" />

            {/* Soft Wispy Summer Clouds Centered in Foreground */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-3 opacity-40" style={{ animation: "floatSunnyCloud 12s ease-in-out infinite" }}>
              <Cloud className="w-32 h-32 text-white fill-white/30 drop-shadow-md" />
            </div>

            <div className="absolute left-[44%] -bottom-4 opacity-30" style={{ animation: "floatSunnyCloud 16s ease-in-out infinite", animationDelay: "2s" }}>
              <Cloud className="w-36 h-36 text-yellow-100 fill-white/25" />
            </div>
          </div>
        );
    }
  };

  const renderWeatherGraphic = () => {
    switch (currentCategory) {
      case "rainy":
        return (
          <div className="relative flex items-center justify-center">
            <div className="absolute w-14 h-14 bg-cyan-300/40 blur-md" />
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
              <line x1="8" y1="16" x2="6" y2="21" stroke="#67e8f9" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse" />
              <line x1="12" y1="17" x2="10" y2="22" stroke="#67e8f9" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse [animation-delay:200ms]" />
              <line x1="16" y1="16" x2="14" y2="21" stroke="#67e8f9" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse [animation-delay:400ms]" />
            </svg>
          </div>
        );

      case "cloudy":
        return (
          <div className="relative flex items-center justify-center">
            <div className="absolute w-14 h-14 bg-indigo-200/40 blur-md" />
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
            <div className="absolute w-14 h-14 bg-amber-400/50 blur-md" />
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
            <div className="absolute w-14 h-14 bg-indigo-400/40 blur-md" />
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
            <div className="absolute w-14 h-14 bg-yellow-300/40 blur-md" />
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
      className={`sticky top-0 z-30 w-full bg-gradient-to-r ${theme.headerGradient} text-white rounded-none p-6 sm:p-8 shadow-none overflow-hidden transition-all duration-700 ease-in-out relative`}
    >
      {/* Background Subtle Glow Effect */}
      <div
        className={`absolute right-12 -top-10 w-48 h-48 ${theme.headerGlow} blur-2xl pointer-events-none transition-all duration-700`}
      />

      {/* 🌤️ Full Header Ambient Floating Weather Graphic Animation Layer */}
      {renderHeaderAmbientAnimation()}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm uppercase flex items-center gap-2">
              <span>
                {personalizedResult
                  ? `${getGreeting(personalizedResult.context.time, language)}, tanvir`
                  : "Good Evening, tanvir"}
              </span>
              <span className="text-2xl animate-bounce">👋</span>
            </h1>

            {/* Language Switcher Button (EN / BN) */}
            <div className="inline-flex items-center bg-white/15 backdrop-blur-md border border-white/30 rounded-none p-0.5 shadow-inner">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-0.5 rounded-none text-[11px] font-bold transition-all ${
                  language === "en"
                    ? "bg-white text-slate-950 shadow-md scale-105"
                    : "text-white/80 hover:text-white"
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("bn")}
                className={`px-2.5 py-0.5 rounded-none text-[11px] font-bold transition-all ${
                  language === "bn"
                    ? "bg-white text-slate-950 shadow-md scale-105"
                    : "text-white/80 hover:text-white"
                }`}
                title="বাংলা নির্বাচন করুন"
              >
                বাংলা
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs sm:text-sm font-medium text-white/90">
            <span className="flex items-center gap-1">
              <SmallIcon className="w-4 h-4 text-white/90" />
              {personalizedResult
                ? getEnvironmentMessage(
                    personalizedResult.context.weather.category,
                    personalizedResult.context.temperature.category,
                    language
                  )
                : `It's ${config.condition.toLowerCase()} outside`}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 bg-white/15 px-2.5 py-0.5 rounded-none backdrop-blur-sm border border-white/20">
              <MapPin className="w-3.5 h-3.5 text-cyan-200" />
              {getLocationString()}
            </span>
            {personalizedResult?.context?.device && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1 bg-white/15 px-2.5 py-0.5 rounded-none backdrop-blur-sm border border-white/20 capitalize text-[11px]">
                  <DeviceIcon className="w-3 h-3 text-amber-200" />
                  {personalizedResult.context.device.type} ({personalizedResult.context.device.os})
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right side Weather & Profile avatar */}
        <div className="flex items-center gap-3 sm:gap-5 self-end sm:self-center">
          {/* Temperature and condition text */}
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

          {/* Weather Category SVG graphic badge */}
          <div
            className={`transition-all duration-700 transform ease-in-out ${
              isGraphicVisible
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 -translate-x-6 scale-90 pointer-events-none"
            }`}
          >
            {renderWeatherGraphic()}
          </div>

          {/* Vertical Divider Line */}
          <div className="h-9 w-[1px] bg-white/40 my-auto shrink-0" />

          {/* Profile Avatar */}
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white font-extrabold flex items-center justify-center text-xs shadow-inner shrink-0">
            SK
          </div>
        </div>
      </div>
    </header>
  );
}
