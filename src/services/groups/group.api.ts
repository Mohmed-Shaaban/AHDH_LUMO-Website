
import type { ApiResponse, CreateGroupPayload, Group, GroupActivity, GroupMember, PostActivityPayload, RegenerateCodeResponse, UpdateGroupPayload } from "@/types";
import axiosInstance from "../axiosInstance";

export const getGroups = () =>
  axiosInstance
    .get<ApiResponse<Group>>(`/groups`)
    .then((r) => r.data);

export const getMyGroups = () =>
  axiosInstance
    .get<ApiResponse<Group>>(`/groups/mine`)
    .then((r) => r.data);

export const getGroup = (id: number) =>
  axiosInstance
    .get<ApiResponse<Group>>(`/groups/${id}`)
    .then((r) => r.data);

export const createGroup = (payload: CreateGroupPayload) =>
  axiosInstance
    .post<ApiResponse<Group>>(`/groups`, payload)
    .then((r) => r.data);

export const joinGroup = (id: number) =>
  axiosInstance
    .post<ApiResponse<Group>>(`/groups/${id}/join`)
    .then((r) => r.data);

export const joinGroupByCode = (code: string) =>
  axiosInstance
    .post<ApiResponse<Group>>(`/groups/join-by-code`, { code })
    .then((r) => r.data);

export const getGroupMembers = (id: number) =>
  axiosInstance
    .get<ApiResponse<GroupMember>>(`/groups/${id}/members`)
    .then((r) => r.data);

export const getGroupActivity = (id: number) =>
  axiosInstance
    .get<ApiResponse<GroupActivity>>(`/groups/${id}/activity`)
    .then((r) => r.data);

export const postGroupActivity = (id: number, payload: PostActivityPayload) =>
  axiosInstance
    .post<ApiResponse<GroupActivity>>(`/groups/${id}/activity`, payload)
    .then((r) => r.data);

export const regenerateInviteCode = (id: number) =>
  axiosInstance
    .post<ApiResponse<RegenerateCodeResponse>>(`/groups/${id}/regenerate-code`)
    .then((r) => r.data);

export const updateGroup = (id: number, payload: UpdateGroupPayload) =>
  axiosInstance
    .patch<ApiResponse<Group>>(`/groups/${id}`, payload)
    .then((r) => r.data);
 
export const leaveGroup = (id: number) =>
  axiosInstance
    .post<ApiResponse<null>>(`/groups/${id}/leave`)
    .then((r) => r.data);
 
export const deleteGroup = (id: number) =>
  axiosInstance
    .delete<ApiResponse<null>>(`/groups/${id}`)
    .then((r) => r.data);
 
export const kickMember = (groupId: number, userId: number) =>
  axiosInstance
    .delete<ApiResponse<null>>(`/groups/${groupId}/members/${userId}`)
    .then((r) => r.data);