// src/features/progress/components/deep-insights/ConsistencyTrendChart.tsx
import { useState } from "react";
import { Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useDeepInsights } from "@/features/progress/useProgress";
// import { useDeepInsights } from "../../hooks-deep";

const chartConfig = {
  value: { label: "Consistency", color: "var(--chart-2, #fb923c)" },
} satisfies ChartConfig;

const RANGES = ["Day", "Week", "Month"] as const;

export function ConsistencyTrendChart() {
  const { data, isLoading } = useDeepInsights();
  const [range, setRange] = useState<(typeof RANGES)[number]>("Week");

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">Consistency Trend</CardTitle>
          {data && (
            <p className="text-xs text-muted-foreground">
              {data.consistencyTrendDeltaPct}% vs last week
            </p>
          )}
        </div>
        <div className="flex rounded-full border p-0.5 text-xs">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={
                r === range
                  ? "rounded-full bg-primary px-3 py-1 font-medium text-primary-foreground"
                  : "px-3 py-1 text-muted-foreground"
              }
            >
              {r}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-56 w-full" />
        ) : (
          <ChartContainer config={chartConfig} className="h-56 w-full">
            <LineChart data={data?.consistencyTrend} margin={{ left: 0, right: 12, top: 8 }}>
              <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                dataKey="value"
                type="monotone"
                stroke="var(--color-value)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
