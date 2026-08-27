import React from "react";
import Sidebar from "./components/sidebar";
import { WeatherProvider } from "./components/weatherContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WeatherProvider>
      {/* Sidebar (Mobile sticky top bar + desktop fixed sidebar) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0 transition-all duration-300">
        <main className="flex-1 p-0 sm:p-0">{children}</main>
      </div>
    </WeatherProvider>
  );
}
