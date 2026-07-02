// src/features/progress/types.ts

/** Generic envelope every /progress/* endpoint returns. */
export interface ApiEnvelope<T> {
  status: boolean;
  message: string;
  data: T;
  meta: {
    timestamp: string;
    path: string;
  };
}

// ---------------------------------------------------------------------------
// GET /progress/overview
// ---------------------------------------------------------------------------
export interface ProgressOverview {
  currentStreak: number;
  focusScore: number;
  taskCompletionRate: number;
  activeHours: number;
}

// ---------------------------------------------------------------------------
// GET /progress/greeting
// ---------------------------------------------------------------------------
export interface ProgressGreeting {
  greeting: string;
  insight: string;
}

// ---------------------------------------------------------------------------
// GET /progress/weekly-trends?days=7
// ---------------------------------------------------------------------------
export interface WeeklyTrendDay {
  date: string; // ISO date, e.g. "2026-06-26"
  dayOfWeek: number; // 0 = Sunday .. 6 = Saturday
  focusMinutes: number;
  completionRate: number; // 0-100
}

export interface WeeklyTrends {
  days: WeeklyTrendDay[];
}

// ---------------------------------------------------------------------------
// GET /progress/weekly-overview?weeks=4
// ---------------------------------------------------------------------------
export interface HeatmapDay {
  date: string;
  dayOfWeek: number;
  weekOffset: number; // 0 = current week, higher = further in the past
  completed: number;
  scheduled: number;
  intensity: number; // 0-4, drives cell color
}

export interface WeeklyOverview {
  weeks: number;
  heatmap: HeatmapDay[];
}

// ---------------------------------------------------------------------------
// GET /progress/category-breakdown
// NOTE: the sample response has an empty `categories` array, so this shape
// is inferred from the "Category Breakdown" donut in the design (Work,
// Health, Learning, Faith). Confirm/adjust field names once the backend
// returns real rows.
// ---------------------------------------------------------------------------
export interface CategoryBreakdownItem {
  name: string;
  count: number;
  percentage: number;
  color?: string; // hex, if the API ever supplies one
}

export interface CategoryBreakdown {
  totalCount: number;
  categories: CategoryBreakdownItem[];
}

// ---------------------------------------------------------------------------
// GET /progress/ai-recommendations
// ---------------------------------------------------------------------------
export interface AiRecommendation {
  title: string;
  message: string;
}

export interface AiRecommendations {
  recommendations: AiRecommendation[];
}

// ---------------------------------------------------------------------------
// Deep Insights tab — NOT backed by a real endpoint yet.
// Mocked locally in `mock-deep-insights.ts` behind the same hook shape so the
// UI is real and swapping in a live endpoint later is a one-line change.
// ---------------------------------------------------------------------------
export interface ActivityHourBucket {
  hourLabel: string; // "6 AM"
  value: number; // relative productivity 0-100
  isPeak?: boolean;
  isLow?: boolean;
}

export interface DeepInsightsSummary {
  peakWindowLabel: string; // "10AM - 12AM"
  activityByHour: ActivityHourBucket[];
  deepWorkSessionsDeltaPct: number; // -12
  focusDuration: string; // "4h 38m"
  focusStreak: number; // 5
  weeklyGoalProgressPct: number; // 92
  weeklyGoalAheadHours: number; // 2.4
  taskEfficiency: number; // 8.6 (out of 10)
  consistencyTrendDeltaPct: number; // -12
  consistencyTrend: { label: string; value: number }[]; // Sat..Fri
  achievement: {
    title: string;
    message: string;
  };
}
