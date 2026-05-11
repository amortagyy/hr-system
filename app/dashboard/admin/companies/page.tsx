"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockCompanies } from "@/lib/mock-data";
import { Plus, Search, Building2, Users, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminCompaniesPage() {
  const { t } = useI18n();
  const [search, setSearch] = useState("");

  const filtered = mockCompanies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("dashboard.companies")}</h1>
          <p className="text-muted-foreground text-sm">{mockCompanies.length} companies registered</p>
        </div>
        <Button className="gap-2 self-start">
          <Plus className="h-4 w-4" />
          Add Company
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Companies", value: mockCompanies.length, icon: Building2, color: "bg-primary/10 text-primary" },
          { label: "Active", value: mockCompanies.filter(c => c.status === "active").length, icon: CheckCircle, color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400" },
          { label: "Total Employees", value: mockCompanies.reduce((a, c) => a + c.employees, 0), icon: Users, color: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400" },
          { label: "Inactive", value: mockCompanies.filter(c => c.status === "inactive").length, icon: XCircle, color: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400" },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <CardContent className="p-0 flex items-center gap-3">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", s.color)}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <CardTitle className="text-base">All Companies</CardTitle>
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
                  {["Company", "Industry", "Country", "Employees", "Plan", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3 text-start text-xs font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((company) => (
                  <tr key={company.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
                          {company.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-medium">{company.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{company.industry}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{company.country}</td>
                    <td className="px-5 py-3.5 font-medium">{company.employees}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className="text-xs">{company.plan}</Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                        company.status === "active"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : "bg-muted text-muted-foreground"
                      )}>
                        {company.status === "active" ? t("dashboard.active") : t("dashboard.inactive")}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2">
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
