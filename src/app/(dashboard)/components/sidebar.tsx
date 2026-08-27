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
} from "lucide-react";
import { useWeather } from "./weatherContext";

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
  const { theme, weatherCategory } = useWeather();

  const isDark = weatherCategory === "stormy" || weatherCategory === "night" || weatherCategory === "rainy" || weatherCategory === "cloudy";

  return (
    <>
      {/* Small & Medium (sm / md) Device Top Mobile Bar */}
      <div className={`lg:hidden sticky top-0 z-40 w-full backdrop-blur-md border-b px-4 py-3 flex items-center justify-between shadow-sm transition-all duration-700 ${theme.sidebarBgClass} ${theme.sidebarBorderClass}`}>
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white p-2 rounded-none shadow-sm">
            <Cloud className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="font-bold text-sm leading-none">
              CloudSync AI
            </h2>
            <span className="text-[10px] font-medium text-slate-400">
              Workspace Overview
            </span>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`p-2 rounded-none transition-colors ${
            isDark ? "bg-slate-800 text-slate-200 hover:bg-slate-700" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
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
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 lg:w-64 ${theme.sidebarBgClass} border-r ${theme.sidebarBorderClass} flex flex-col justify-between p-4 shadow-xl lg:shadow-none transition-all duration-700 ease-in-out ${
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
                  <h2 className="font-extrabold text-base leading-tight">
                    CloudSync
                  </h2>
                  <span className="px-1.5 py-0.2 text-[9px] font-extrabold text-blue-500 bg-blue-500/10 rounded-none border border-blue-500/30 uppercase">
                    PRO
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-400 mt-0.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> AI Workspace
                </p>
              </div>
            </div>

            {/* Mobile close button inside drawer */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-none text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Category Label */}
          <div className="px-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Main Menu
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
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-none text-xs sm:text-sm font-semibold transition-all duration-150 group ${
                    item.active
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25"
                      : isDark
                      ? "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                      : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        item.active
                          ? "text-white"
                          : "text-slate-400 group-hover:text-blue-500"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-none ${
                        item.active
                          ? "bg-white/20 text-white"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : item.active ? (
                    <ChevronRight className="w-4 h-4 text-white/70" />
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
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-none text-xs sm:text-sm font-semibold transition-colors ${
                isDark ? "text-slate-300 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Settings className="w-4.5 h-4.5 text-slate-400 shrink-0" />
              <span>Settings</span>
            </a>
            <a
              href="#"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-none text-xs sm:text-sm font-semibold transition-colors ${
                isDark ? "text-slate-300 hover:bg-rose-950/40 hover:text-rose-400" : "text-slate-700 hover:bg-rose-50 hover:text-rose-600"
              }`}
            >
              <LogOut className="w-4.5 h-4.5 text-slate-400 shrink-0" />
              <span>Logout</span>
            </a>
          </div>

          {/* User Account Card */}
          <div className={`p-3 border rounded-none flex items-center gap-3 transition-colors ${
            isDark ? "bg-slate-800/80 border-slate-700/80" : "bg-slate-50 border-slate-200/80"
          }`}>
            <div className="w-9 h-9 rounded-none bg-gradient-to-tr from-amber-400 to-rose-500 text-white font-extrabold flex items-center justify-center text-xs shadow-sm shrink-0">
              TA
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold truncate">
                Tanvir Ahmed
              </h4>
              <p className="text-[11px] font-medium text-slate-400 truncate">
                tanvir@cloudsync.ai
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
