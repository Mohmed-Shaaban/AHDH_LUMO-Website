// src/services/moods/moods.api.ts
// LUMO backend contract: docs/from-backend/ai-endpoints-handoff.md §5.

import axiosInstance from '../axiosInstance';
import type { ApiEnvelope } from '@/types/progress.types';
import type {
  MoodEntry,
  MoodTrendResponse,
  PostMoodPayload,
} from '@/types/mood.types';

export const moodsApi = {
  /** POST /moods — log a mood entry. */
  postMood: async (payload: PostMoodPayload): Promise<MoodEntry> => {
    const { data } = await axiosInstance.post<ApiEnvelope<MoodEntry>>(
      '/moods',
      payload,
    );
    return data.data;
  },

  /** GET /moods/today — latest entry for the server's current day, or null. */
  getTodayMood: async (): Promise<MoodEntry | null> => {
    const { data } = await axiosInstance.get<ApiEnvelope<MoodEntry | null>>(
      '/moods/today',
    );
    return data.data;
  },

  /** GET /moods?limit=&offset= — paginated history, newest first. */
  getMoods: async (limit = 20, offset = 0): Promise<MoodEntry[]> => {
    const { data } = await axiosInstance.get<ApiEnvelope<MoodEntry[]>>(
      '/moods',
      { params: { limit, offset } },
    );
    return data.data;
  },

  /** GET /moods/trends?days=N — daily averages + today's entry. */
  getMoodTrends: async (days = 7): Promise<MoodTrendResponse> => {
    const { data } = await axiosInstance.get<ApiEnvelope<MoodTrendResponse>>(
      '/moods/trends',
      { params: { days } },
    );
    return data.data;
  },
};
