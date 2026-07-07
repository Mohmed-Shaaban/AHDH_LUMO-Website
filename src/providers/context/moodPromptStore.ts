// src/providers/context/moodPromptStore.ts
// Mirrors the assistantStore.ts pattern. Persists `dismissedForToday`
// (keyed by date) to localStorage so it auto-resets tomorrow.

import { create } from 'zustand';

export type MoodPromptTrigger = 'task' | 'daily' | 'manual';

const STORAGE_KEY = 'lumo:mood-prompt-dismissed';

interface StoredDismissal {
  date: string; // YYYY-MM-DD
  dismissed: boolean;
}

function localDateKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function loadDismissed(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as StoredDismissal;
    return parsed.date === localDateKey() && parsed.dismissed === true;
  } catch {
    return false;
  }
}

function persistDismissed(dismissed: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    const payload: StoredDismissal = { date: localDateKey(), dismissed };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Best-effort — swallow storage failures (quota, private mode, SSR).
  }
}

interface MoodPromptState {
  open: boolean;
  source: MoodPromptTrigger;
  taskId?: number;
  dismissedForToday: boolean;

  openWith: (args: { source: MoodPromptTrigger; taskId?: number }) => void;
  close: () => void;
  dismissForToday: () => void;
}

export const useMoodPromptStore = create<MoodPromptState>((set) => ({
  open: false,
  source: 'manual',
  taskId: undefined,
  dismissedForToday: loadDismissed(),

  openWith: ({ source, taskId }) =>
    set({ open: true, source, taskId }),

  close: () => set({ open: false }),

  dismissForToday: () => {
    persistDismissed(true);
    set({ open: false, dismissedForToday: true });
  },
}));
