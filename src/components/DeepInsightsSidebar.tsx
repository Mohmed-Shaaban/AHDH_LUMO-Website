// src/features/progress/components/deep-insights/DeepInsightsSidebar.tsx
import { TrendingDown, Clock, LineChart as LineChartIcon, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeepInsights } from "@/features/progress/useProgress";
// import { useDeepInsights } from "../../hooks-deep";

export function DeepInsightsSidebar() {
  const { data, isLoading } = useDeepInsights();

  if (isLoading || !data) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  const miniStats = [
    {
      icon: TrendingDown,
      iconClass: "text-red-500",
      bgClass: "bg-red-50",
      label: "Deep Work Sessions",
      value: `${data.deepWorkSessionsDeltaPct}%`,
      hint: "vs last week",
    },
    {
      icon: Clock,
      iconClass: "text-amber-500",
      bgClass: "bg-amber-50",
      label: "Focus Duration",
      value: data.focusDuration,
      hint: `${data.focusStreak}-day streak`,
    },
    {
      icon: LineChartIcon,
      iconClass: "text-violet-500",
      bgClass: "bg-violet-50",
      label: "Weekly Goal Progress",
      value: `${data.weeklyGoalProgressPct}%`,
      hint: "vs last week",
    },
    {
      icon: CheckCircle2,
      iconClass: "text-emerald-500",
      bgClass: "bg-emerald-50",
      label: "Task Efficiency",
      value: `${data.taskEfficiency}/10`,
    },
  ];

  return (
    <div className="space-y-4">
      {miniStats.map((stat) => (
        <Card key={stat.label} className="border-none shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full ${stat.bgClass}`}>
              <stat.icon className={`h-4 w-4 ${stat.iconClass}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-base font-semibold">{stat.value}</p>
              {stat.hint && (
                <p className="text-[11px] text-muted-foreground">{stat.hint}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
