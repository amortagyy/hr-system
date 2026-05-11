"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockEmployees } from "@/lib/mock-data";
import { Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HREmployeesPage() {
  const { t } = useI18n();
  const [search, setSearch] = useState("");

  const filtered = mockEmployees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.department.toLowerCase().includes(search.toLowerCase()) ||
    e.position.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("dashboard.employees")}</h1>
          <p className="text-muted-foreground text-sm">{mockEmployees.length} employees</p>
        </div>
        <Button className="gap-2 self-start">
          <Plus className="h-4 w-4" />
          {t("dashboard.addEmployee")}
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <CardTitle className="text-base">Employee Directory</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("common.search")}
                className="ps-9 h-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Employee", "Department", "Position", "Join Date", "Salary", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3 text-start text-xs font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((emp) => (
                  <tr key={emp.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {emp.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium whitespace-nowrap">{emp.name}</p>
                          <p className="text-xs text-muted-foreground">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant="secondary" className="text-xs">{emp.department}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{emp.position}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{emp.joinDate}</td>
                    <td className="px-5 py-3.5 font-medium whitespace-nowrap">SAR {emp.salary.toLocaleString()}</td>
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
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">{t("common.edit")}</Button>
                        <Button variant="ghost" size="sm">{t("common.view")}</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-muted-foreground text-sm">{t("common.noData")}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
