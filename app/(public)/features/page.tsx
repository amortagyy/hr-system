"use client";

import { useI18n } from "@/lib/i18n/context";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users, DollarSign, Clock, TrendingUp, Briefcase, BarChart3,
  CheckCircle, Globe, Shield, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: Users,
    key: "employees",
    color: "text-primary bg-primary/10",
    checks: ["Employee profiles & documents", "Organization chart", "Contract management", "Onboarding workflows"],
  },
  {
    icon: DollarSign,
    key: "payroll",
    color: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40",
    checks: ["Automated salary calculations", "Tax & GOSI deductions", "Payslip generation", "Multi-currency support"],
  },
  {
    icon: Clock,
    key: "attendance",
    color: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/40",
    checks: ["Real-time attendance tracking", "Leave management & approvals", "Holiday calendar", "Overtime calculation"],
  },
  {
    icon: TrendingUp,
    key: "performance",
    color: "text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/40",
    checks: ["Goal setting & OKRs", "360-degree reviews", "Performance ratings", "Development plans"],
  },
  {
    icon: Briefcase,
    key: "recruitment",
    color: "text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/40",
    checks: ["Job posting management", "Applicant tracking", "Interview scheduling", "Offer letter generation"],
  },
  {
    icon: BarChart3,
    key: "reports",
    color: "text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-950/40",
    checks: ["Custom dashboards", "Export to Excel/PDF", "Scheduled reports", "Real-time analytics"],
  },
];

export default function FeaturesPage() {
  const { t } = useI18n();

  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <Badge variant="secondary" className="mb-4">Features</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">{t("features.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("features.subtitle")}
          </p>
        </div>
      </section>

      {/* Feature cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Card key={f.key} className="p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-200">
                  <CardContent className="p-0 space-y-4">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">{t(`features.items.${f.key}.title`)}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t(`features.items.${f.key}.desc`)}</p>
                    </div>
                    <ul className="space-y-2">
                      {f.checks.map((check) => (
                        <li key={check} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{check}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">Built for the Modern Workplace</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Globe, title: "Arabic & English", desc: "Full RTL/LTR bilingual support" },
              { icon: Shield, title: "Enterprise Security", desc: "SOC 2 compliant, bank-grade encryption" },
              { icon: Zap, title: "Lightning Fast", desc: "Sub-100ms response time, 99.9% uptime" },
            ].map((b) => (
              <div key={b.title} className="text-center p-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Try PeopleCore free for 14 days. No credit card required.
          </p>
          <Link href="/login">
            <Button size="lg" className="px-8">{t("hero.cta")}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
