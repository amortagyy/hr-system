"use client";

// ============================================================
// Dashboard Sidebar — role-aware navigation sidebar
// Shows different nav items depending on the user's role
// ============================================================

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { useAuth, UserRole } from "@/lib/auth/context";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, DollarSign, Clock, TrendingUp,
  Briefcase, BarChart3, Building2, Settings, X, UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  href: string;
  icon: React.ElementType;
  labelKey: string;
}

// Nav items per role
const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  super_admin: [
    { href: "/dashboard/admin", icon: LayoutDashboard, labelKey: "dashboard.overview" },
    { href: "/dashboard/admin/companies", icon: Building2, labelKey: "dashboard.companies" },
    { href: "/dashboard/admin/employees", icon: Users, labelKey: "dashboard.employees" },
    { href: "/dashboard/admin/users", icon: UserCircle, labelKey: "dashboard.users" },
    { href: "/dashboard/admin/reports", icon: BarChart3, labelKey: "dashboard.reports" },
    { href: "/dashboard/admin/settings", icon: Settings, labelKey: "dashboard.settings" },
  ],
  hr: [
    { href: "/dashboard/hr", icon: LayoutDashboard, labelKey: "dashboard.overview" },
    { href: "/dashboard/hr/employees", icon: Users, labelKey: "dashboard.employees" },
    { href: "/dashboard/hr/payroll", icon: DollarSign, labelKey: "dashboard.payroll" },
    { href: "/dashboard/hr/attendance", icon: Clock, labelKey: "dashboard.attendance" },
    { href: "/dashboard/hr/performance", icon: TrendingUp, labelKey: "dashboard.performance" },
    { href: "/dashboard/hr/recruitment", icon: Briefcase, labelKey: "dashboard.recruitment" },
    { href: "/dashboard/hr/reports", icon: BarChart3, labelKey: "dashboard.reports" },
    { href: "/dashboard/hr/settings", icon: Settings, labelKey: "dashboard.settings" },
  ],
  employee: [
    { href: "/dashboard/employee", icon: LayoutDashboard, labelKey: "dashboard.overview" },
    { href: "/dashboard/employee/attendance", icon: Clock, labelKey: "dashboard.myAttendance" },
    { href: "/dashboard/employee/leave", icon: Briefcase, labelKey: "dashboard.myLeave" },
    { href: "/dashboard/employee/payslips", icon: DollarSign, labelKey: "dashboard.myPayslips" },
    { href: "/dashboard/employee/performance", icon: TrendingUp, labelKey: "dashboard.myPerformance" },
    { href: "/dashboard/employee/settings", icon: Settings, labelKey: "dashboard.settings" },
  ],
};

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export function DashboardSidebar({ onClose, isMobile }: SidebarProps) {
  const { t, isRTL } = useI18n();
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const navItems = NAV_ITEMS[user.role];
  const roleLabel = user.role === "super_admin" ? "Super Admin" : user.role === "hr" ? "HR Manager" : "Employee";

  return (
    <aside className="flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo area */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Users className="h-4 w-4" />
          </div>
          <span>People<span className="text-sidebar-primary">Core</span></span>
        </Link>
        {isMobile && onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* User info card */}
      <div className="px-3 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground font-semibold text-sm">
            {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate text-sidebar-accent-foreground">{user.name}</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">{roleLabel}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          // Check if current path matches this nav item exactly or starts with it (for nested routes)
          const isActive = item.labelKey === "dashboard.overview"
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom — company name */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <div className="px-3 py-2 text-xs text-sidebar-foreground/50 truncate">
          {user.company}
        </div>
      </div>
    </aside>
  );
}
