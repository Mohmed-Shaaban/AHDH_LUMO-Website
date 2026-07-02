

import type {
  ApiEnvelope,
  ProgressOverview,
  ProgressGreeting,
  WeeklyTrends,
  WeeklyOverview,
  CategoryBreakdown,
  AiRecommendations,
} from "@/types/progress.types";
import axiosInstance from "../axiosInstance";

export const progressApi = {
  getOverview: async (): Promise<ProgressOverview> => {
    const { data } = await axiosInstance.get<ApiEnvelope<ProgressOverview>>(
      "/progress/overview"
    );
    return data.data;
  },

  getGreeting: async (): Promise<ProgressGreeting> => {
    const { data } = await axiosInstance.get<ApiEnvelope<ProgressGreeting>>(
      "/progress/greeting"
    );
    return data.data;
  },

  getWeeklyTrends: async (days = 7): Promise<WeeklyTrends> => {
    const { data } = await axiosInstance.get<ApiEnvelope<WeeklyTrends>>(
      "/progress/weekly-trends",
      { params: { days } }
    );
    return data.data;
  },

  getWeeklyOverview: async (weeks = 4): Promise<WeeklyOverview> => {
    const { data } = await axiosInstance.get<ApiEnvelope<WeeklyOverview>>(
      "/progress/weekly-overview",
      { params: { weeks } }
    );
    return data.data;
  },

  getCategoryBreakdown: async (): Promise<CategoryBreakdown> => {
    const { data } = await axiosInstance.get<ApiEnvelope<CategoryBreakdown>>(
      "/progress/category-breakdown"
    );
    return data.data;
  },

  getAiRecommendations: async (): Promise<AiRecommendations> => {
    const { data } = await axiosInstance.get<ApiEnvelope<AiRecommendations>>(
      "/progress/ai-recommendations"
    );
    return data.data;
  },
};
