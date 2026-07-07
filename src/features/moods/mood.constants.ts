// src/features/moods/mood.constants.ts
import type { MoodLevel } from '@/types/mood.types';

export interface MoodOption {
  level: MoodLevel;
  emoji: string;
  label: string;
}

export const MOOD_OPTIONS: MoodOption[] = [
  { level: 'very_sad', emoji: '😢', label: 'Very sad' },
  { level: 'sad', emoji: '😞', label: 'Sad' },
  { level: 'neutral', emoji: '😐', label: 'Neutral' },
  { level: 'happy', emoji: '🙂', label: 'Happy' },
  { level: 'very_happy', emoji: '😄', label: 'Very happy' },
];
