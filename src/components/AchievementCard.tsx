// src/features/progress/components/deep-insights/AchievementCard.tsx
import { Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeepInsights } from "@/features/progress/useProgress";

export function AchievementCard() {
  const { data, isLoading } = useDeepInsights();

  if (isLoading || !data) {
    return <Skeleton className="h-64 w-full" />;
  }

  return (
    <Card className="border-none bg-gradient-to-b from-violet-500/10 to-transparent shadow-sm">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-600">
          <Brain className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-base font-semibold">{data.achievement.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {data.achievement.message}
        </p>
        <Button className="mt-4 w-full rounded-full">Ask AI</Button>
      </CardContent>
    </Card>
  );
}
