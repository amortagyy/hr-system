"use client";

// ============================================================
// i18n Context — provides language switching (EN / AR)
// and RTL/LTR direction management across the whole app
// ============================================================

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import enTranslations from "./en.json";
import arTranslations from "./ar.json";

type Language = "en" | "ar";
type Translations = typeof enTranslations;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  isRTL: boolean;
}

// Create the context
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// All translation files keyed by language code
const translations: Record<Language, Translations> = {
  en: enTranslations,
  ar: arTranslations,
};

// Helper: resolve nested key like "nav.home" -> "Home"
function getNestedValue(obj: Record<string, unknown>, key: string): string {
  return key.split(".").reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj as unknown) as string ?? key;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // On mount, load saved language preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("hr-language") as Language | null;
    if (saved && (saved === "en" || saved === "ar")) {
      setLanguageState(saved);
    }
  }, []);

  // When language changes, update <html> dir and lang attributes
  useEffect(() => {
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    localStorage.setItem("hr-language", language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  // Translate function: accepts dot-notation keys
  const t = useCallback(
    (key: string): string => {
      const trans = translations[language] as unknown as Record<string, unknown>;
      return getNestedValue(trans, key);
    },
    [language]
  );

  const isRTL = language === "ar";
  const dir = isRTL ? "rtl" : "ltr";

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, dir, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
}

// Custom hook for easy access
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
