"use client";

// Reuses the same employee list but scoped to admin (all companies)
import { useI18n } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockEmployees } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function AdminEmployeesPage() {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("dashboard.employees")}</h1>
        <p className="text-muted-foreground text-sm">All employees across all companies</p>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Employee Directory</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Employee", "Company", "Department", "Position", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-start text-xs font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-muted/30">
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
                    <td className="px-5 py-3.5 text-muted-foreground">{emp.company}</td>
                    <td className="px-5 py-3.5"><Badge variant="secondary" className="text-xs">{emp.department}</Badge></td>
                    <td className="px-5 py-3.5 text-muted-foreground">{emp.position}</td>
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
