"use client";

import { useI18n } from "@/lib/i18n/context";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart, Award } from "lucide-react";

const teamMembers = [
  { name: "Ahmad Al-Rashid", role: "CEO & Co-founder", initials: "AR" },
  { name: "Sara Al-Mansouri", role: "CTO & Co-founder", initials: "SM" },
  { name: "Khalid Al-Otaibi", role: "Head of Product", initials: "KO" },
  { name: "Noura Al-Ghamdi", role: "Head of Design", initials: "NG" },
];

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <Badge variant="secondary" className="mb-4">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">{t("about.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("about.subtitle")}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {(["companies", "employees", "countries", "uptime"] as const).map((key) => (
              <div key={key}>
                <p className="text-3xl font-bold text-primary mb-1">{t(`about.stats.${key}`).split(" ")[0]}</p>
                <p className="text-sm text-muted-foreground">{t(`about.stats.${key}`).split(" ").slice(1).join(" ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story and Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8 hover:shadow-md transition-shadow">
              <CardContent className="p-0 space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Heart className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">{t("about.story")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("about.storyText")}</p>
              </CardContent>
            </Card>
            <Card className="p-8 hover:shadow-md transition-shadow">
              <CardContent className="p-0 space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                  <Target className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">{t("about.mission")}</h2>
                <p className="text-muted-foreground leading-relaxed">{t("about.missionText")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "People First", desc: "Every decision starts with asking: how does this help our users and their employees?", color: "text-primary bg-primary/10" },
              { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest standards in design, engineering, and customer support.", color: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/40" },
              { icon: Heart, title: "Simplicity", desc: "Complex HR doesn't need complex software. We believe in making the hard things easy.", color: "text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/40" },
            ].map((v) => (
              <Card key={v.title} className="p-6 hover:shadow-md transition-shadow">
                <CardContent className="p-0 space-y-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${v.color}`}>
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-lg">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">{t("about.team")}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.name} className="p-6 text-center hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-xl font-bold">
                    {member.initials}
                  </div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
