"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, ArrowLeft, Mail, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Users className="h-5 w-5" />
            </div>
            <span>People<span className="text-primary">Core</span></span>
          </Link>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          {sent ? (
            /* Success state */
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold">{t("auth.checkEmail")}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{t("auth.resetSent")}</p>
              <div className="pt-2">
                <Link href="/login">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    {t("auth.backToLogin")}
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            /* Form state */
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <h1 className="text-2xl font-bold">{t("auth.forgotTitle")}</h1>
                <p className="text-muted-foreground text-sm mt-1">{t("auth.forgotSubtitle")}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("auth.emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-11" disabled={isLoading}>
                  {isLoading ? t("common.loading") : t("auth.sendReset")}
                </Button>
              </form>

              <div className="text-center">
                <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {t("auth.backToLogin")}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
