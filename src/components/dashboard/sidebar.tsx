"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "next-auth";
import {
  Home,
  Users,
  Settings,
  BarChart3,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: User;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar({ open, setOpen, user }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-white shadow-xl transition-all duration-300 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-gray-900">ProSensei</h2>
          )}

          {/* Desktop collapse button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>

          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  collapsed && "justify-center"
                )}
              >
                <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                {!collapsed && item.name}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="p-4 border-t">
          <div
            className={cn(
              "flex items-center",
              collapsed ? "justify-center" : "space-x-3"
            )}
          >
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.name?.charAt(0).toUpperCase() ||
                    user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
