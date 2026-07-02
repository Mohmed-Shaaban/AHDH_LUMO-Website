// src/features/progress/components/WeeklyOverviewHeatmap.tsx
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useWeeklyOverview } from "@/features/progress/useProgress";
import type { HeatmapDay } from "@/types/progress.types";
import { heatmapCellClass } from "@/utils/progressUtils";

// Display order: Mon, Tue, Wed, Thu, Fri, Sat, Sun
const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const DISPLAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function WeeklyOverviewHeatmap() {
  const { data, isLoading } = useWeeklyOverview(4);

  const rows = useMemo(() => {
    if (!data) return [];

    const byWeek = new Map<number, HeatmapDay[]>();
    for (const day of data.heatmap) {
      const bucket = byWeek.get(day.weekOffset) ?? [];
      bucket.push(day);
      byWeek.set(day.weekOffset, bucket);
    }

    // Oldest week first, current week (offset 0) last — mirrors the API order.
    const weekOffsets = Array.from(byWeek.keys()).sort((a, b) => b - a);

    return weekOffsets.map((offset) => {
      const days = byWeek.get(offset)!;
      return DISPLAY_ORDER.map((dow) =>
        days.find((d) => d.dayOfWeek === dow)
      );
    });
  }, [data]);

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Weekly Overview</CardTitle>
        <p className="text-xs text-muted-foreground">
          Track your habits over the last {data?.weeks ?? 4} weeks
        </p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-40 w-full" />
        ) : (
          <TooltipProvider delayDuration={150}>
            <div className="flex flex-col gap-2">
              {rows.map((row, i) => (
                <div key={i} className="grid grid-cols-7 gap-2">
                  {row.map((day, j) => (
                    <Tooltip key={j}>
                      <TooltipTrigger asChild>
                        <div
                          className={`aspect-square w-full rounded-md ${
                            day ? heatmapCellClass(day) : "bg-muted"
                          }`}
                        />
                      </TooltipTrigger>
                      {day && (
                        <TooltipContent>
                          <p className="text-xs">
                            {day.date} · {day.completed}/{day.scheduled} done
                          </p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  ))}
                </div>
              ))}
              <div className="mt-1 grid grid-cols-7 gap-2">
                {DISPLAY_LABELS.map((label) => (
                  <span
                    key={label}
                    className="text-center text-[10px] text-muted-foreground"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </TooltipProvider>
        )}
      </CardContent>
    </Card>
  );
}
