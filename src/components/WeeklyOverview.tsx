// src/components/habits/WeeklyOverview.tsx
// import { useWeeklyOverview } from "@/hooks/useHabits"; // adjust path
import { Skeleton } from "@/components/ui/skeleton";
import { useWeeklyOverview } from "@/features/habits/useHabits";
import { cn } from "@/lib/utils";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Returns color class based on how many habits completed that day
function getCompletionColor(rate: number): string {
  if (rate === 0) return "bg-gray-100";
  if (rate <= 25) return "bg-violet-200";
  if (rate <= 50) return "bg-violet-400";
  if (rate <= 75) return "bg-violet-600";
  return "bg-violet-800";
}

// Build a 4-week grid: each entry is { date, completionRate }
function build4WeekGrid(
  habitsData: {
    days: { date: string; dayOfWeek: number; isScheduled: boolean; wasCompleted: boolean }[];
    scheduledDays: number;
  }[]
) {
  // Collect all dates from the habits
  const dateMap: Record<string, { completed: number; scheduled: number }> = {};

  for (const habit of habitsData) {
    for (const day of habit.days) {
      if (!day.isScheduled) continue;
      if (!dateMap[day.date]) {
        dateMap[day.date] = { completed: 0, scheduled: 0 };
      }
      dateMap[day.date].scheduled += 1;
      if (day.wasCompleted) {
        dateMap[day.date].completed += 1;
      }
    }
  }

  // Sort dates
  const sortedDates = Object.keys(dateMap).sort();

  // Build rows of 7 (weeks), up to 4 weeks
  const weeks: { date: string; rate: number }[][] = [];
  let currentWeek: { date: string; rate: number }[] = [];

  for (const date of sortedDates) {
    const { completed, scheduled } = dateMap[date];
    const rate = scheduled > 0 ? (completed / scheduled) * 100 : 0;
    currentWeek.push({ date, rate });
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    // Pad the last row to 7 days
    while (currentWeek.length < 7) {
      currentWeek.push({ date: "", rate: -1 });
    }
    weeks.push(currentWeek);
  }

  // Keep only last 4 weeks
  return weeks.slice(-4);
}

export function WeeklyOverview() {
  const { data, isLoading } = useWeeklyOverview();

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-1.5">
            {Array.from({ length: 7 }).map((_, j) => (
              <Skeleton key={j} className="h-8 w-8 rounded-md" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  const habits = data?.data?.habits ?? [];
  const weeks = build4WeekGrid(habits);

  if (weeks.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-4">
        No data yet — complete habits to see your overview.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-1.5 mb-1">
        {DAY_LABELS.map((d) => (
          <span
            key={d}
            className="text-[10px] text-gray-400 text-center font-medium"
          >
            {d}
          </span>
        ))}
      </div>

      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 gap-1.5">
          {week.map((cell, di) => (
            <div
              key={di}
              title={
                cell.date
                  ? `${cell.date}: ${Math.round(cell.rate)}% complete`
                  : undefined
              }
              className={cn(
                "h-8 rounded-md transition-colors",
                cell.date === ""
                  ? "bg-gray-50"
                  : cell.rate < 0
                  ? "bg-gray-50"
                  : getCompletionColor(cell.rate)
              )}
            />
          ))}
        </div>
      ))}

      {/* Legend */}
      <div className="flex items-center gap-2 pt-1 justify-end">
        <span className="text-[10px] text-gray-400">Less</span>
        {[0, 25, 50, 75, 100].map((r) => (
          <div
            key={r}
            className={cn("h-3 w-3 rounded-sm", getCompletionColor(r))}
          />
        ))}
        <span className="text-[10px] text-gray-400">More</span>
      </div>
    </div>
  );
}
