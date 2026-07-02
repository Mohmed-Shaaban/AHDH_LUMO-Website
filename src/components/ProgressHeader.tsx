// src/features/progress/components/ProgressHeader.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { useProgressGreeting } from "@/features/progress/useProgress";
// import { useProgressGreeting } from "../hooks";

interface ProgressHeaderProps {
  activeTab: "quick" | "deep";
  onTabChange: (tab: "quick" | "deep") => void;
}

export function ProgressHeader({ activeTab, onTabChange }: ProgressHeaderProps) {
  const { data, isLoading } = useProgressGreeting();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="mt-2 h-4 w-80" />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold tracking-tight">
              {data?.greeting ?? "Good morning"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {data?.insight}
            </p>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onTabChange("quick")}
          className={
            activeTab === "quick"
              ? "rounded-full bg-[#9575CD] px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm"
              : "rounded-full border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
          }
        >
          Quick Insights
        </button>
        <button
          onClick={() => onTabChange("deep")}
          className={
            activeTab === "deep"
              ? "rounded-full bg-[#9575CD] px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm"
              : "rounded-full border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
          }
        >
          Deep Insights
        </button>
      </div>
    </div>
  );
}
