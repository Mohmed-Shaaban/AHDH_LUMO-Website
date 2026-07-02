// src/features/progress/components/deep-insights/WeeklyGoalRadialCard.tsx
import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { useDeepInsights } from "@/features/progress/useProgress";
// import { useDeepInsights } from "../../hooks-deep";

const goalChartConfig = {
  value: { label: "Weekly goal", color: "var(--chart-1, #fbbf24)" },
} satisfies ChartConfig;

export function WeeklyGoalRadialCard() {
  const { data, isLoading } = useDeepInsights();

  if (isLoading || !data) {
    return <Skeleton className="h-56 w-full" />;
  }

  return (
    <Card className="border-none shadow-sm">
      <CardContent className="flex h-full flex-col items-center justify-center p-4 text-center">
        <p className="mb-1 text-sm font-medium">Weekly Goal Progress</p>
        <p className="mb-3 text-xs text-muted-foreground">
          You are {data.weeklyGoalAheadHours} hours ahead of your focus time
        </p>
        <div className="relative flex h-28 w-28 items-center justify-center">
          <ChartContainer config={goalChartConfig} className="absolute inset-0 h-full w-full">
            <RadialBarChart
              data={[{ value: data.weeklyGoalProgressPct, fill: "#fbbf24" }]}
              innerRadius="70%"
              outerRadius="100%"
              startAngle={90}
              endAngle={90 - 360 * (data.weeklyGoalProgressPct / 100)}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar dataKey="value" background cornerRadius={12} />
            </RadialBarChart>
          </ChartContainer>
          <p className="relative text-xl font-semibold">{data.weeklyGoalProgressPct}%</p>
        </div>
      </CardContent>
    </Card>
  );
}
