

import type { ApiEnvelope } from "@/types/progress.types";
import axiosInstance from "../axiosInstance";
import type { AssistantChatPayload, AssistantChatResponse, CbtMessage, CbtMessageResponse, CbtSession, TaskSplitPayload, TaskSplitResponse } from "@/types/ai.types";

export const postAssistantChat = async (payload: AssistantChatPayload) => {
  const { data } = await axiosInstance.post<ApiEnvelope<AssistantChatResponse>>(
    '/assistant/chat',
    payload,
  );
  return data.data;
};

export const postTaskSplit = async (payload: TaskSplitPayload) => {
  const { data } = await axiosInstance.post<ApiEnvelope<TaskSplitResponse>>(
    '/task-splitter/split',
    payload,
  );
  return data.data;
};

export const postCbtSessionStart = async (moodBefore?: number) => {
  const { data } = await axiosInstance.post<ApiEnvelope<CbtSession>>(
    '/cbt/sessions',
    moodBefore !== undefined ? { moodBefore } : {},
  );
  return data.data;
};

export const postCbtMessage = async (sessionId: string, message: string) => {
  const { data } = await axiosInstance.post<ApiEnvelope<CbtMessageResponse>>(
    '/cbt/sessions/message',
    { sessionId, message },
  );
  return data.data;
};

export const getCbtMessages = async (sessionId: string) => {
  const { data } = await axiosInstance.get<ApiEnvelope<CbtMessage[]>>(
    `/cbt/sessions/${sessionId}/messages`,
  );
  return data.data;
};

export const patchCbtEnd = async (sessionId: string, moodAfter?: number) => {
  const { data } = await axiosInstance.patch<ApiEnvelope<CbtSession>>(
    `/cbt/sessions/${sessionId}/end`,
    moodAfter !== undefined ? { moodAfter } : {},
  );
  return data.data;
};