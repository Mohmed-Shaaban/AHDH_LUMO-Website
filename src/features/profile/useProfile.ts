import { deleteProfilePicture, getProfile, updateProfile, uploadProfilePicture } from "@/services/profile/profile.api";
import type { UserProfile } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

 
/** Fetch the current user's profile */
export const accountKeys = {
  profile: ["account", "profile"] as const,
};

export const useProfile = () =>
  useQuery({
    queryKey: accountKeys.profile,
    queryFn: getProfile,
  });
 
/** Update profile fields (name, about, preferences) */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      // Immediately reflect changes without a refetch
      queryClient.setQueryData<UserProfile>(accountKeys.profile, updatedUser);
    },
  });
};
 
/** Upload a new profile picture */
export const useUploadProfilePicture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadProfilePicture,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<UserProfile>(accountKeys.profile, updatedUser);
    },
  });
};
 
/** Delete the current profile picture and revert to default */
export const useDeleteProfilePicture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProfilePicture,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<UserProfile>(accountKeys.profile, updatedUser);
    },
  });
};