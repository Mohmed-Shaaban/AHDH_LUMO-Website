import { getOnboardingState, postOnboardingAnswer } from "@/services/onboarding/onboarding.api";
import type { OnboardingState } from "@/types/onboarding.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ONBOARDING_QUERY_KEY = ["onboarding", "state"] as const;

export const useOnboardingState = () => {
  return useQuery<OnboardingState>({
    queryKey: ONBOARDING_QUERY_KEY,
    queryFn: getOnboardingState,
    staleTime: 0, // always fresh on mount
    retry: 1,
  });
};

/**
 * Posts a single question's answer to POST /onboarding/qN.
 * On success, updates the cached state so the UI can advance.
 */
export const useSubmitAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation<
    OnboardingState,
    Error,
    { endpoint: string; body: Record<string, unknown> }
  >({
    mutationFn: postOnboardingAnswer,
    onSuccess: (newState) => {
      // Update cache with the fresh state returned by the API
      queryClient.setQueryData(ONBOARDING_QUERY_KEY, newState);
    },
  });
};
