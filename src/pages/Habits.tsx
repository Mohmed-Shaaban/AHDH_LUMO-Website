// src/pages/HabitsPage.tsx
// (or wherever your dashboard renders this — just drop <HabitsPage /> in your route)

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import type { HabitWithProgress } from "@/types"; 
import { useTodayHabits } from "@/features/habits/useHabits";
import { HabitCard } from "@/components/HabitCard";
import { WeeklyOverview } from "@/components/WeeklyOverview";
import { StreaksSection } from "@/components/StreaksSection";
import { HabitModal } from "@/components/HabitModal";
import { DeleteHabitDialog } from "@/components/DeleteHabitDialog";

function Habits() {
  const { data, isLoading } = useTodayHabits();

  const [modalOpen, setModalOpen] = useState(false);
  const [editHabit, setEditHabit] = useState<HabitWithProgress | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const habits: HabitWithProgress[] = data?.data ?? [];
  const remaining = habits.filter((h) => !h.todayProgress?.isCompleted).length;

  const handleEdit = (habit: HabitWithProgress) => {
    setEditHabit(habit);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditHabit(null);
  };

  return (
    <div className="flex-1 flex gap-6 min-h-0 max-w-7xl mx-auto">
      {/* ── Left column: Today's Habits ─────────────────────────── */}
      <div className="flex-1 min-w-0 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Today's Habits</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {isLoading
                ? "Loading..."
                : `You have ${remaining} habit${remaining !== 1 ? "s" : ""} remaining for today`}
            </p>
          </div>
          <Button
            onClick={() => setModalOpen(true)}
            className="gap-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Habit
          </Button>
        </div>

        {/* Habit list */}
        <div className="space-y-2">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl w-full" />
            ))}

          {!isLoading && habits.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-4xl mb-3">🌱</div>
              <p className="font-medium text-gray-600">No habits yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Add your first habit to get started!
              </p>
              <Button
                onClick={() => setModalOpen(true)}
                variant="outline"
                className="mt-4 gap-2 rounded-xl border-violet-200 text-violet-600 hover:bg-violet-50"
              >
                <Plus className="h-4 w-4" />
                Add Habit
              </Button>
            </div>
          )}

          {!isLoading &&
            habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onEdit={handleEdit}
                onDelete={setDeleteId}
              />
            ))}
        </div>
      </div>

      {/* ── Right column: Weekly Overview + Streaks ──────────────── */}
      <div className="w-72 xl:w-80 shrink-0 space-y-6">
        {/* Weekly Overview */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Weekly Overview</h2>
            <span className="text-[11px] text-gray-400">Last 4 Weeks</span>
          </div>
          <WeeklyOverview />
        </div>

        {/* Streaks */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">Streaks</h2>
          <StreaksSection />
        </div>
      </div>

      {/* ── Modals ───────────────────────────────────────────────── */}
      <HabitModal
        open={modalOpen}
        onClose={handleModalClose}
        editHabit={editHabit}
      />

      <DeleteHabitDialog
        habitId={deleteId}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
}

export default Habits