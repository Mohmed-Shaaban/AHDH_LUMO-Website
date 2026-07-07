// src/types/mood.types.ts
// Contract: LUMO backend commit 07d1bed — see docs/from-backend/ai-endpoints-handoff.md §5.

export type MoodLevel =
  | 'very_sad'
  | 'sad'
  | 'neutral'
  | 'happy'
  | 'very_happy';

/** Where the user was prompted from. Backend records it as `context.prompt`. */
export type MoodPromptSource = 'post_task' | 'daily' | 'manual' | 'assistant';

export interface MoodEntry {
  id: number;
  userId: number;
  moodLevel: MoodLevel;
  energyLevel: 'low' | 'medium' | 'high';
  stressLevel: 'low' | 'medium' | 'high';
  notes: string | null;
  context: Record<string, unknown> | null;
  recordedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface MoodTrendPoint {
  date: string; // ISO date, "YYYY-MM-DD"
  avgMoodScore: number; // 1..5, very_sad=1 .. very_happy=5
  count: number;
}

export interface MoodTrendResponse {
  points: MoodTrendPoint[];
  todayMood: MoodEntry | null;
}

export interface PostMoodPayload {
  moodLevel: MoodLevel;
  notes?: string;
  context?: {
    prompt: MoodPromptSource;
    taskId?: number;
  };
}
