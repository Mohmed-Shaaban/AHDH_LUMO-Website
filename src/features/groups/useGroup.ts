import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getGroups,
  getMyGroups,
  getGroup,
  getGroupMembers,
  getGroupActivity,
  createGroup,
  joinGroup,
  joinGroupByCode,
  postGroupActivity,
  regenerateInviteCode,
} from "@/services/groups/group.api"; 
import type { CreateGroupPayload, PostActivityPayload } from "@/types";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const groupKeys = {
  all: ["groups"] as const,
  lists: () => [...groupKeys.all, "list"] as const,
  mine: () => [...groupKeys.all, "mine"] as const,
  detail: (id: number) => [...groupKeys.all, "detail", id] as const,
  members: (id: number) => [...groupKeys.all, "members", id] as const,
  activity: (id: number) => [...groupKeys.all, "activity", id] as const,
};

// ─── Queries ──────────────────────────────────────────────────────────────────

export const useGroups = () =>
  useQuery({
    queryKey: groupKeys.lists(),
    queryFn: getGroups,
  });

export const useMyGroups = () =>
  useQuery({
    queryKey: groupKeys.mine(),
    queryFn: getMyGroups,
  });

export const useGroup = (id: number) =>
  useQuery({
    queryKey: groupKeys.detail(id),
    queryFn: () => getGroup(id),
    enabled: !!id,
  });

export const useGroupMembers = (id: number) =>
  useQuery({
    queryKey: groupKeys.members(id),
    queryFn: () => getGroupMembers(id),
    enabled: !!id,
  });

export const useGroupActivity = (id: number) =>
  useQuery({
    queryKey: groupKeys.activity(id),
    queryFn: () => getGroupActivity(id),
    enabled: !!id,
  });

// ─── Mutations ────────────────────────────────────────────────────────────────

export const useCreateGroup = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateGroupPayload) => createGroup(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: groupKeys.lists() });
      qc.invalidateQueries({ queryKey: groupKeys.mine() });
    },
  });
};

export const useJoinGroup = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => joinGroup(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: groupKeys.detail(id) });
      qc.invalidateQueries({ queryKey: groupKeys.lists() });
    },
  });
};

export const useJoinGroupByCode = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => joinGroupByCode(code),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: groupKeys.all });
    },
  });
};

export const usePostActivity = (groupId: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: PostActivityPayload) =>
      postGroupActivity(groupId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: groupKeys.activity(groupId) });
    },
  });
};

export const useRegenerateCode = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => regenerateInviteCode(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: groupKeys.detail(id) });
    },
  });
};