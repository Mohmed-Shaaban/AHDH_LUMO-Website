 const progressKeys = {
  all: ["progress"] as const,
  overview: () => [...progressKeys.all, "overview"] as const,
  greeting: () => [...progressKeys.all, "greeting"] as const,
  weeklyTrends: (days: number) =>
    [...progressKeys.all, "weekly-trends", days] as const,
  weeklyOverview: (weeks: number) =>
    [...progressKeys.all, "weekly-overview", weeks] as const,
  categoryBreakdown: () => [...progressKeys.all, "category-breakdown"] as const,
  aiRecommendations: () => [...progressKeys.all, "ai-recommendations"] as const,
};


// src/features/progress/hooks-deep.ts

/**
 * TODO(backend): replace the queryFn with a real call once
 * GET /progress/deep-insights (or equivalent) exists, e.g.:
 *
 *   queryFn: progressApi.getDeepInsights
 *
 * The rest of the Deep Insights UI already consumes `DeepInsightsSummary`
 * and won't need to change.
 */
export function useDeepInsights() {
  return useQuery({
    queryKey: [...progressKeys.all, "deep-insights"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return mockDeepInsights;
    },
    staleTime: 60_000,
  });
}


import { progressApi } from "@/services/progress/progress.api";
import { mockDeepInsights } from "@/utils/mock-deep-insights";
// src/features/progress/hooks.ts
import { useQuery } from "@tanstack/react-query";

/** /progress/overview — streak, focus score, task completion, active hours */
export function useProgressOverview() {
  return useQuery({
    queryKey: progressKeys.overview(),
    queryFn: progressApi.getOverview,
    staleTime: 60_000,
  });
}

/** /progress/greeting — top-of-page greeting + AI one-liner */
export function useProgressGreeting() {
  return useQuery({
    queryKey: progressKeys.greeting(),
    queryFn: progressApi.getGreeting,
    staleTime: 5 * 60_000,
  });
}

/** /progress/weekly-trends?days= — the "Weekly Productive Trends" area chart */
export function useWeeklyTrends(days = 7) {
  return useQuery({
    queryKey: progressKeys.weeklyTrends(days),
    queryFn: () => progressApi.getWeeklyTrends(days),
    staleTime: 60_000,
  });
}

/** /progress/weekly-overview?weeks= — the habit heatmap */
export function useWeeklyOverview(weeks = 4) {
  return useQuery({
    queryKey: progressKeys.weeklyOverview(weeks),
    queryFn: () => progressApi.getWeeklyOverview(weeks),
    staleTime: 60_000,
  });
}

/** /progress/category-breakdown — the donut chart */
export function useCategoryBreakdown() {
  return useQuery({
    queryKey: progressKeys.categoryBreakdown(),
    queryFn: progressApi.getCategoryBreakdown,
    staleTime: 60_000,
  });
}

/** /progress/ai-recommendations — the recommendation cards */
export function useAiRecommendations() {
  return useQuery({
    queryKey: progressKeys.aiRecommendations(),
    queryFn: progressApi.getAiRecommendations,
    staleTime: 5 * 60_000,
  });
}
