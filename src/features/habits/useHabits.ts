import { checkHabit, createHabit, deleteHabit, getDailySummary, getHabitById, getHabits, getHabitStats, getStreaks, getTodayHabits, getWeeklyOverview, startTimer, stopTimer, uncheckHabit, updateHabit } from "@/services/habits/hapits.api";
import type { CheckHabitPayload, StopTimerPayload } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const habitKeys = {
  all: ["habits"] as const,
  lists: () => [...habitKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) =>
    [...habitKeys.lists(), params] as const,
  detail: (id: number) => [...habitKeys.all, "detail", id] as const,
  today: () => [...habitKeys.all, "today"] as const,
  weekly: () => [...habitKeys.all, "weekly"] as const,
  streaks: () => [...habitKeys.all, "streaks"] as const,
  dailySummary: (date?: string) =>
    [...habitKeys.all, "daily-summary", date] as const,
  stats: (id: number) => [...habitKeys.all, "stats", id] as const,
};


export const useHabits = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: habitKeys.list({ page, limit }),
    queryFn: () => getHabits(page, limit),
  });
};

export const useHabit = (id: number) => {
  return useQuery({
    queryKey: habitKeys.detail(id),
    queryFn: () => getHabitById(id),
    enabled: !!id,
  });
};

export const useTodayHabits = () => {
  return useQuery({
    queryKey: habitKeys.today(),
    queryFn: getTodayHabits,
  });
};

export const useWeeklyOverview = () => {
  return useQuery({
    queryKey: habitKeys.weekly(),
    queryFn: getWeeklyOverview,
  });
};

export const useStreaks = () => {
  return useQuery({
    queryKey: habitKeys.streaks(),
    queryFn: getStreaks,
  });
};

export const useDailySummary = (date?: string) => {
  return useQuery({
    queryKey: habitKeys.dailySummary(date),
    queryFn: () => getDailySummary(date),
  });
};

export const useHabitStats = (id: number) => {
  return useQuery({
    queryKey: habitKeys.stats(id),
    queryFn: () => getHabitStats(id),
    enabled: !!id,
  });
};

// ─── Mutation Hooks ───────────────────────────────────────────────────────────

export const useCreateHabit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.all });
    },
  });
};

export const useUpdateHabit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateHabit,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: habitKeys.all });
      queryClient.invalidateQueries({
        queryKey: habitKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.all });
    },
  });
};

export const useCheckHabit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload?: CheckHabitPayload }) =>
      checkHabit(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.today() });
      queryClient.invalidateQueries({ queryKey: habitKeys.streaks() });
    },
  });
};

export const useUncheckHabit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => uncheckHabit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.today() });
      queryClient.invalidateQueries({ queryKey: habitKeys.streaks() });
    },
  });
};

export const useStartTimer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => startTimer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.today() });
    },
  });
};

export const useStopTimer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload?: StopTimerPayload }) =>
      stopTimer(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.today() });
      queryClient.invalidateQueries({ queryKey: habitKeys.streaks() });
    },
  });
};
