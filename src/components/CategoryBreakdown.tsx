// src/features/progress/components/CategoryBreakdown.tsx
import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { useCategoryBreakdown } from "@/features/progress/useProgress";
// import { useCategoryBreakdown } from "../hooks";

const FALLBACK_COLORS = ["#ef4444", "#f59e0b", "#3b82f6", "#22c55e", "#a855f7"];

export function CategoryBreakdown() {
  const { data, isLoading } = useCategoryBreakdown();

  const categories = data?.categories ?? [];
  const hasData = categories.length > 0;

  const chartData = categories.map((c, i) => ({
    name: c.name,
    value: c.percentage,
    fill: c.color ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length],
  }));

  const chartConfig = Object.fromEntries(
    categories.map((c, i) => [
      c.name,
      { label: c.name, color: c.color ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length] },
    ])
  ) satisfies ChartConfig;

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : !hasData ? (
          <div className="flex h-48 flex-col items-center justify-center gap-1 text-center text-sm text-muted-foreground">
            <p>No categorized activity yet.</p>
            <p className="text-xs">Complete a few habits to see your breakdown.</p>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square h-40">
              <RadialBarChart
                data={chartData}
                innerRadius="30%"
                outerRadius="100%"
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" background cornerRadius={8} />
              </RadialBarChart>
            </ChartContainer>

            <div>
              <p className="text-xs text-muted-foreground">Total HPS</p>
              <p className="text-2xl font-semibold">{data?.totalCount ?? 0}</p>
              <ul className="mt-3 space-y-1.5">
                {categories.map((c, i) => (
                  <li key={c.name} className="flex items-center gap-2 text-sm">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor:
                          c.color ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length],
                      }}
                    />
                    <span className="text-muted-foreground">{c.name}</span>
                    <span className="ml-auto font-medium">{c.percentage}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
