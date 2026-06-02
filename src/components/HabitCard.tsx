// src/components/habits/HabitCard.tsx
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Timer, Plus, MoreVertical, Pencil, Trash2, StopCircle } from "lucide-react";
import {
  useCheckHabit,
  useUncheckHabit,
  useStartTimer,
  useStopTimer,
} from "@/features/habits/useHabits"; // adjust path
import type { HabitWithProgress } from "@/types"; // adjust path
import { cn } from "@/lib/utils";

interface HabitCardProps {
  habit: HabitWithProgress;
  onEdit: (habit: HabitWithProgress) => void;
  onDelete: (id: number) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  health: "bg-emerald-100 text-emerald-700",
  fitness: "bg-blue-100 text-blue-700",
  productivity: "bg-violet-100 text-violet-700",
  mindfulness: "bg-amber-100 text-amber-700",
  learning: "bg-sky-100 text-sky-700",
  social: "bg-pink-100 text-pink-700",
  finance: "bg-green-100 text-green-700",
  other: "bg-gray-100 text-gray-700",
};

export function HabitCard({ habit, onEdit, onDelete }: HabitCardProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerInterval, setTimerInterval] = useState<ReturnType<typeof setInterval> | null>(null);

  const checkMutation = useCheckHabit();
  const uncheckMutation = useUncheckHabit();
  const startTimerMutation = useStartTimer();
  const stopTimerMutation = useStopTimer();

  const { todayProgress } = habit;
  const isCompleted = todayProgress?.isCompleted ?? false;
  const isTimerRunning = todayProgress?.isTimerRunning ?? false;
  const completedCount = todayProgress?.completedCount ?? 0;
  const goalTarget = todayProgress?.goalTarget ?? habit.goalTarget;

  // ── Once goal type ──────────────────────────────────────────────
  const handleOnceToggle = () => {
    if (isCompleted) {
      uncheckMutation.mutate(habit.id);
    } else {
      checkMutation.mutate({ id: habit.id });
    }
  };

  // ── Count goal type ─────────────────────────────────────────────
  const handleIncrement = () => {
    checkMutation.mutate({ id: habit.id });
  };

  // ── Duration / Timer goal type ──────────────────────────────────
  const handleStartTimer = () => {
    startTimerMutation.mutate(habit.id);
    let secs = 0;
    const interval = setInterval(() => {
      secs += 1;
      setElapsedSeconds(secs);
    }, 1000);
    setTimerInterval(interval);
  };

  const handleStopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setElapsedSeconds(0);
    stopTimerMutation.mutate({ id: habit.id });
  };

  const formatElapsed = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const isMutating =
    checkMutation.isPending ||
    uncheckMutation.isPending ||
    startTimerMutation.isPending ||
    stopTimerMutation.isPending;

  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-3.5 rounded-xl border bg-white transition-all",
        isCompleted
          ? "border-violet-200 bg-violet-50/40"
          : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
      )}
    >
      {/* Left checkbox — only for once/count types */}
      {!habit.isTimed && (
        <Checkbox
          checked={isCompleted}
          onCheckedChange={handleOnceToggle}
          disabled={isMutating || (habit.goalType === "count" && !isCompleted)}
          className="h-5 w-5 rounded-md border-gray-300 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
        />
      )}

      {/* Habit info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              "font-medium text-sm truncate",
              isCompleted ? "line-through text-gray-400" : "text-gray-800"
            )}
          >
            {habit.title}
          </span>
          <Badge
            variant="secondary"
            className={cn(
              "text-[10px] font-medium px-1.5 py-0 capitalize",
              CATEGORY_COLORS[habit.category] ?? CATEGORY_COLORS.other
            )}
          >
            {habit.category}
          </Badge>
        </div>

        {/* Sub-info per goal type */}
        {habit.goalType === "once" && !habit.isTimed && (
          <p className="text-xs text-gray-400 mt-0.5">
            Completed: {completedCount}/{goalTarget}
          </p>
        )}

        {habit.goalType === "count" && (
          <div className="mt-1.5 flex items-center gap-2">
            <Progress
              value={(completedCount / goalTarget) * 100}
              className="h-1.5 flex-1 bg-gray-100 [&>div]:bg-violet-500"
            />
            <span className="text-xs text-gray-400 shrink-0">
              {completedCount}/{goalTarget}
            </span>
          </div>
        )}

        {habit.isTimed && isTimerRunning && (
          <p className="text-xs text-violet-600 font-mono mt-0.5">
            ⏱ {formatElapsed(elapsedSeconds)}
            {habit.estimatedDuration
              ? ` / ${habit.estimatedDuration}min goal`
              : ""}
          </p>
        )}

        {habit.isTimed && !isTimerRunning && habit.estimatedDuration && (
          <p className="text-xs text-gray-400 mt-0.5">
            Goal: {habit.estimatedDuration} mins
          </p>
        )}
      </div>

      {/* Right-side actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Count increment */}
        {habit.goalType === "count" && !isCompleted && (
          <Button
            size="icon"
            variant="outline"
            className="h-7 w-7 rounded-full border-violet-200 text-violet-600 hover:bg-violet-50"
            onClick={handleIncrement}
            disabled={isMutating}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        )}

        {/* Timer start/stop */}
        {habit.isTimed && !isCompleted && (
          <>
            {!isTimerRunning ? (
              <Button
                size="sm"
                className="h-8 px-3 text-xs bg-violet-600 hover:bg-violet-700 text-white rounded-lg gap-1.5"
                onClick={handleStartTimer}
                disabled={isMutating || startTimerMutation.isPending}
              >
                <Timer className="h-3.5 w-3.5" />
                Start Timer
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-3 text-xs border-red-200 text-red-600 hover:bg-red-50 rounded-lg gap-1.5"
                onClick={handleStopTimer}
                disabled={isMutating || stopTimerMutation.isPending}
              >
                <StopCircle className="h-3.5 w-3.5" />
                Stop
              </Button>
            )}
          </>
        )}

        {/* Once circle button */}
        {habit.goalType === "once" && !habit.isTimed && (
          <button
            onClick={handleOnceToggle}
            disabled={isMutating}
            className={cn(
              "h-7 w-7 rounded-full border-2 transition-all flex items-center justify-center",
              isCompleted
                ? "border-violet-500 bg-violet-500"
                : "border-gray-300 hover:border-violet-400"
            )}
          >
            {isCompleted && (
              <svg
                className="h-3.5 w-3.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
        )}

        {/* More options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-gray-400 hover:text-gray-600"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem
              className="gap-2 text-sm"
              onClick={() => onEdit(habit)}
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 text-sm text-red-600 focus:text-red-600"
              onClick={() => onDelete(habit.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
