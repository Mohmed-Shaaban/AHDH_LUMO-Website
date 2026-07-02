// src/features/progress/components/WeeklyTrendsChart.tsx
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useWeeklyTrends } from "@/features/progress/useProgress";
import { dayLabel } from "@/utils/progressUtils";


const chartConfig = {
  focusMinutes: {
    label: "Focus minutes",
    color: "var(--chart-1, #22c55e)",
  },
} satisfies ChartConfig;

export function WeeklyTrendsChart() {
  const { data, isLoading } = useWeeklyTrends(7);

  const chartData =
    data?.days.map((d) => ({
      label: dayLabel(d.dayOfWeek),
      focusMinutes: d.focusMinutes,
      completionRate: d.completionRate,
    })) ?? [];

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">Weekly Productive Trends</CardTitle>
          <p className="text-xs text-muted-foreground">
            Comparison of your focus levels over the last 7 days
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <AreaChart data={chartData} margin={{ left: 0, right: 12, top: 8 }}>
              <defs>
                <linearGradient id="focusFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-focusMinutes)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="var(--color-focusMinutes)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                dataKey="focusMinutes"
                type="monotone"
                stroke="var(--color-focusMinutes)"
                fill="url(#focusFill)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
