import axiosInstance  from "../axiosInstance"
import type { ApiResponse, CreateTaskPayload, Task, UpdateTaskPayload } from "@/types";

function unwrap<T>(promise: Promise<{ data: ApiResponse<T> }>): Promise<ApiResponse<T>> {
  return promise.then((res) => res.data);
}

/**
 * Response shape for PATCH /tasks/:id/complete.
 * Backend commit 07d1bed: response now includes `promptMood`, `true` iff the
 * user hasn't logged a mood in the last 30 minutes.
 */
export interface MarkTaskCompleteResponse {
  task: Task;
  promptMood: boolean;
}

// ── Tasks ──────────────────────────────────────────────────────────────────

export const taskApi = {
  getBySection: (sectionId: number): Promise<ApiResponse<Task[]>> =>
    unwrap(axiosInstance.get(`/tasks`, { params: { sectionId } })),

  create: (payload: CreateTaskPayload): Promise<ApiResponse<Task>> =>
    unwrap(axiosInstance.post(`/tasks`, payload)),

  update: ({ id, ...payload }: UpdateTaskPayload): Promise<ApiResponse<Task>> =>
    unwrap(axiosInstance.patch(`/tasks/${id}`, payload)),

  markComplete: (id: number): Promise<ApiResponse<MarkTaskCompleteResponse>> =>
    unwrap(axiosInstance.patch(`/tasks/${id}/complete`)),

  markIncomplete: (id: number): Promise<ApiResponse<Task>> =>
    unwrap(axiosInstance.patch(`/tasks/${id}/incomplete`)),

  delete: (id: number): Promise<ApiResponse<void>> =>
    unwrap(axiosInstance.delete(`/tasks/${id}`)),
};