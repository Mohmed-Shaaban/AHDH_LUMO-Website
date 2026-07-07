// src/features/progress/ProgressPage.tsx
import { AchievementCard } from "@/components/AchievementCard";
import { AiRecommendations } from "@/components/AiRecommendations";
import { BestActivityTimeChart } from "@/components/BestActivityTimeChart";
import { CategoryBreakdown } from "@/components/CategoryBreakdown";
import { ConsistencyTrendChart } from "@/components/ConsistencyTrendChart";
import { DeepInsightsSidebar } from "@/components/DeepInsightsSidebar";
import { ProgressHeader } from "@/components/ProgressHeader";
import { ProgressStatCards } from "@/components/ProgressStatCards";
import { WeeklyGoalRadialCard } from "@/components/WeeklyGoalRadialCard";
import { WeeklyOverviewHeatmap } from "@/components/WeeklyOverviewHeatmap";
import { WeeklyTrendsChart } from "@/components/WeeklyTrendsChart";
import { MoodTrendCard } from "@/features/moods/MoodTrendCard";
import { useState } from "react";

 function Overview() {
  const [tab, setTab] = useState<"quick" | "deep">("quick");

  return (
    <div className="">
      <ProgressHeader activeTab={tab} onTabChange={setTab} />

      {tab === "quick" ? (
        <div className="space-y-6">
          <ProgressStatCards />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <WeeklyTrendsChart />
            </div>
            <WeeklyOverviewHeatmap />
          </div>

          <MoodTrendCard />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CategoryBreakdown />
            <AiRecommendations />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <BestActivityTimeChart />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <ConsistencyTrendChart />
              </div>
              <WeeklyGoalRadialCard />
            </div>
          </div>
          <div className="space-y-6">
            <DeepInsightsSidebar />
            <AchievementCard />
          </div>
        </div>
      )}
    </div>
  );
}

export default Overview