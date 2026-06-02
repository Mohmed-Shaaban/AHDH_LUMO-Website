// src/components/habits/StreaksSection.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { useStreaks } from "@/features/habits/useHabits";
import { Flame, Trophy } from "lucide-react";

export function StreaksSection() {
  const { data, isLoading } = useStreaks();

  const streaks = data?.data ?? [];

  const bestCurrent = streaks.reduce(
    (best, h) => (h.currentStreak > best ? h.currentStreak : best),
    0
  );
  const bestLongest = streaks.reduce(
    (best, h) => (h.longestStreak > best ? h.longestStreak : best),
    0
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {/* Current Streak */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 flex flex-col items-center gap-1 shadow-sm">
          <div className="text-2xl">🔥</div>
          <p className="text-[11px] text-gray-400 font-medium">Current Streak</p>
          <p className="text-2xl font-bold text-gray-800">
            {bestCurrent}{" "}
            <span className="text-sm font-normal text-gray-400">Days</span>
          </p>
        </div>

        {/* Longest Streak */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 flex flex-col items-center gap-1 shadow-sm">
          <div className="text-2xl">🏆</div>
          <p className="text-[11px] text-gray-400 font-medium">Longest Streak</p>
          <p className="text-2xl font-bold text-gray-800">
            {bestLongest}{" "}
            <span className="text-sm font-normal text-gray-400">Days</span>
          </p>
        </div>
      </div>

      {/* Per-habit streaks list */}
      {streaks.length > 0 && (
        <div className="space-y-2">
          {streaks
            .filter((h) => h.currentStreak > 0)
            .sort((a, b) => b.currentStreak - a.currentStreak)
            .slice(0, 3)
            .map((habit) => (
              <div
                key={habit.habitId}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3"
              >
                <div className="h-9 w-9 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                  <Flame className="h-4 w-4 text-violet-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {habit.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {habit.currentStreak} day streak · {habit.totalCompletions} total
                  </p>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Trophy className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">{habit.longestStreak}d</span>
                </div>
              </div>
            ))}
        </div>
      )}

      {streaks.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-2">
          Complete habits to build streaks!
        </p>
      )}
    </div>
  );
}
