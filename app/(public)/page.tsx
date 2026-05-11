"use client";

// ============================================================
// Home Page — Public landing page for PeopleCore HR SaaS
// Sections: Hero, Features, Why Us, Pricing, Contact, Footer
// ============================================================

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  Briefcase,
  BarChart3,
  Shield,
  Globe,
  Cloud,
  Building2,
  Check,
  ArrowRight,
  Star,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Feature icons mapping ─────────────────────────────────────
const featureIcons = {
  employees: Users,
  payroll: DollarSign,
  attendance: Clock,
  performance: TrendingUp,
  recruitment: Briefcase,
  reports: BarChart3,
};

const whyUsIcons = {
  multiTenant: Building2,
  secure: Shield,
  multilang: Globe,
  cloud: Cloud,
};

const whyUsColors = {
  multiTenant: "text-primary bg-primary/10",
  secure: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40",
  multilang: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/40",
  cloud: "text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/40",
};

export default function HomePage() {
  const { t, isRTL } = useI18n();

  const featureKeys = ["employees", "payroll", "attendance", "performance", "recruitment", "reports"] as const;
  const whyUsKeys = ["multiTenant", "secure", "multilang", "cloud"] as const;
  const planKeys = ["starter", "professional", "enterprise"] as const;

  return (
    <div className="overflow-hidden">
      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative py-20 md:py-32">
        {/* Subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Gradient glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 max-w-7xl relative text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
            <Star className="h-3.5 w-3.5 me-1.5 text-primary" />
            {t("hero.badge")}
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6 text-foreground">
            {t("hero.title").split(" ").slice(0, 3).join(" ")}{" "}
            <span className="text-primary">{t("hero.title").split(" ").slice(3).join(" ")}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login">
              <Button size="lg" className="gap-2 px-8 h-12 text-base">
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="gap-2 px-8 h-12 text-base">
              {t("hero.ctaSecondary")}
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">{t("hero.trustedBy")}</p>

          {/* Trust logos placeholder */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-40">
            {["Company A", "Company B", "Company C", "Company D", "Company E"].map((c) => (
              <span key={c} className="text-sm font-semibold text-muted-foreground tracking-widest uppercase">
                {c}
              </span>
            ))}
          </div>

          {/* Dashboard preview card */}
          <div className="mt-16 relative max-w-5xl mx-auto rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
            <div className="flex h-8 items-center gap-1.5 px-4 border-b border-border bg-muted/50">
              {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c, i) => (
                <div key={i} className={cn("h-3 w-3 rounded-full", c)} />
              ))}
              <div className="mx-auto flex h-5 w-48 items-center justify-center rounded bg-muted text-xs text-muted-foreground">
                app.peoplecore.io/dashboard
              </div>
            </div>
            <div className="p-6 bg-background/50">
              {/* Mini dashboard preview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Employees", value: "781", color: "text-primary" },
                  { label: "Present Today", value: "94%", color: "text-emerald-600 dark:text-emerald-400" },
                  { label: "Pending Leaves", value: "12", color: "text-amber-600 dark:text-amber-400" },
                  { label: "Payroll", value: "$1.6M", color: "text-sky-600 dark:text-sky-400" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-start">
                    <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                    <p className={cn("text-xl font-bold", stat.color)}>{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="h-32 rounded-lg border border-border bg-muted/30 flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Analytics Dashboard Preview</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ──────────────────────────────────── */}
      <section className="py-20 bg-muted/30" id="features">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
              {t("features.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureKeys.map((key) => {
              const Icon = featureIcons[key];
              return (
                <Card key={key} className="group hover:border-primary/30 hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {t(`features.items.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(`features.items.${key}.desc`)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us Section ─────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Why PeopleCore</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                {t("whyUs.title")}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">{t("whyUs.subtitle")}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyUsKeys.map((key) => {
                  const Icon = whyUsIcons[key];
                  return (
                    <div key={key} className="flex gap-3">
                      <div className={cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", whyUsColors[key])}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{t(`whyUs.items.${key}.title`)}</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{t(`whyUs.items.${key}.desc`)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link href="/features" className="mt-8 inline-flex">
                <Button variant="outline" className="gap-2">
                  {t("nav.features")}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Stats panel */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "500+", label: "Companies", color: "text-primary" },
                { value: "50K+", label: "Employees", color: "text-emerald-600 dark:text-emerald-400" },
                { value: "15+", label: "Countries", color: "text-amber-600 dark:text-amber-400" },
                { value: "99.9%", label: "Uptime SLA", color: "text-sky-600 dark:text-sky-400" },
              ].map((stat) => (
                <Card key={stat.label} className="p-6 text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <p className={cn("text-4xl font-bold mb-2", stat.color)}>{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing Section ───────────────────────────────────── */}
      <section className="py-20 bg-muted/30" id="pricing">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
              {t("pricing.title")}
            </h2>
            <p className="text-muted-foreground text-lg">{t("pricing.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {planKeys.map((planKey, index) => {
              const isPopular = index === 1;
              const features = t(`pricing.plans.${planKey}.features`) as unknown as string[];
              const featureList: string[] = Array.isArray(features)
                ? features
                : ["Feature 1", "Feature 2", "Feature 3"];

              return (
                <Card
                  key={planKey}
                  className={cn(
                    "relative transition-all duration-200 hover:shadow-xl",
                    isPopular
                      ? "border-primary shadow-lg scale-105"
                      : "hover:border-primary/30"
                  )}
                >
                  {isPopular && (
                    <div className="absolute -top-4 start-1/2 -translate-x-1/2">
                      <Badge className="px-4 py-1">{t("pricing.popular")}</Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-1">{t(`pricing.plans.${planKey}.name`)}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{t(`pricing.plans.${planKey}.desc`)}</p>
                    <div className="flex items-end gap-1 mb-6">
                      <span className="text-4xl font-bold">{t(`pricing.plans.${planKey}.price`)}</span>
                      <span className="text-muted-foreground text-sm mb-1">{t(`pricing.plans.${planKey}.period`)}</span>
                    </div>
                    <Button
                      className="w-full mb-6"
                      variant={isPopular ? "default" : "outline"}
                    >
                      {t("pricing.cta")}
                    </Button>
                    <ul className="space-y-2.5">
                      {/* Feature list from JSON translation */}
                      {(Array.isArray(featureList) ? featureList : []).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{feature}</span>
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

      {/* ── CTA Banner ────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="rounded-2xl bg-primary p-10 md:p-16 text-center text-primary-foreground relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
            />
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4 relative">
              Ready to Transform Your HR?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto relative">
              Join thousands of companies that trust PeopleCore to manage their most valuable asset — their people.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
              <Link href="/login">
                <Button size="lg" variant="secondary" className="px-8 h-12 gap-2">
                  {t("hero.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="px-8 h-12 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  {t("nav.contact")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
