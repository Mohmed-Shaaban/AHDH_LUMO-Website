// src/features/moods/MoodPickerSheet.tsx
import { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePostMood } from './useMoods';
import { MOOD_OPTIONS } from './mood.constants';
import { useMoodPromptStore } from '@/providers/context/moodPromptStore';
import type { MoodLevel, MoodPromptSource } from '@/types/mood.types';

const SOURCE_COPY: Record<
  ReturnType<typeof useMoodPromptStore.getState>['source'],
  { title: string; description: string }
> = {
  task: {
    title: 'Nice work — how are you feeling?',
    description: 'Log your mood after finishing that task. Takes a second.',
  },
  daily: {
    title: 'How are you feeling today?',
    description: 'A quick daily check-in helps LUMO tailor your day.',
  },
  manual: {
    title: 'How are you feeling right now?',
    description: 'Log a mood entry any time.',
  },
};

const SOURCE_TO_PROMPT: Record<
  ReturnType<typeof useMoodPromptStore.getState>['source'],
  MoodPromptSource
> = {
  task: 'post_task',
  daily: 'daily',
  manual: 'manual',
};

export function MoodPickerSheet() {
  const { open, source, taskId, close, dismissForToday } = useMoodPromptStore();
  const postMood = usePostMood();

  const [selected, setSelected] = useState<MoodLevel | null>(null);
  const [notes, setNotes] = useState('');

  const copy = SOURCE_COPY[source];
  const isSubmitting = postMood.isPending;

  const resetForm = () => {
    setSelected(null);
    setNotes('');
  };

  const handleSave = () => {
    if (!selected || isSubmitting) return;
    postMood.mutate(
      {
        moodLevel: selected,
        notes: notes.trim() || undefined,
        context: {
          prompt: SOURCE_TO_PROMPT[source],
          ...(source === 'task' && typeof taskId === 'number'
            ? { taskId }
            : {}),
        },
      },
      {
        onSuccess: () => {
          toast.success('Mood saved');
          resetForm();
          close();
        },
        onError: (err: unknown) => {
          const status = (err as AxiosError)?.response?.status;
          if (status === 429) {
            toast.error('Slow down — try again in a moment.');
          } else {
            toast.error("Couldn't save mood. Try again.");
          }
        },
      },
    );
  };

  const handleSkip = () => {
    // "Skip for now" on the daily prompt hides it until tomorrow.
    // Task and manual triggers just close.
    resetForm();
    if (source === 'daily') {
      dismissForToday();
    } else {
      close();
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (!next) handleSkip();
      }}
    >
      <SheetContent
        side="bottom"
        className="mx-auto max-w-lg rounded-t-2xl border-t-0 bg-gradient-to-b from-white to-[#F4F1FA] p-6 dark:from-[#1a0f2e] dark:to-[#12081f]"
      >
        <SheetHeader className="text-center sm:text-center">
          <SheetTitle className="text-lg">{copy.title}</SheetTitle>
          <SheetDescription>{copy.description}</SheetDescription>
        </SheetHeader>

        <div
          className="mt-6 flex justify-between gap-2"
          role="radiogroup"
          aria-label="Mood level"
        >
          {MOOD_OPTIONS.map((opt) => {
            const isActive = selected === opt.level;
            return (
              <button
                key={opt.level}
                type="button"
                onClick={() => setSelected(opt.level)}
                aria-label={opt.label}
                aria-checked={isActive}
                role="radio"
                className={cn(
                  'flex flex-1 flex-col items-center gap-1 rounded-xl border-2 border-transparent bg-white/60 p-3 text-3xl transition-all hover:-translate-y-0.5 hover:border-purple-200 dark:bg-white/5',
                  isActive &&
                    'scale-110 border-purple-500 bg-purple-50 shadow-md dark:bg-purple-500/20',
                )}
              >
                <span aria-hidden>{opt.emoji}</span>
                <span
                  className={cn(
                    'text-[10px] font-medium text-muted-foreground',
                    isActive && 'text-purple-700 dark:text-purple-300',
                  )}
                >
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <label
            htmlFor="mood-notes"
            className="mb-2 block text-xs font-medium text-muted-foreground"
          >
            Notes (optional)
          </label>
          <Textarea
            id="mood-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything on your mind?"
            className="min-h-[80px] resize-none"
            maxLength={500}
            disabled={isSubmitting}
          />
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Button
            onClick={handleSave}
            disabled={!selected || isSubmitting}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-sm hover:from-violet-700 hover:to-purple-700"
          >
            {isSubmitting ? 'Saving…' : 'Save'}
          </Button>
          <Button
            variant="ghost"
            onClick={handleSkip}
            disabled={isSubmitting}
            className="w-full"
          >
            Skip for now
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MoodPickerSheet;
