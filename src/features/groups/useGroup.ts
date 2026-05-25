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
  kickMember,
  deleteGroup,
  leaveGroup,
  updateGroup,
} from "@/services/groups/group.api";

import type {
  CreateGroupPayload,
  PostActivityPayload,
  UpdateGroupPayload,
} from "@/types";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const groupKeys = {
  all: ["groups"] as const,
  lists: () => [...groupKeys.all, "list"] as const,
  mine: () => [...groupKeys.all, "mine"] as const,
  detail: (id: number) => [...groupKeys.all, "detail", id] as const,
  members: (id: number) => [...groupKeys.all, "members", id] as const,
  activity: (id: number) => [...groupKeys.all, "activity", id] as const,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const invalidateGroupActivity = (
  qc: ReturnType<typeof useQueryClient>,
  groupId: number
) => {
  qc.invalidateQueries({
    queryKey: groupKeys.activity(groupId),
  });
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
      qc.invalidateQueries({ queryKey: groupKeys.mine() });

      // member_joined
      invalidateGroupActivity(qc, id);
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
      invalidateGroupActivity(qc, groupId);
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

export const useUpdateGroup = (id: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateGroupPayload) => updateGroup(id, payload),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: groupKeys.detail(id) });
      qc.invalidateQueries({ queryKey: groupKeys.lists() });
      qc.invalidateQueries({ queryKey: groupKeys.mine() });

      // group_updated
      invalidateGroupActivity(qc, id);
    },
  });
};

export const useLeaveGroup = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => leaveGroup(id),

    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: groupKeys.detail(id) });
      qc.invalidateQueries({ queryKey: groupKeys.lists() });
      qc.invalidateQueries({ queryKey: groupKeys.mine() });

      // member_left
      invalidateGroupActivity(qc, id);
    },
  });
};

export const useDeleteGroup = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteGroup(id),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: groupKeys.all });
    },
  });
};

export const useKickMember = (groupId: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => kickMember(groupId, userId),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: groupKeys.members(groupId) });
      qc.invalidateQueries({ queryKey: groupKeys.detail(groupId) });

      // member_left
      invalidateGroupActivity(qc, groupId);
    },
  });
};