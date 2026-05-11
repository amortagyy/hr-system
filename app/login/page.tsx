"use client";

// ============================================================
// Login Page — handles authentication and redirects to the
// correct dashboard based on user role
// ============================================================

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useI18n } from "@/lib/i18n/context";
import { useAuth, ROLE_ROUTES, MOCK_USERS } from "@/lib/auth/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sun, Moon, Globe, Users, Eye, EyeOff, AlertCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LoginPage() {
  const { t, language, setLanguage, isRTL } = useI18n();
  const { login } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        // Get user from localStorage to determine role for routing
        const stored = localStorage.getItem("hr-user");
        if (stored) {
          const user = JSON.parse(stored);
          const redirectUrl = ROLE_ROUTES[user.role as keyof typeof ROLE_ROUTES];
          console.log("[v0] Login successful, redirecting to:", redirectUrl);
          router.push(redirectUrl);
        }
      } else {
        setError(result.error || "Invalid credentials");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("[v0] Login error:", err);
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  // Quick login helper for demo
  const quickLogin = (userEmail: string) => {
    const record = MOCK_USERS[userEmail];
    if (record) {
      setEmail(userEmail);
      setPassword(record.password);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar relative overflow-hidden items-center justify-center p-12">
        {/* Dot grid pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="relative z-10 text-center text-sidebar-foreground">
          <Link href="/" className="flex items-center justify-center gap-3 mb-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
              <Users className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">People<span className="text-sidebar-primary">Core</span></span>
          </Link>

          <h2 className="text-3xl font-bold mb-4 text-balance">
            The HR Platform Built for Modern Teams
          </h2>
          <p className="text-sidebar-foreground/70 leading-relaxed max-w-sm mx-auto mb-12">
            Manage your workforce, payroll, attendance, and performance — all in one place.
          </p>

          {/* Feature list */}
          <div className="space-y-3 text-start max-w-xs mx-auto">
            {[
              "Multi-company management",
              "Arabic & English support",
              "Role-based dashboards",
              "Real-time analytics",
            ].map((f) => (
              <div key={f} className="flex items-center gap-3 text-sm text-sidebar-foreground/80">
                <div className="h-1.5 w-1.5 rounded-full bg-sidebar-primary" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2 font-bold lg:hidden">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Users className="h-3.5 w-3.5" />
            </div>
            <span>People<span className="text-primary">Core</span></span>
          </Link>
          <div className="ms-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <Globe className="h-4 w-4" />
                  <span className="text-xs">{language === "en" ? "EN" : "عر"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"}>
                <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ar")}>العربية</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold">{t("auth.loginTitle")}</h1>
              <p className="text-muted-foreground text-sm mt-1">{t("auth.loginSubtitle")}</p>
            </div>

            {/* Demo quick-login badges */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground text-center">Demo accounts — click to fill</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {Object.entries(MOCK_USERS).map(([email, { user }]) => (
                  <Badge
                    key={email}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs py-1 px-3"
                    onClick={() => quickLogin(email)}
                  >
                    {user.role.replace("_", " ")}
                  </Badge>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("auth.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    {t("auth.forgotPassword")}
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.passwordPlaceholder")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="pe-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(c) => setRememberMe(!!c)}
                />
                <Label htmlFor="remember" className="text-sm cursor-pointer">
                  {t("auth.rememberMe")}
                </Label>
              </div>

              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? t("common.loading") : t("auth.loginBtn")}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              {t("auth.noAccount")}{" "}
              <Link href="/contact" className="text-primary hover:underline font-medium">
                {t("auth.contactAdmin")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
