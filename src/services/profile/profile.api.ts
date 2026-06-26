// ─── API calls ────────────────────────────────────────────────────────────────

import type { ApiResponse, UpdateProfilePayload, UserProfile } from "@/types";
import axiosInstance from "../axiosInstance";

 
export const getProfile = async (): Promise<UserProfile> => {
  const { data } = await axiosInstance.get<ApiResponse<UserProfile>>("/users/me");
  return data.data;
};
 
export const updateProfile = async (
  payload: UpdateProfilePayload
): Promise<UserProfile> => {
  const { data } = await axiosInstance.patch<ApiResponse<UserProfile>>(
    "/users/me",
    payload
  );
  return data.data;
};
 
export const uploadProfilePicture = async (file: File): Promise<UserProfile> => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await axiosInstance.post<ApiResponse<UserProfile>>(
    "/users/me/profile-picture",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data.data;
};
 
export const deleteProfilePicture = async (): Promise<UserProfile> => {
  const { data } = await axiosInstance.delete<ApiResponse<UserProfile>>(
    "/users/me/profile-picture"
  );
  return data.data;
};
 