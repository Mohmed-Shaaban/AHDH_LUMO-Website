// src/features/moods/MoodTrendCard.tsx
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Smile } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useMoodTrends } from './useMoods';
import { useMoodPromptStore } from '@/providers/context/moodPromptStore';
import { MOOD_OPTIONS } from './mood.constants';
import type { MoodLevel } from '@/types/mood.types';

const MOOD_EMOJI: Record<MoodLevel, string> = MOOD_OPTIONS.reduce(
  (acc, opt) => {
    acc[opt.level] = opt.emoji;
    return acc;
  },
  {} as Record<MoodLevel, string>,
);

const MOOD_LABEL: Record<MoodLevel, string> = MOOD_OPTIONS.reduce(
  (acc, opt) => {
    acc[opt.level] = opt.label;
    return acc;
  },
  {} as Record<MoodLevel, string>,
);

function formatDay(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { weekday: 'short' });
}

export function MoodTrendCard() {
  const { data, isLoading } = useMoodTrends(7);
  const openWith = useMoodPromptStore((s) => s.openWith);

  const chartData =
    data?.points.map((p) => ({
      label: formatDay(p.date),
      score: p.avgMoodScore,
    })) ?? [];

  const todayMood = data?.todayMood ?? null;
  const emoji = todayMood ? MOOD_EMOJI[todayMood.moodLevel] : null;
  const label = todayMood ? MOOD_LABEL[todayMood.moodLevel] : null;

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base">Mood this week</CardTitle>
          <p className="text-xs text-muted-foreground">
            How you've been feeling over the last 7 days
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-500/40 dark:text-purple-300 dark:hover:bg-purple-500/10"
          onClick={() => openWith({ source: 'manual' })}
        >
          <Smile className="size-4" />
          Log mood
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-28 w-full" />
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center rounded-xl bg-gradient-to-br from-violet-100 to-purple-100 px-4 py-3 dark:from-violet-500/20 dark:to-purple-500/20">
              <span className="text-3xl" aria-hidden>
                {emoji ?? '➖'}
              </span>
              <span className="mt-1 text-[10px] font-medium text-purple-700 dark:text-purple-300">
                {label ?? 'No entry today'}
              </span>
            </div>

            <div className="flex-1">
              {chartData.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  Log a mood to start seeing your trend.
                </p>
              ) : (
                <div className="h-24 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="moodTrendFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#9575CD"
                            stopOpacity={0.5}
                          />
                          <stop
                            offset="95%"
                            stopColor="#9575CD"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="label" hide />
                      <YAxis domain={[1, 5]} hide />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#7E57C2"
                        strokeWidth={2}
                        fill="url(#moodTrendFill)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default MoodTrendCard;
