"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <Badge variant="secondary" className="mb-4">Contact</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">{t("contact.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact form */}
            <Card className="p-8">
              <CardContent className="p-0">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                      <CheckCircle className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-semibold">Message Sent!</h3>
                    <p className="text-muted-foreground text-sm">
                      Thanks for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <Button variant="outline" onClick={() => setSubmitted(false)}>
                      Send Another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">{t("contact.name")}</Label>
                        <Input id="name" placeholder="John Doe" required />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">{t("contact.email")}</Label>
                        <Input id="email" type="email" placeholder="john@company.com" required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="company">{t("contact.company")}</Label>
                      <Input id="company" placeholder="Your Company Name" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message">{t("contact.message")}</Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? t("common.loading") : t("contact.send")}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Get in touch</h2>
                <p className="text-muted-foreground">
                  Whether you have a question about features, pricing, or anything else, our team is ready to answer.
                </p>
              </div>
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: t("contact.address"), value: "King Fahd Road, Riyadh 12214, Saudi Arabia" },
                  { icon: Phone, label: t("contact.phone"), value: "+966 11 234 5678" },
                  { icon: Mail, label: t("contact.emailLabel"), value: "hello@peoplecore.io" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-muted-foreground text-sm mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <CardContent className="p-0">
                  <p className="font-semibold mb-2">Enterprise Sales</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Looking for a custom plan? Our enterprise team can help you build the perfect solution.
                  </p>
                  <Button variant="outline" size="sm">
                    Talk to Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
