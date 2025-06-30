"use client";

import { User } from "next-auth";
import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignOut } from "@/components/sign-out";

interface DashboardHeaderProps {
  user: User;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function DashboardHeader({
  user,
  sidebarOpen,
  setSidebarOpen,
}: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">
                {user.name || "User"}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <SignOut />
          </div>
        </div>
      </div>
    </header>
  );
}
