"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { Users } from "lucide-react";

export function PublicFooter() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Users className="h-3.5 w-3.5" />
              </div>
              <span>People<span className="text-primary">Core</span></span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-sm mb-3">{t("footer.product")}</h4>
            <ul className="space-y-2">
              {["features", "pricing", "security"].map((key) => (
                <li key={key}>
                  <Link href={key === "features" ? "/features" : "#"} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {t(`footer.links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-3">{t("footer.company")}</h4>
            <ul className="space-y-2">
              {["about", "careers", "blog"].map((key) => (
                <li key={key}>
                  <Link href={key === "about" ? "/about" : "#"} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {t(`footer.links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm mb-3">{t("footer.support")}</h4>
            <ul className="space-y-2">
              {["help", "docs", "privacy", "terms"].map((key) => (
                <li key={key}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {t(`footer.links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© {year} PeopleCore. {t("footer.rights")}</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">{t("footer.links.privacy")}</Link>
            <Link href="#" className="hover:text-foreground transition-colors">{t("footer.links.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
