"use client";

import { useI18n } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/stat-card";
import { mockAttendance, mockHRStats } from "@/lib/mock-data";
import { Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const statusStyle: Record<string, string> = {
  present: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  late: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  absent: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
};

export default function HRAttendancePage() {
  const { t } = useI18n();

  const presentDays = mockAttendance.filter(a => a.status === "present").length;
  const lateDays = mockAttendance.filter(a => a.status === "late").length;
  const absentDays = mockAttendance.filter(a => a.status === "absent").length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("dashboard.attendance")}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Present Today" value={mockHRStats.presentToday} icon={CheckCircle} iconColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400" />
        <StatCard title="Total Employees" value={mockHRStats.totalEmployees} icon={Clock} iconColor="bg-primary/10 text-primary" />
        <StatCard title="Late" value={lateDays} icon={AlertTriangle} iconColor="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400" />
        <StatCard title="Absent" value={absentDays} icon={XCircle} iconColor="bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Attendance Records (This Month)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Date", "Check In", "Check Out", "Hours", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-start text-xs font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockAttendance.map((record, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5 font-medium">{record.date}</td>
                    <td className="px-5 py-3.5">{record.checkIn ?? "—"}</td>
                    <td className="px-5 py-3.5">{record.checkOut ?? "—"}</td>
                    <td className="px-5 py-3.5 font-medium">{record.hoursWorked > 0 ? `${record.hoursWorked}h` : "—"}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", statusStyle[record.status])}>
                        {record.status}
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
