import { taskApi } from "@/services/tasks/tasks.api";
import type { CreateTaskPayload, UpdateTaskPayload } from "@/types";
import { useMoodPromptStore } from "@/providers/context/moodPromptStore";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// ── Query Keys ─────────────────────────────────────────────────────────────

export const taskKeys = {
  all: ["tasks"] as const,
  bySection: (sectionId: number) => ["tasks", "section", sectionId] as const,
};

// ── Queries ────────────────────────────────────────────────────────────────

export function useTasksBySection(sectionId: number) {
  return useQuery({
    queryKey: taskKeys.bySection(sectionId),
    queryFn: () => taskApi.getBySection(sectionId),
    select: (res) => res.data,
  });
}

// ── Mutations ──────────────────────────────────────────────────────────────

export function useCreateTask(sectionId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => taskApi.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.bySection(sectionId) });
    },
  });
}

export function useUpdateTask(sectionId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateTaskPayload) => taskApi.update(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.bySection(sectionId) });
    },
  });
}

export function useMarkTaskComplete(sectionId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => taskApi.markComplete(id),
    onSuccess: (response) => {
      qc.invalidateQueries({ queryKey: taskKeys.bySection(sectionId) });
      // Backend commit 07d1bed: /tasks/:id/complete now returns
      // `{ task, promptMood }`. Open the mood picker when the server tells
      // us the user hasn't logged a mood recently.
      const { task, promptMood } = response.data;
      if (promptMood) {
        useMoodPromptStore.getState().openWith({
          source: 'task',
          taskId: task.id,
        });
      }
    },
  });
}

export function useMarkTaskIncomplete(sectionId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => taskApi.markIncomplete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.bySection(sectionId) });
    },
  });
}

export function useDeleteTask(sectionId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => taskApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.bySection(sectionId) });
    },
  });
}
