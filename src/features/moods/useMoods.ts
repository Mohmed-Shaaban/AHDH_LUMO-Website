// src/features/moods/useMoods.ts
import { moodsApi } from '@/services/moods/moods.api';
import type { PostMoodPayload } from '@/types/mood.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// ── Query keys ──────────────────────────────────────────────────────────────

export const moodKeys = {
  all: ['moods'] as const,
  today: () => [...moodKeys.all, 'today'] as const,
  list: (limit: number, offset: number) =>
    [...moodKeys.all, 'list', limit, offset] as const,
  trends: (days: number) => [...moodKeys.all, 'trends', days] as const,
};

// ── Queries ─────────────────────────────────────────────────────────────────

/** GET /moods/today — used both by the daily-prompt gate and the trend card. */
export function useTodayMood() {
  return useQuery({
    queryKey: moodKeys.today(),
    queryFn: moodsApi.getTodayMood,
    staleTime: 60_000,
  });
}

/** GET /moods/trends?days=N — 7-day dashboard sparkline data. */
export function useMoodTrends(days = 7) {
  return useQuery({
    queryKey: moodKeys.trends(days),
    queryFn: () => moodsApi.getMoodTrends(days),
    staleTime: 60_000,
  });
}

// ── Mutations ───────────────────────────────────────────────────────────────

/**
 * POST /moods. On success, invalidate everything the FE renders that reads
 * mood data, including the progress aggregators (which now embed `moodTrend`).
 */
export function usePostMood() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: PostMoodPayload) => moodsApi.postMood(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['moods', 'today'] });
      qc.invalidateQueries({ queryKey: ['moods', 'trends'] });
      qc.invalidateQueries({ queryKey: ['progress', 'quick-insights'] });
      qc.invalidateQueries({ queryKey: ['progress', 'dashboard'] });
    },
  });
}
