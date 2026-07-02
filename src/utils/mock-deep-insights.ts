// src/features/progress/mock-deep-insights.ts
//
// TODO(backend): there's no /progress/deep-insights endpoint yet. This mock
// is shaped exactly like `DeepInsightsSummary` so that once the endpoint
// exists, `useDeepInsights` in hooks-deep.ts can be swapped to a real
// useQuery + api call with zero changes to the components below.
import type { DeepInsightsSummary } from "./types";

export const mockDeepInsights: DeepInsightsSummary = {
  peakWindowLabel: "10AM - 12AM",
  activityByHour: [
    { hourLabel: "6 AM", value: 15, isLow: true },
    { hourLabel: "8 AM", value: 35 },
    { hourLabel: "10 AM", value: 85, isPeak: true },
    { hourLabel: "12 PM", value: 90, isPeak: true },
    { hourLabel: "2 PM", value: 45 },
    { hourLabel: "4 PM", value: 40 },
    { hourLabel: "6 PM", value: 30 },
    { hourLabel: "8 PM", value: 12, isLow: true },
    { hourLabel: "10 PM", value: 28 },
  ],
  deepWorkSessionsDeltaPct: -12,
  focusDuration: "4h 38m",
  focusStreak: 5,
  weeklyGoalProgressPct: 92,
  weeklyGoalAheadHours: 2.4,
  taskEfficiency: 8.6,
  consistencyTrendDeltaPct: -12,
  consistencyTrend: [
    { label: "Sat", value: 40 },
    { label: "Sun", value: 55 },
    { label: "Mon", value: 35 },
    { label: "Tue", value: 60 },
    { label: "Wed", value: 45 },
    { label: "Thu", value: 65 },
    { label: "Fri", value: 50 },
  ],
  achievement: {
    title: "Analytical Achiever",
    message:
      "Maximize your potential by chatting with our AI. Use these behavioral insights to automate your tasks, solidify your habits, and reach peak performance.",
  },
};
