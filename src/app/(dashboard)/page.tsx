"use client";

import React from "react";
import HeaderBanner from "./components/headerBanner";
import {
  StateCard,
  MeetingActivityChart,
  UpcomingMeetings,
  AiProcessing,
  RecentProcessingQueue,
  RecentActivity,
} from "./components";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Warm Orange/Amber Header Banner */}
      <HeaderBanner />

      <div className="px-4 sm:px-8 space-y-6">
        {/* Breadcrumb & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span>Dashboard</span>
              <span>&gt;</span>
              <span className="text-slate-700 dark:text-slate-200">Overview</span>
            </div>
            <p className="text-xs font-medium text-slate-400 mt-1">
              Overview of your meetings and AI insights.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2.5 rounded-none text-xs font-semibold shadow-sm shadow-blue-600/20 transition-all">
            <Plus className="w-4 h-4" />
            <span>Add Meeting</span>
          </button>
        </div>

        {/* 1. State Cards Section */}
        <section>
          <StateCard />
        </section>

        {/* Middle Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 2. Meeting Activity Chart (8 Cols) */}
          <section className="lg:col-span-8 flex flex-col">
            <MeetingActivityChart />
          </section>

          {/* Right Column Stack (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 flex flex-col">
            {/* 4. AI Processing */}
            <section>
              <AiProcessing />
            </section>

            {/* 5. Recent Processing Queue */}
            <section className="flex-1">
              <RecentProcessingQueue />
            </section>
          </div>
        </div>

        {/* Bottom Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 3. Upcoming Meetings (8 Cols) */}
          <section className="lg:col-span-8">
            <UpcomingMeetings />
          </section>

          {/* 6. Recent Activity (4 Cols) */}
          <section className="lg:col-span-4">
            <RecentActivity />
          </section>
        </div>
      </div>
    </div>
  );
}