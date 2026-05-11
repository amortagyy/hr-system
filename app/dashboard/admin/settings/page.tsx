"use client";

import { useI18n } from "@/lib/i18n/context";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth/context";
import { useI18n as useI18nCtx } from "@/lib/i18n/context";

export default function AdminSettingsPage() {
  const { t, language, setLanguage } = useI18n();
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">{t("dashboard.settings")}</h1>
        <p className="text-muted-foreground text-sm">Manage your account and system preferences</p>
      </div>

      {/* Profile settings */}
      <Card>
        <CardHeader><CardTitle className="text-base">Profile Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Full Name</Label>
              <Input defaultValue={user?.name} />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input defaultValue={user?.email} type="email" />
            </div>
          </div>
          <Button>{t("common.save")}</Button>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader><CardTitle className="text-base">Appearance</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Toggle between light and dark theme</p>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(c) => setTheme(c ? "dark" : "light")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Arabic Language</p>
              <p className="text-xs text-muted-foreground">Switch to Arabic with RTL layout</p>
            </div>
            <Switch
              checked={language === "ar"}
              onCheckedChange={(c) => setLanguage(c ? "ar" : "en")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader><CardTitle className="text-base">Change Password</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Current Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>New Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-1.5">
              <Label>Confirm Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
          </div>
          <Button variant="outline">Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
