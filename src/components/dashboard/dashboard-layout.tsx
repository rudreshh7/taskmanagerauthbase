"use client";

import { useState } from "react";
import { User } from "next-auth";
import { Sidebar } from "./sidebar";
import { DashboardHeader } from "./dashboard-header";

interface DashboardLayoutProps {
  user: User;
  children: React.ReactNode;
}

export function DashboardLayout({ user, children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} user={user} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
