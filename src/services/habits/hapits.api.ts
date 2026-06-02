import type { ApiResponse, CheckHabitPayload, CheckHabitResponse, CreateHabitPayload, DailySummary, Habit, HabitStats, HabitStreak, HabitWithProgress, StopTimerPayload, TimerStartResponse, TimerStopResponse, UncheckHabitResponse, UpdateHabitPayload, WeeklyOverviewResponse } from "@/types";
import axiosInstance from "../axiosInstance";

export const getHabits = async (page = 1, limit = 20) => {
  const { data } = await axiosInstance.get<ApiResponse<Habit[]>>(
    `/habits?page=${page}&limit=${limit}`
  );
  return data;
};

export const getHabitById = async (id: number) => {
  const { data } = await axiosInstance.get<ApiResponse<Habit>>(`/habits/${id}`);
  return data;
};

export const getTodayHabits = async () => {
  const { data } = await axiosInstance.get<ApiResponse<HabitWithProgress[]>>(
    "/habits/today"
  );
  return data;
};

export const getWeeklyOverview = async () => {
  const { data } =
    await axiosInstance.get<ApiResponse<WeeklyOverviewResponse>>("/habits/weekly");
  return data;
};

export const getStreaks = async () => {
  const { data } = await axiosInstance.get<ApiResponse<HabitStreak[]>>("/habits/streaks");
  return data;
};

export const getDailySummary = async (date?: string) => {
  const url = date
    ? `/habits/analytics/daily-summary?date=${date}`
    : "/habits/analytics/daily-summary";
  const { data } = await axiosInstance.get<ApiResponse<DailySummary>>(url);
  return data;
};

export const getHabitStats = async (id: number) => {
  const { data } = await axiosInstance.get<ApiResponse<HabitStats>>(`/habits/${id}/stats`);
  return data;
};

export const createHabit = async (payload: CreateHabitPayload) => {
  const { data } = await axiosInstance.post<ApiResponse<Habit>>("/habits", payload);
  return data;
};

export const updateHabit = async ({ id, ...payload }: UpdateHabitPayload) => {
  const { data } = await axiosInstance.patch<ApiResponse<Habit>>(`/habits/${id}`, payload);
  return data;
};

export const deleteHabit = async (id: number) => {
  const { data } = await axiosInstance.delete<ApiResponse<{ deleted: boolean; id: number }>>(
    `/habits/${id}`
  );
  return data;
};

export const checkHabit = async (id: number, payload?: CheckHabitPayload) => {
  const { data } = await axiosInstance.post<ApiResponse<CheckHabitResponse>>(
    `/habits/${id}/check`,
    payload
  );
  return data;
};

export const uncheckHabit = async (id: number) => {
  const { data } = await axiosInstance.post<ApiResponse<UncheckHabitResponse>>(
    `/habits/${id}/uncheck`
  );
  return data;
};

export const startTimer = async (id: number) => {
  const { data } = await axiosInstance.post<ApiResponse<TimerStartResponse>>(
    `/habits/${id}/timer/start`
  );
  return data;
};

export const stopTimer = async (id: number, payload?: StopTimerPayload) => {
  const { data } = await axiosInstance.post<ApiResponse<TimerStopResponse>>(
    `/habits/${id}/timer/stop`,
    payload
  );
  return data;
};