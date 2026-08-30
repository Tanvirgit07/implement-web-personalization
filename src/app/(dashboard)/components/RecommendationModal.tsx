"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Sparkles,
  X,
  ChevronRight,
  ChevronLeft,
  Compass,
  Sun,
  CloudRain,
  Cloud,
  Zap,
  Moon,
  Thermometer,
  ShieldAlert,
  Lightbulb,
  CheckCircle2,
  MapPin,
  Minimize2,
  Pause,
  Play,
  Sliders,
  Clock,
} from "lucide-react";
import { useWeather, WeatherCategory } from "./weatherContext";
import { toast } from "sonner";
import { getGreeting, getEnvironmentMessage, trackClick, type TimePeriod } from "web-personalization";

export type ModalPosition = "bottom-right" | "bottom-left" | "top-right" | "center";

interface RecommendationItem {
  id: string;
  tag: string;
  title: string;
  message: string;
  category: WeatherCategory | "general";
  icon: React.ElementType;
  ctaText: string;
  badgeGradient: string;
}

export default function RecommendationModal() {
  const { personalizedResult, weatherCategory, isLoading: isContextLoading } = useWeather();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isTriggerVisible, setIsTriggerVisible] = useState<boolean>(true);
  const [position, setPosition] = useState<ModalPosition>("bottom-right");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Auto-Dismiss Display Duration States
  const [autoDismissEnabled, setAutoDismissEnabled] = useState<boolean>(true);
  const [autoDismissSeconds, setAutoDismissSeconds] = useState<number>(15);
  const [dismissCountdown, setDismissCountdown] = useState<number>(15);

  // Re-appear Cooldown Interval States (Periodic Resting Period)
  const [isCooldown, setIsCooldown] = useState<boolean>(false);
  const [reappearCooldownSeconds, setReappearCooldownSeconds] = useState<number>(45);
  const [, setCooldownCountdown] = useState<number>(45);

  // Derive Recommendations from web-personalization SDK result
  const buildRecommendations = useCallback((): RecommendationItem[] => {
    const items: RecommendationItem[] = [];

    const city = personalizedResult?.context.location.city || "Dhaka";
    const weather = personalizedResult?.context.weather.category || weatherCategory || "sunny";
    const tempCategory = personalizedResult?.context.temperature.category || "warm";
    const tempValue = personalizedResult?.context.temperature.value
      ? personalizedResult.context.temperature.value.toFixed(1)
      : "28.0";
    const timePeriod: TimePeriod = personalizedResult?.context.time || "evening";

    // 1. Primary Recommendations from SDK Experience
    if (personalizedResult?.experience?.recommendations && personalizedResult.experience.recommendations.length > 0) {
      personalizedResult.experience.recommendations.forEach((rec, idx) => {
        let recIcon = Sparkles;
        let bgGradient = "from-amber-500 to-orange-500";

        const lowerTitle = rec.title.toLowerCase();
        if (lowerTitle.includes("rain") || lowerTitle.includes("indoor")) {
          recIcon = CloudRain;
          bgGradient = "from-cyan-500 to-blue-600";
        } else if (lowerTitle.includes("heat") || lowerTitle.includes("warm") || lowerTitle.includes("cold")) {
          recIcon = Thermometer;
          bgGradient = "from-rose-500 to-amber-500";
        } else if (lowerTitle.includes("explore") || lowerTitle.includes("outdoor")) {
          recIcon = Compass;
          bgGradient = "from-emerald-500 to-teal-600";
        } else if (lowerTitle.includes("safe") || lowerTitle.includes("storm")) {
          recIcon = ShieldAlert;
          bgGradient = "from-purple-600 to-indigo-700";
        }

        items.push({
          id: `sdk-rec-${idx}`,
          tag: idx === 0 ? "Featured Recommendation" : "Local Suggestion",
          title: rec.title,
          message: rec.message,
          category: weather as WeatherCategory,
          icon: recIcon,
          ctaText: "Explore",
          badgeGradient: bgGradient,
        });
      });
    }

    // 2. Weather & Temperature Dynamic Recommendation
    if (weather === "rainy") {
      items.push({
        id: "weather-rainy-rec",
        tag: "Weather • Rainy",
        title: `Rainy Day in ${city}`,
        message: `It's currently rainy and humid (${tempValue}°C) in ${city}. Perfect time to schedule indoor meetings or focus on deep work.`,
        category: "rainy",
        icon: CloudRain,
        ctaText: "Indoor Spots",
        badgeGradient: "from-cyan-500 to-blue-600",
      });
    } else if (weather === "sunny") {
      items.push({
        id: "weather-sunny-rec",
        tag: "Weather • Sunny",
        title: `Enjoy the Sun in ${city}`,
        message: `Clear skies and ${tempCategory} weather (${tempValue}°C). A great time for outdoor networking or a walking break!`,
        category: "sunny",
        icon: Sun,
        ctaText: "Outdoor Places",
        badgeGradient: "from-amber-400 to-orange-500",
      });
    } else if (weather === "stormy") {
      items.push({
        id: "weather-stormy-rec",
        tag: "Weather Alert",
        title: "Stormy Weather Warning",
        message: `Heavy rain and thunder activity detected in ${city}. Please stay indoors and complete your virtual tasks safely.`,
        category: "stormy",
        icon: Zap,
        ctaText: "Stay Updated",
        badgeGradient: "from-purple-600 to-amber-500",
      });
    } else if (weather === "night") {
      items.push({
        id: "weather-night-rec",
        tag: "Night Personalization",
        title: "Peaceful Evening Focus",
        message: `Clear calm night in ${city}. Wrap up your daily meetings and review upcoming schedule for tomorrow.`,
        category: "night",
        icon: Moon,
        ctaText: "Review Schedule",
        badgeGradient: "from-indigo-500 to-purple-600",
      });
    } else {
      items.push({
        id: "weather-cloudy-rec",
        tag: "Climate Insight",
        title: "Breezy & Comfortable",
        message: `Overcast & pleasant weather in ${city}. Ideal environment for productive tasks and team syncs.`,
        category: "cloudy",
        icon: Cloud,
        ctaText: "Plan Tasks",
        badgeGradient: "from-slate-500 to-indigo-600",
      });
    }

    // 3. Time-based Productivity Suggestion
    const greetingMsg = getGreeting(timePeriod);
    items.push({
      id: "time-prod-rec",
      tag: "Productivity Insight",
      title: `${greetingMsg}! Optimize Workflow`,
      message: `Based on your local time (${timePeriod}), your personalization engine suggests prioritizing high-impact meetings and AI summary tasks.`,
      category: "general",
      icon: Lightbulb,
      ctaText: "Optimize",
      badgeGradient: "from-blue-500 to-indigo-600",
    });

    // 4. Content Engine Recommendation (only if unique)
    if (personalizedResult?.experience?.content) {
      const content = personalizedResult.experience.content;
      if (content.title && content.message) {
        items.push({
          id: "sdk-content-rec",
          tag: "AI Insight",
          title: content.title,
          message: content.message,
          category: "general",
          icon: Sparkles,
          ctaText: "Take Action",
          badgeGradient: "from-violet-500 to-fuchsia-600",
        });
      }
    }

    // Filter duplicates based on unique title
    const uniqueItems: RecommendationItem[] = [];
    const seenTitles = new Set<string>();

    for (const item of items) {
      const normalizedTitle = item.title.trim().toLowerCase();
      if (!seenTitles.has(normalizedTitle)) {
        seenTitles.add(normalizedTitle);
        uniqueItems.push(item);
      }
    }

    return uniqueItems;
  }, [personalizedResult, weatherCategory]);

  const recommendations = buildRecommendations();

  // Function to dismiss widget completely and enter cooldown resting period
  const startCooldownPeriod = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
    setIsTriggerVisible(false); // Hide recommendation button completely
    setIsCooldown(true);
    setCooldownCountdown(reappearCooldownSeconds);
  }, [reappearCooldownSeconds]);

  // Trigger floating recommendation button after page loads
  useEffect(() => {
    if (!isContextLoading && !isCooldown) {
      const timer = setTimeout(() => {
        setIsTriggerVisible(true);
        setIsOpen(false); // Only show trigger button, keep modal closed until clicked
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isContextLoading, isCooldown]);

  // Keyboard Escape Key Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showSettings) {
          setShowSettings(false);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, showSettings]);

  // Auto-Rotating Carousel Timer (cycles recommendations every 10 seconds)
  useEffect(() => {
    if (!isOpen || isMinimized || !isAutoRotating || isHovered || showSettings || recommendations.length === 0) return;

    const ROTATE_INTERVAL_MS = 10000;
    const STEP_MS = 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % recommendations.length);
          return 0;
        }
        return prev + (STEP_MS / ROTATE_INTERVAL_MS) * 100;
      });
    }, STEP_MS);

    return () => clearInterval(interval);
  }, [isOpen, isMinimized, isAutoRotating, isHovered, showSettings, recommendations.length]);

  // Auto-Dismiss Timer Logic: Closes open modal after duration, starting cooldown
  useEffect(() => {
    if (!isOpen || isMinimized || !autoDismissEnabled || isHovered || showSettings) return;

    const timer = setInterval(() => {
      setDismissCountdown((prev) => {
        if (prev <= 1) {
          startCooldownPeriod(); // Dismiss modal & trigger button, starting resting period
          return autoDismissSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isMinimized, autoDismissEnabled, autoDismissSeconds, isHovered, showSettings, startCooldownPeriod]);

  // Re-appear Cooldown Timer Logic (brings back ONLY floating recommendation button after delay)
  useEffect(() => {
    if (!isCooldown || reappearCooldownSeconds === 0) return;

    const timer = setInterval(() => {
      setCooldownCountdown((prev) => {
        if (prev <= 1) {
          setIsCooldown(false);
          setIsTriggerVisible(true); // Re-appear ONLY the recommendation button!
          setIsOpen(false);          // Modal remains closed until user clicks button
          setCurrentIndex(0);
          setDismissCountdown(autoDismissSeconds);
          return reappearCooldownSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCooldown, autoDismissSeconds, reappearCooldownSeconds]);

  // Handle Opening Modal from Trigger Button
  const handleOpenModal = () => {
    setDismissCountdown(autoDismissSeconds);
    setIsOpen(true);
    setIsMinimized(false);
    setIsTriggerVisible(true);
  };

  // Handle Dismissing Floating Trigger Button manually via small X icon
  const handleDismissTrigger = (e: React.MouseEvent) => {
    e.stopPropagation();
    startCooldownPeriod();
  };

  const goToNext = () => {
    if (recommendations.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % recommendations.length);
    setProgress(0);
  };

  const goToPrev = () => {
    if (recommendations.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + recommendations.length) % recommendations.length);
    setProgress(0);
  };

  const handleAction = (item: RecommendationItem) => {
    try {
      trackClick({
        title: item.title,
        message: item.message,
        category: item.category,
      });
    } catch {
      // ignore
    }
    toast.success(`Action Triggered: "${item.title}"`, {
      description: item.message,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    });
  };

  if (recommendations.length === 0) return null;

  // Safe item retrieval
  const safeIndex = currentIndex % recommendations.length;
  const currentItem = recommendations[safeIndex] || recommendations[0];
  const IconComponent = currentItem.icon;

  // Position classes mapping
  const positionClasses: Record<ModalPosition, string> = {
    "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6",
    "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6",
    "top-right": "top-20 right-4 sm:top-24 sm:right-6",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <>
      {/* Floating Recommendation Trigger Button (with Top-Left Close X Icon) */}
      {isTriggerVisible && (!isOpen || isMinimized) && (
        <div className="fixed bottom-6 right-6 z-50 transition-all duration-300">
          <div className="relative group">
            {/* Small Top-Left Close (X) Icon to dismiss trigger button */}
            <button
              onClick={handleDismissTrigger}
              className="absolute -top-2 -left-2 z-10 w-5 h-5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-rose-500 border border-slate-600 flex items-center justify-center shadow-lg transition-all hover:scale-110"
              title="Dismiss recommendation button"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Main Trigger Button */}
            <button
              onClick={handleOpenModal}
              className="relative flex items-center gap-2.5 bg-slate-900/95 hover:bg-slate-900 text-white px-4 py-3 rounded-full border border-slate-700/80 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-500/10 active:scale-95"
              title="Open Personalized Recommendations"
            >
              <div className="relative shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-cyan-500 rounded-full blur opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600">
                  <Sparkles className="w-4.5 h-4.5 text-amber-400" />
                </div>
              </div>

              <div className="flex flex-col text-left">
                <span className="text-xs font-bold tracking-wide text-slate-100 flex items-center gap-1.5">
                  Recommendations
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </span>
                <span className="text-[10px] font-medium text-slate-400">
                  {recommendations.length} insights available
                </span>
              </div>

              <span className="ml-1 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                {safeIndex + 1}/{recommendations.length}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Center Position Backdrop overlay */}
      {isOpen && !isMinimized && position === "center" && (
        <div
          className="fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Recommendation Modal Widget */}
      {isOpen && !isMinimized && (
        <div
          className={`fixed z-[70] w-[calc(100vw-32px)] sm:w-[410px] max-h-[85vh] transition-all duration-500 ease-out ${positionClasses[position]
            } animate-in fade-in slide-in-from-bottom-5 duration-300`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative overflow-hidden rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-slate-100 p-4 sm:p-5 transition-all duration-300 group">
            {/* Auto-Rotation Progress Bar */}
            {isAutoRotating && !isHovered && !showSettings && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800/80">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Ambient Background Glow Lighting */}
            <div className="absolute -right-12 -top-12 w-36 h-36 bg-amber-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/25 transition-all duration-500" />
            <div className="absolute -left-12 -bottom-12 w-36 h-36 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/25 transition-all duration-500" />

            {/* Modal Header Bar */}
            <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-slate-800/90 relative z-10">
              {/* Left Side Tag & Slide Counter */}
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide text-white bg-gradient-to-r ${currentItem.badgeGradient} shadow-sm shrink-0`}
                >
                  <Sparkles className="w-3 h-3 animate-spin shrink-0" style={{ animationDuration: "8s" }} />
                  <span className="truncate max-w-[120px] sm:max-w-[160px]">{currentItem.tag}</span>
                </span>

                <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                  {safeIndex + 1}/{recommendations.length}
                </span>
              </div>

              {/* Right Side Action Control Icons */}
              <div className="flex items-center gap-1 text-slate-400 shrink-0">
                {/* Auto-Dismiss Timer Indicator */}
                {autoDismissEnabled && !showSettings && (
                  <span
                    className="text-[10px] font-medium text-slate-400 bg-slate-800/70 px-2 py-0.5 rounded-full flex items-center gap-1 border border-slate-700/60"
                    title={isHovered ? "Auto-dismiss paused on hover" : `Auto closes in ${dismissCountdown}s`}
                  >
                    <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{isHovered ? "Paused" : `${dismissCountdown}s`}</span>
                  </span>
                )}

                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors ${showSettings ? "bg-slate-800 text-amber-400" : ""
                    }`}
                  title="Widget Settings"
                >
                  <Sliders className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
                  title="Minimize Modal to Button"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={startCooldownPeriod}
                  className="p-1.5 rounded-lg hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
                  title="Close & Dismiss Widget"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Settings View */}
            {showSettings ? (
              <div className="space-y-3.5 py-1 relative z-10 animate-in fade-in duration-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  Recommendation Display Settings
                </h4>

                {/* Position Selector */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-400">Screen Position:</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(["bottom-right", "bottom-left", "top-right", "center"] as ModalPosition[]).map(
                      (pos) => (
                        <button
                          key={pos}
                          onClick={() => setPosition(pos)}
                          className={`text-xs px-2 py-1.5 rounded-xl border text-capitalize font-medium transition-all ${position === pos
                              ? "bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold"
                              : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`}
                        >
                          {pos.replace("-", " ")}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Auto-Dismiss Duration Settings */}
                <div className="space-y-1 pt-1">
                  <label className="text-[11px] font-medium text-slate-400">Auto Close Timer:</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[10, 15, 30].map((sec) => (
                      <button
                        key={sec}
                        onClick={() => {
                          setAutoDismissEnabled(true);
                          setAutoDismissSeconds(sec);
                          setDismissCountdown(sec);
                        }}
                        className={`text-xs py-1.5 rounded-xl border font-semibold transition-all ${autoDismissEnabled && autoDismissSeconds === sec
                            ? "bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-bold"
                            : "bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                          }`}
                      >
                        {sec}s
                      </button>
                    ))}
                    <button
                      onClick={() => setAutoDismissEnabled(!autoDismissEnabled)}
                      className={`text-xs py-1.5 rounded-xl border font-semibold transition-all ${!autoDismissEnabled
                          ? "bg-rose-500/20 border-rose-500/60 text-rose-300 font-bold"
                          : "bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`}
                    >
                      Off
                    </button>
                  </div>
                </div>

                {/* Re-appear Interval Settings */}
                <div className="space-y-1 pt-1">
                  <label className="text-[11px] font-medium text-slate-400">Re-appear Cooldown Interval:</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[30, 45, 60].map((sec) => (
                      <button
                        key={sec}
                        onClick={() => {
                          setReappearCooldownSeconds(sec);
                          if (isCooldown) setCooldownCountdown(sec);
                        }}
                        className={`text-xs py-1.5 rounded-xl border font-semibold transition-all ${reappearCooldownSeconds === sec
                            ? "bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold"
                            : "bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                          }`}
                      >
                        {sec}s
                      </button>
                    ))}
                    <button
                      onClick={() => setReappearCooldownSeconds(0)}
                      className={`text-xs py-1.5 rounded-xl border font-semibold transition-all ${reappearCooldownSeconds === 0
                          ? "bg-rose-500/20 border-rose-500/60 text-rose-300 font-bold"
                          : "bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`}
                    >
                      Off
                    </button>
                  </div>
                </div>

                {/* Auto Rotate Toggle */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                  <span className="text-xs font-medium text-slate-300">Auto Rotate Carousel (10s):</span>
                  <button
                    onClick={() => setIsAutoRotating(!isAutoRotating)}
                    className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 font-bold transition-all ${isAutoRotating
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                        : "bg-slate-800 border-slate-700 text-slate-400"
                      }`}
                  >
                    {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {isAutoRotating ? "Active" : "Paused"}
                  </button>
                </div>

                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full mt-2 py-2 bg-slate-800 hover:bg-slate-750 text-xs font-bold rounded-xl text-slate-200 transition-colors"
                >
                  Done Settings
                </button>
              </div>
            ) : (
              /* Main Recommendation Body */
              <div className="relative z-10 space-y-3.5">
                <div className="flex items-start gap-3">
                  {/* Glowing Icon Box */}
                  <div className="relative shrink-0 mt-0.5">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${currentItem.badgeGradient} rounded-xl blur-sm opacity-60`} />
                    <div className="relative w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-white shadow-lg">
                      <IconComponent className="w-5 h-5 text-amber-300 shrink-0" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-extrabold tracking-tight text-white leading-snug truncate">
                      {currentItem.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1 font-medium line-clamp-3">
                      {currentItem.message}
                    </p>
                  </div>
                </div>

                {/* Environment Context Tagline */}
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800/80">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">
                    {personalizedResult
                      ? `${personalizedResult.context.location.city || "Dhaka"} • ${getEnvironmentMessage(
                        personalizedResult.context.weather.category,
                        personalizedResult.context.temperature.category
                      )}`
                      : "Live Personalization Connected"}
                  </span>
                </div>

                {/* Footer Controls & CTA Action Button */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  {/* Left Side: Navigation Buttons & Dots */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={goToPrev}
                        className="p-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
                        title="Previous Suggestion"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={goToNext}
                        className="p-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
                        title="Next Suggestion"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Carousel Dot Indicators */}
                    <div className="flex items-center gap-1">
                      {recommendations.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setCurrentIndex(idx);
                            setProgress(0);
                          }}
                          className={`h-1.5 rounded-full transition-all duration-300 ${idx === safeIndex
                              ? "w-4 bg-gradient-to-r from-amber-400 to-orange-400"
                              : "w-1.5 bg-slate-700 hover:bg-slate-500"
                            }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right Side: Call to Action Button */}
                  <button
                    onClick={() => handleAction(currentItem)}
                    className={`inline-flex items-center justify-center gap-1 text-xs font-extrabold text-slate-950 px-3.5 py-1.5 rounded-xl bg-gradient-to-r ${currentItem.badgeGradient} hover:brightness-110 active:scale-95 shadow-md transition-all shrink-0 max-w-[140px] sm:max-w-[180px]`}
                  >
                    <span className="truncate">{currentItem.ctaText}</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[3] shrink-0" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
