"use client";

// ============================================================
// Super Admin Dashboard — global system overview
// Shows all companies, employees, revenue, system stats
// ============================================================

import { useI18n } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2, Users, DollarSign, AlertCircle,
  Clock, CheckCircle, XCircle, Plus, ArrowRight,
} from "lucide-react";
import {
  mockAdminStats, mockCompanies, mockRecentActivity, mockHeadcountData
} from "@/lib/mock-data";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  inactive: "bg-muted text-muted-foreground",
};

export default function AdminDashboardPage() {
  const { t } = useI18n();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            {t("dashboard.welcome")}, {user?.name.split(" ")[0]}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">System-wide overview — all companies</p>
        </div>
        <Button className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          Add Company
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t("dashboard.activeCompanies")}
          value={mockAdminStats.activeCompanies}
          subtitle={`of ${mockAdminStats.totalCompanies} total`}
          icon={Building2}
          iconColor="bg-primary/10 text-primary"
          trend={{ value: 12, label: t("dashboard.vsLastMonth") }}
        />
        <StatCard
          title={t("dashboard.totalEmployees")}
          value={mockAdminStats.totalEmployees.toLocaleString()}
          icon={Users}
          iconColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
          trend={{ value: 8, label: t("dashboard.vsLastMonth") }}
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${mockAdminStats.monthlyRevenue.toLocaleString()}`}
          icon={DollarSign}
          iconColor="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
          trend={{ value: 5.2, label: t("dashboard.vsLastMonth") }}
        />
        <StatCard
          title={t("dashboard.pendingLeaves")}
          value={mockAdminStats.pendingLeaves}
          subtitle="across all companies"
          icon={AlertCircle}
          iconColor="bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
          trend={{ value: -3, label: t("dashboard.vsLastMonth") }}
        />
      </div>

      {/* Chart + Activity row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Headcount chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Employee Headcount Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={mockHeadcountData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  fill="url(#colorCount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t("dashboard.recentActivity")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockRecentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.user} · {item.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Companies table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">{t("dashboard.companies")}</CardTitle>
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-start text-xs font-medium text-muted-foreground">Company</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-muted-foreground hidden sm:table-cell">Industry</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-muted-foreground">Employees</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-muted-foreground hidden md:table-cell">Plan</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-muted-foreground">{t("dashboard.status")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
                          {company.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{company.name}</p>
                          <p className="text-xs text-muted-foreground">{company.country}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-muted-foreground hidden sm:table-cell">{company.industry}</td>
                    <td className="px-6 py-3.5 font-medium">{company.employees}</td>
                    <td className="px-6 py-3.5 hidden md:table-cell">
                      <Badge variant="outline" className="text-xs">{company.plan}</Badge>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", statusColors[company.status])}>
                        {company.status === "active"
                          ? <CheckCircle className="h-3 w-3" />
                          : <XCircle className="h-3 w-3" />
                        }
                        {company.status === "active" ? t("dashboard.active") : t("dashboard.inactive")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
