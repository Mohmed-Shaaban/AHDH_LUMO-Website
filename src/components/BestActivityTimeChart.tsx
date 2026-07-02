// src/features/progress/components/deep-insights/BestActivityTimeChart.tsx
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useDeepInsights } from "@/features/progress/useProgress";

const chartConfig = {
  value: { label: "Productivity", color: "var(--chart-1, #22c55e)" },
} satisfies ChartConfig;

export function BestActivityTimeChart() {
  const { data, isLoading } = useDeepInsights();

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">Best Activity Time</CardTitle>
          <p className="text-xs text-muted-foreground">Hourly productivity performance</p>
        </div>
        {data && (
          <span className="text-sm font-medium text-muted-foreground">
            Peak: {data.peakWindowLabel}
          </span>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart data={data?.activityByHour} margin={{ left: 0, right: 12, top: 8 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="hourLabel" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {data?.activityByHour.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={
                      entry.isPeak
                        ? "#22c55e"
                        : entry.isLow
                          ? "#fca5a5"
                          : "#bbf7d0"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
