"use client";

// Reusable stat card used across all dashboards
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  iconColor?: string;
  trend?: { value: number; label: string };
}

export function StatCard({ title, value, subtitle, icon: Icon, iconColor, trend }: StatCardProps) {
  const isPositive = (trend?.value ?? 0) >= 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1 text-foreground">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          <div className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            iconColor ?? "bg-primary/10 text-primary"
          )}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {trend && (
          <div className={cn(
            "mt-3 flex items-center gap-1 text-xs font-medium",
            isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
          )}>
            {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            <span>{Math.abs(trend.value)}%</span>
            <span className="text-muted-foreground font-normal">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
