// src/features/progress/components/ProgressStatCards.tsx
import { Flame, Brain, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProgressOverview } from "@/features/progress/useProgress";
import { formatHours, formatPercent } from "@/utils/progressUtils";


interface StatDef {
  icon: React.ElementType;
  iconClass: string;
  bgClass: string;
  label: string;
  value: string;
}

export function ProgressStatCards() {
  const { data, isLoading } = useProgressOverview();

  const stats: StatDef[] = [
    {
      icon: Flame,
      iconClass: "text-orange-500",
      bgClass: "bg-orange-50",
      label: "Current Streak",
      value: data ? `${data.currentStreak} Days` : "—",
    },
    {
      icon: Brain,
      iconClass: "text-violet-500",
      bgClass: "bg-violet-50",
      label: "Focus Score",
      value: data ? formatPercent(data.focusScore) : "—",
    },
    {
      icon: CheckCircle2,
      iconClass: "text-emerald-500",
      bgClass: "bg-emerald-50",
      label: "Task Completion",
      value: data ? formatPercent(data.taskCompletionRate) : "—",
    },
    {
      icon: Clock,
      iconClass: "text-amber-500",
      bgClass: "bg-amber-50",
      label: "Active Hours",
      value: data ? formatHours(data.activeHours) : "—",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-none shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${stat.bgClass}`}>
              <stat.icon className={`h-5 w-5 ${stat.iconClass}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              {isLoading ? (
                <Skeleton className="mt-1 h-5 w-16" />
              ) : (
                <p className="text-lg font-semibold">{stat.value}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
