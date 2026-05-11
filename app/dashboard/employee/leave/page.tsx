"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { mockLeaveRequests } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Plus, X, Calendar } from "lucide-react";

const statusStyle: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  approved: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  rejected: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
};

export default function EmployeeLeavePage() {
  const { t } = useI18n();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("dashboard.myLeave")}</h1>
          <p className="text-muted-foreground text-sm">Manage your leave requests</p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? t("common.cancel") : t("dashboard.applyLeave")}
        </Button>
      </div>

      {/* Leave balance cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Annual Leave", remaining: 14, total: 20, color: "text-primary" },
          { label: "Sick Leave", remaining: 8, total: 10, color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Emergency Leave", remaining: 3, total: 3, color: "text-amber-600 dark:text-amber-400" },
        ].map((lb) => (
          <Card key={lb.label} className="p-5 text-center">
            <CardContent className="p-0">
              <p className={cn("text-3xl font-bold", lb.color)}>{lb.remaining}</p>
              <p className="text-xs text-muted-foreground mt-1">{t("dashboard.daysRemaining")}</p>
              <p className="text-sm font-medium mt-2">{lb.label}</p>
              <p className="text-xs text-muted-foreground">of {lb.total} days</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Apply form */}
      {showForm && (
        <Card className="border-primary/30">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">{t("dashboard.applyLeave")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Leave Type</Label>
                  <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option>Annual Leave</option>
                    <option>Sick Leave</option>
                    <option>Emergency Leave</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>Number of Days</Label>
                  <Input type="number" min="1" max="30" defaultValue="1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Start Date</Label>
                  <Input type="date" required />
                </div>
                <div className="space-y-1.5">
                  <Label>End Date</Label>
                  <Input type="date" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Reason</Label>
                <Textarea placeholder="Describe the reason for your leave request..." rows={3} required />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? t("common.loading") : t("common.submit")}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  {t("common.cancel")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Leave history */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Leave History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Type", "Start", "End", "Days", "Reason", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-start text-xs font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockLeaveRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-muted/30">
                    <td className="px-5 py-3.5 font-medium">{req.type}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{req.startDate}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{req.endDate}</td>
                    <td className="px-5 py-3.5 font-medium">{req.days}</td>
                    <td className="px-5 py-3.5 text-muted-foreground max-w-[200px] truncate">{req.reason}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", statusStyle[req.status])}>
                        {t(`dashboard.${req.status}`)}
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
