// src/features/progress/utils.ts
// import type { HeatmapDay } from "./types";

import type { HeatmapDay } from "@/types/progress.types";

export const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function dayLabel(dayOfWeek: number): string {
  return DAY_LABELS[dayOfWeek] ?? "";
}

/**
 * Tailwind background class for a heatmap cell.
 * - scheduled but not completed -> muted/gray (missed)
 * - no data at all (0/0)        -> faint neutral
 * - otherwise                   -> green scale driven by intensity (0-4)
 */
export function heatmapCellClass(day: HeatmapDay): string {
  const { completed, scheduled, intensity } = day;

  if (scheduled > 0 && completed === 0) {
    return "bg-muted-foreground/30";
  }

  if (scheduled === 0 && completed === 0) {
    return "bg-muted";
  }

  const steps = [
    "bg-emerald-100",
    "bg-emerald-300",
    "bg-emerald-500",
    "bg-emerald-600",
    "bg-emerald-700",
  ];

  return steps[Math.min(Math.max(intensity, 0), steps.length - 1)];
}

export function formatHours(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  const whole = Math.floor(hours);
  const minutes = Math.round((hours - whole) * 60);
  return minutes > 0 ? `${whole}h ${minutes}m` : `${whole}h`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}
