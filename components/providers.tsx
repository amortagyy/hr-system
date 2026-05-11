"use client";

// ============================================================
// Providers — wraps the app with all required context providers
// Theme (dark/light), i18n (language), and Auth
// ============================================================

import { ThemeProvider } from "next-themes";
import { I18nProvider } from "@/lib/i18n/context";
import { AuthProvider } from "@/lib/auth/context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // ThemeProvider handles dark/light mode via next-themes
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {/* I18nProvider handles Arabic/English and RTL/LTR */}
      <I18nProvider>
        {/* AuthProvider handles authentication and role state */}
        <AuthProvider>{children}</AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
