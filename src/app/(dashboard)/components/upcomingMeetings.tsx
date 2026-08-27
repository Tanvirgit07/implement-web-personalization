"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Video } from "lucide-react";
import { useWeather } from "./weatherContext";

export interface MeetingItem {
  id: string;
  time: string;
  title: string;
  host: {
    name: string;
    avatar: string;
  };
  platform: "Zoom" | "Google Meet" | "MS Teams";
  participants: string[];
}

const defaultMeetings: MeetingItem[] = [
  {
    id: "m1",
    time: "09:00 AM",
    title: "Q3 Strategy Review",
    host: {
      name: "Sarah Khan",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
    platform: "Zoom",
    participants: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "m2",
    time: "11:30 AM",
    title: "Client Onboarding",
    host: {
      name: "Tanvir Ahmed",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    },
    platform: "Google Meet",
    participants: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "m3",
    time: "02:00 PM",
    title: "Design Sync & Demo",
    host: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    },
    platform: "MS Teams",
    participants: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "m4",
    time: "04:30 PM",
    title: "Weekly Standup",
    host: {
      name: "Emily Chen",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    },
    platform: "Zoom",
    participants: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    ],
  },
];

export default function UpcomingMeetings() {
  const { theme } = useWeather();

  return (
    <div className={`${theme.cardBgClass} border ${theme.cardBorderClass} rounded-none p-5 shadow-sm transition-all duration-700`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">
          Upcoming Meetings
        </h3>
        <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] font-semibold text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
              <th className="pb-3 font-semibold">Time</th>
              <th className="pb-3 font-semibold">Meeting</th>
              <th className="pb-3 font-semibold">Host</th>
              <th className="pb-3 font-semibold">Platform</th>
              <th className="pb-3 font-semibold text-right">Participants</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60 text-xs">
            {defaultMeetings.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 font-medium text-slate-600 dark:text-slate-300">
                  {m.time}
                </td>
                <td className="py-3 font-semibold">
                  {m.title}
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={m.host.avatar}
                      alt={m.host.name}
                      className="w-6 h-6 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {m.host.name}
                    </span>
                  </div>
                </td>
                <td className="py-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    <Video className="w-3 h-3 text-blue-500" />
                    {m.platform}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end -space-x-1.5 overflow-hidden">
                    {m.participants.slice(0, 3).map((p, idx) => (
                      <img
                        key={idx}
                        src={p}
                        alt="Participant"
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                      />
                    ))}
                    {m.participants.length > 3 && (
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 ring-2 ring-white dark:ring-slate-900">
                        +{m.participants.length - 3}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
