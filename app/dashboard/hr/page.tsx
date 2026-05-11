"use client";

// ============================================================
// HR Dashboard — company-level HR overview
// Shows employees, payroll, attendance, leave requests
// ============================================================

import { useI18n } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users, DollarSign, Clock, TrendingUp,
  CheckCircle, XCircle, AlertCircle, Briefcase, Plus,
} from "lucide-react";
import {
  mockHRStats, mockEmployees, mockLeaveRequests, mockDepartmentData, mockPayrollData
} from "@/lib/mock-data";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  pending: { color: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400", icon: AlertCircle },
  approved: { color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400", icon: CheckCircle },
  rejected: { color: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400", icon: XCircle },
};

export default function HRDashboardPage() {
  const { t } = useI18n();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("dashboard.welcome")}, {user?.name.split(" ")[0]}</h1>
          <p className="text-muted-foreground text-sm">{user?.company} — HR Overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Briefcase className="h-4 w-4" />
            {t("dashboard.recruitment")}
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t("dashboard.addEmployee")}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t("dashboard.totalEmployees")}
          value={mockHRStats.totalEmployees}
          icon={Users}
          iconColor="bg-primary/10 text-primary"
          trend={{ value: 5, label: t("dashboard.vsLastMonth") }}
        />
        <StatCard
          title="Present Today"
          value={`${mockHRStats.presentToday}/${mockHRStats.totalEmployees}`}
          subtitle={`${Math.round((mockHRStats.presentToday / mockHRStats.totalEmployees) * 100)}% attendance`}
          icon={CheckCircle}
          iconColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
        />
        <StatCard
          title={t("dashboard.pendingLeaves")}
          value={mockHRStats.pendingLeaves}
          icon={AlertCircle}
          iconColor="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
          trend={{ value: -2, label: t("dashboard.vsLastMonth") }}
        />
        <StatCard
          title={t("dashboard.monthlyPayroll")}
          value={`${(mockHRStats.monthlyPayroll / 1000000).toFixed(1)}M SAR`}
          icon={DollarSign}
          iconColor="bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400"
          trend={{ value: 3.2, label: t("dashboard.vsLastMonth") }}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payroll trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Payroll Trend (SAR)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mockPayrollData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 10 }} className="text-muted-foreground" tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`} />
                <Tooltip
                  formatter={(v) => [`SAR ${Number(v).toLocaleString()}`, "Payroll"]}
                  contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "8px", fontSize: "12px" }}
                />
                <Bar dataKey="amount" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">By Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <PieChart width={160} height={160}>
                <Pie data={mockDepartmentData} cx={75} cy={75} innerRadius={50} outerRadius={75} paddingAngle={2} dataKey="value">
                  {mockDepartmentData.map((entry, index) => (
                    <Cell key={index} fill={`var(--color-chart-${index + 1})`} />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div className="space-y-2">
              {mockDepartmentData.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ background: `var(--color-chart-${i + 1})` }} />
                    <span className="text-muted-foreground">{d.name}</span>
                  </div>
                  <span className="font-medium">{d.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave requests + Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave requests table */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Leave Requests</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              {t("common.view")} all
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Employee", "Type", "Dates", "Days", "Status"].map((h) => (
                      <th key={h} className="px-5 py-3 text-start text-xs font-medium text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockLeaveRequests.map((req) => {
                    const cfg = statusConfig[req.status];
                    const StatusIcon = cfg.icon;
                    return (
                      <tr key={req.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-3 font-medium">{req.employee.split(" ")[0]}</td>
                        <td className="px-5 py-3 text-muted-foreground">{req.type}</td>
                        <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">{req.startDate}</td>
                        <td className="px-5 py-3 font-medium">{req.days}d</td>
                        <td className="px-5 py-3">
                          <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", cfg.color)}>
                            <StatusIcon className="h-3 w-3" />
                            {t(`dashboard.${req.status}`)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t("dashboard.quickActions")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: t("dashboard.addEmployee"), icon: Users, color: "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground" },
              { label: t("dashboard.runPayroll"), icon: DollarSign, color: "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:bg-emerald-950/40 dark:text-emerald-400" },
              { label: t("dashboard.approveLeave"), icon: CheckCircle, color: "bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white dark:bg-amber-950/40 dark:text-amber-400" },
              { label: t("dashboard.viewReports"), icon: TrendingUp, color: "bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white dark:bg-sky-950/40 dark:text-sky-400" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button key={action.label} className={cn(
                  "w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-150",
                  action.color
                )}>
                  <Icon className="h-4 w-4 shrink-0" />
                  {action.label}
                </button>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Employees table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">{t("dashboard.employees")}</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs">View all</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Employee", "Department", "Position", "Salary", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-start text-xs font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockEmployees.slice(0, 5).map((emp) => (
                  <tr key={emp.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {emp.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium">{emp.name}</p>
                          <p className="text-xs text-muted-foreground">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{emp.department}</td>
                    <td className="px-5 py-3.5">{emp.position}</td>
                    <td className="px-5 py-3.5 font-medium">SAR {emp.salary.toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn(
                        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                        emp.status === "active"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : "bg-muted text-muted-foreground"
                      )}>
                        {emp.status === "active" ? t("dashboard.active") : t("dashboard.inactive")}
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
