// src/features/progress/components/AiRecommendations.tsx
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAiRecommendations } from "@/features/progress/useProgress";

export function AiRecommendations() {
  const { data, isLoading } = useAiRecommendations();
  const recommendations = data?.recommendations ?? [];

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-primary" />
          AI recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <>
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </>
        ) : (
          recommendations.map((rec, i) => (
            <div
              key={i}
              className="rounded-xl border border-primary/15 bg-primary/5 p-3"
            >
              {rec.title && rec.title !== "Get started" ? (
                <p className="mb-1 text-xs font-medium text-primary">
                  {rec.title}
                </p>
              ) : null}
              <p className="text-sm text-muted-foreground">"{rec.message}"</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
