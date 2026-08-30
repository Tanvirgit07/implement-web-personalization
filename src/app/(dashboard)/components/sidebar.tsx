"use client";

import React, { useState } from "react";
import {
  Cloud,
  LayoutDashboard,
  Video,
  FileText,
  CheckSquare,
  Calendar,
  BarChart3,
  Layers,
  CreditCard,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Info,
} from "lucide-react";
import { useWeather } from "./weatherContext";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard Overview", icon: LayoutDashboard, href: "#", active: true },
  { label: "Meeting Insights", icon: Video, href: "#" },
  { label: "AI Notes & Transcripts", icon: FileText, href: "#" },
  { label: "Action Items", icon: CheckSquare, href: "#", badge: "12" },
  { label: "Smart Calendar", icon: Calendar, href: "#" },
  { label: "Analytics & Reports", icon: BarChart3, href: "#" },
  { label: "App Integrations", icon: Layers, href: "#" },
  { label: "Subscription & Billing", icon: CreditCard, href: "#" },
  { label: "Team Workspace", icon: Users, href: "#" },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, personalizedResult, language } = useWeather();
  const isDark = theme.isDark;

  const handleNavClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    setMobileOpen(false);

    const locationName = personalizedResult?.context?.location?.suburb
      ? `${personalizedResult.context.location.suburb}, ${personalizedResult.context.location.city}`
      : personalizedResult?.context?.location?.city || "Dhaka";

    const isBn = language === "bn";

    toast.custom(
      (t) => (
        <div className="bg-slate-900 border border-slate-700 text-white p-4 rounded-2xl shadow-2xl backdrop-blur-xl max-w-sm w-full flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Sparkles className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">
                {isBn ? `"${label}" - কাস্টম ডেমো মোড` : `"${label}" - Personalization Demo`}
              </h4>
              <p className="text-[11px] font-medium text-slate-400">
                web-personalization SDK v0.1.5
              </p>
            </div>
          </div>
          <p className="text-xs font-medium text-slate-300 leading-relaxed">
            {isBn
              ? `এই ইন্টারফেসটি ডেমো পারপাসে তৈরি। আপনার লাইভ লোকেশন (${locationName}) ও ডিভাইস কনটেক্সট ব্যবহার করে অ্যাপটি রিয়েল-টাইমে থিম পরিবর্তন করছে।`
              : `This interactive workspace demonstrates real-time user context adaptation (${locationName}) using web-personalization SDK.`}
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[10px] text-slate-400 font-semibold">
            <span>Status: Active Demo</span>
            <button
              onClick={() => toast.dismiss(t)}
              className="text-blue-400 hover:text-blue-300 font-bold"
            >
              Dismiss
            </button>
          </div>
        </div>
      ),
      { duration: 4000 }
    );
  };

  return (
    <>
      {/* Small & Medium (sm / md) Device Top Mobile Bar */}
      <div
        className={`lg:hidden sticky top-0 z-40 w-full backdrop-blur-md border-b px-4 py-3 flex items-center justify-between shadow-sm transition-all duration-500 ${theme.sidebarBgClass} ${theme.sidebarBorderClass}`}
      >
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white p-2 rounded-none shadow-sm">
            <Cloud className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className={`font-extrabold text-sm leading-none ${isDark ? "text-white" : "text-slate-950"}`}>
              CloudSync AI
            </h2>
            <span className={`text-[10px] font-semibold ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Workspace Overview
            </span>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`p-2 rounded-none transition-colors border ${
            isDark
              ? "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
              : "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200"
          }`}
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile & Tablet Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        />
      )}

      {/* Main Sidebar Container (Desktop fixed, Mobile/Tablet slide-over drawer) */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 lg:w-64 ${
          theme.sidebarBgClass
        } border-r ${
          theme.sidebarBorderClass
        } flex flex-col justify-between p-4 shadow-xl lg:shadow-none transition-all duration-500 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          {/* Brand Header Card */}
          <div className="flex items-center justify-between px-2 pt-1 pb-2">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white p-2.5 rounded-none shadow-md shadow-blue-500/20 flex items-center justify-center">
                <Cloud className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className={`font-black text-base leading-tight ${isDark ? "text-white" : "text-slate-950"}`}>
                    CloudSync
                  </h2>
                  <span className="px-1.5 py-0.5 text-[9px] font-black text-blue-600 bg-blue-500/15 rounded-none border border-blue-500/30 uppercase">
                    PRO
                  </span>
                </div>
                <p className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-600"} mt-0.5 flex items-center gap-1`}>
                  <Sparkles className="w-3 h-3 text-amber-500" /> AI Workspace
                </p>
              </div>
            </div>

            {/* Mobile close button inside drawer */}
            <button
              onClick={() => setMobileOpen(false)}
              className={`lg:hidden p-1.5 rounded-none ${
                isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Category Label */}
          <div className="px-2 flex items-center justify-between">
            <span
              className={`text-[11px] font-black uppercase tracking-wider ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Main Menu
            </span>
            <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded-none border border-blue-500/20">
              Demo Mode
            </span>
          </div>

          {/* Navigation Items List */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.label)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-none text-xs sm:text-sm font-bold transition-all duration-150 group ${
                    item.active
                      ? `bg-gradient-to-r ${theme.headerGradient} text-white shadow-md`
                      : isDark
                      ? "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        item.active
                          ? "text-white stroke-[2.5]"
                          : isDark
                          ? "text-slate-400 group-hover:text-cyan-400"
                          : "text-slate-500 group-hover:text-blue-600"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span
                      className={`px-2 py-0.5 text-[10px] font-extrabold rounded-none ${
                        item.active
                          ? "bg-white/20 text-white"
                          : isDark
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                          : "bg-blue-100 text-blue-800 border border-blue-200"
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : item.active ? (
                    <ChevronRight className="w-4 h-4 text-white/90 stroke-[3]" />
                  ) : null}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & User Profile Card */}
        <div className={`pt-4 border-t ${isDark ? "border-slate-800" : "border-slate-200"} space-y-3`}>
          <div className="space-y-1">
            <a
              href="#"
              onClick={(e) => handleNavClick(e, "Settings")}
              className={`flex items-center gap-3 px-3.5 py-2 rounded-none text-xs sm:text-sm font-bold transition-colors ${
                isDark
                  ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              <Settings className="w-4.5 h-4.5 text-slate-400 shrink-0" />
              <span>Settings</span>
            </a>
            <a
              href="#"
              onClick={(e) => handleNavClick(e, "Logout")}
              className={`flex items-center gap-3 px-3.5 py-2 rounded-none text-xs sm:text-sm font-bold transition-colors ${
                isDark
                  ? "text-slate-300 hover:bg-rose-950/50 hover:text-rose-300"
                  : "text-slate-700 hover:bg-rose-50 hover:text-rose-600"
              }`}
            >
              <LogOut className="w-4.5 h-4.5 text-slate-400 shrink-0" />
              <span>Logout</span>
            </a>
          </div>

          {/* User Account Card */}
          <div
            onClick={(e) => handleNavClick(e, "User Profile (Tanvir Ahmed)")}
            className={`p-3 border rounded-2xl flex items-center gap-3 cursor-pointer transition-all hover:scale-[1.02] ${
              isDark
                ? "bg-slate-900/90 border-slate-800 text-white hover:border-slate-700"
                : "bg-slate-50 border-slate-200 text-slate-950 shadow-sm hover:bg-slate-100/80"
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 text-white font-extrabold flex items-center justify-center text-xs shadow-sm shrink-0">
              TA
            </div>
            <div className="min-w-0 flex-1">
              <h4 className={`text-xs font-extrabold truncate ${isDark ? "text-white" : "text-slate-950"}`}>
                Tanvir Ahmed
              </h4>
              <p className={`text-[11px] font-semibold truncate ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                tanvir@cloudsync.ai
              </p>
            </div>
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
