"use client";

// ============================================================
// Employee Dashboard — personal employee self-service portal
// Shows attendance, leave balance, payslips, performance
// ============================================================

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { useAuth } from "@/lib/auth/context";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Clock, CheckCircle, Calendar, DollarSign, TrendingUp,
  AlertCircle, Download, Send,
} from "lucide-react";
import {
  mockEmployeeStats, mockAttendance, mockPayslips, mockLeaveRequests
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyle: Record<string, string> = {
  present: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  late: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  absent: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
  paid: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  approved: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  rejected: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
};

export default function EmployeeDashboardPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [activeLeaveTab, setActiveLeaveTab] = useState<"balance" | "apply">("balance");

  // My leave requests (filtered to employee's own)
  const myLeaves = mockLeaveRequests.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("dashboard.welcome")}, {user?.name.split(" ")[0]}</h1>
          <p className="text-muted-foreground text-sm">{user?.position} · {user?.department}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Clock className="h-4 w-4" />
            Check In
          </Button>
          <Button className="gap-2">
            <Send className="h-4 w-4" />
            {t("dashboard.applyLeave")}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Attendance Rate"
          value={`${mockEmployeeStats.attendanceRate}%`}
          subtitle="This month"
          icon={CheckCircle}
          iconColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
        />
        <StatCard
          title="Present Days"
          value={mockEmployeeStats.currentMonth.present}
          subtitle={`${mockEmployeeStats.currentMonth.late} late, ${mockEmployeeStats.currentMonth.absent} absent`}
          icon={Clock}
          iconColor="bg-primary/10 text-primary"
        />
        <StatCard
          title={t("dashboard.leaveBalance")}
          value={mockEmployeeStats.leaveBalance.annual}
          subtitle={`${t("dashboard.daysRemaining")} (annual)`}
          icon={Calendar}
          iconColor="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
        />
        <StatCard
          title="Last Payslip"
          value="SAR 12,800"
          subtitle="April 2024"
          icon={DollarSign}
          iconColor="bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400"
        />
      </div>

      {/* Profile info + Leave balance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                {user?.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <p className="font-bold text-lg">{user?.name}</p>
              <p className="text-muted-foreground text-sm">{user?.position}</p>
              <Badge variant="secondary" className="mt-2">{user?.department}</Badge>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: t("dashboard.department"), value: user?.department },
                { label: t("dashboard.position"), value: user?.position },
                { label: "Company", value: user?.company },
                { label: "Email", value: user?.email },
              ].map((row) => (
                <div key={row.label} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium text-end truncate max-w-[160px]">{row.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leave balance */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">{t("dashboard.leaveBalance")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { label: "Annual Leave", used: 6, total: 20, color: "bg-primary" },
              { label: "Sick Leave", used: 2, total: 10, color: "bg-emerald-500" },
              { label: "Emergency Leave", used: 0, total: 3, color: "bg-amber-500" },
            ].map((leave) => {
              const pct = Math.round((leave.used / leave.total) * 100);
              return (
                <div key={leave.label}>
                  <div className="flex items-center justify-between mb-1.5 text-sm">
                    <span className="font-medium">{leave.label}</span>
                    <span className="text-muted-foreground">
                      {leave.total - leave.used} / {leave.total} days remaining
                    </span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              );
            })}

            {/* My recent leave requests */}
            <div className="pt-2 border-t border-border">
              <p className="text-sm font-medium mb-3">Recent Requests</p>
              <div className="space-y-2">
                {myLeaves.map((req) => (
                  <div key={req.id} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium">{req.type}</span>
                      <span className="text-muted-foreground ms-2">{req.startDate}</span>
                    </div>
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", statusStyle[req.status])}>
                      {t(`dashboard.${req.status}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance + Payslips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent attendance */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t("dashboard.myAttendance")}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Date", "In", "Out", "Hours", "Status"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-start text-xs font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockAttendance.map((rec, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2.5 font-medium">{rec.date}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{rec.checkIn ?? "—"}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{rec.checkOut ?? "—"}</td>
                    <td className="px-4 py-2.5 font-medium">{rec.hoursWorked > 0 ? `${rec.hoursWorked}h` : "—"}</td>
                    <td className="px-4 py-2.5">
                      <span className={cn("inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize", statusStyle[rec.status])}>
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Payslips */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t("dashboard.myPayslips")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockPayslips.map((slip) => (
              <div key={slip.id} className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{slip.month}</p>
                    <p className="text-xs text-muted-foreground">Net: SAR {slip.net.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn("text-xs font-medium rounded-full px-2.5 py-0.5", statusStyle[slip.status])}>
                    {slip.status}
                  </span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {/* Salary breakdown card */}
            <div className="rounded-lg border border-border p-4 space-y-2 mt-2">
              <p className="text-sm font-medium">April 2024 Breakdown</p>
              {[
                { label: "Basic Salary", value: "SAR 12,000" },
                { label: "Allowances", value: "+ SAR 2,000" },
                { label: "Deductions", value: "– SAR 1,200" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium">{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-bold border-t border-border pt-2 mt-2">
                <span>Net Pay</span>
                <span className="text-emerald-600 dark:text-emerald-400">SAR 12,800</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{t("dashboard.myPerformance")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Overall Rating", value: "4.2/5", icon: TrendingUp, color: "text-primary" },
              { label: "Goals Achieved", value: "8/10", icon: CheckCircle, color: "text-emerald-600 dark:text-emerald-400" },
              { label: "Attendance Score", value: "94%", icon: Clock, color: "text-amber-600 dark:text-amber-400" },
              { label: "Next Review", value: "Jun 2024", icon: AlertCircle, color: "text-sky-600 dark:text-sky-400" },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.label} className="text-center p-4 rounded-lg bg-muted/30">
                  <Icon className={cn("h-6 w-6 mx-auto mb-2", p.color)} />
                  <p className={cn("text-xl font-bold", p.color)}>{p.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{p.label}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
