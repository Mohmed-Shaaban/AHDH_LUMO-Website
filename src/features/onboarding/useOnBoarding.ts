import {
  getOnboardingQuestions,
  getOnboardingState,
  resetOnboarding,
  saveOnboardingAnswer,
  submitOnboarding,
} from "@/services/onboarding/onboarding.api";
import type {
  OnboardingAnswerPayload,
  OnboardingQuestions,
  OnboardingState,
  OnboardingSubmitPayload,
} from "@/types/onboarding.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ONBOARDING_STATE_KEY = ["onboarding", "state"] as const;
export const ONBOARDING_QUESTIONS_KEY = ["onboarding", "questions"] as const;

/** Static 25-question catalog. Cached for the session. */
export const useOnboardingQuestions = () => {
  return useQuery<OnboardingQuestions>({
    queryKey: ONBOARDING_QUESTIONS_KEY,
    queryFn: getOnboardingQuestions,
    staleTime: Infinity, // catalog is truly static
    gcTime: Infinity,
    retry: 1,
  });
};

/** Current progress / scores. */
export const useOnboardingState = () => {
  return useQuery<OnboardingState>({
    queryKey: ONBOARDING_STATE_KEY,
    queryFn: getOnboardingState,
    staleTime: 0, // always fresh on mount
    retry: 1,
  });
};

/** POST /onboarding/answer — save (or overwrite) one answer. */
export const useSaveOnboardingAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation<OnboardingState, Error, OnboardingAnswerPayload>({
    mutationFn: saveOnboardingAnswer,
    onSuccess: (newState) => {
      queryClient.setQueryData(ONBOARDING_STATE_KEY, newState);
    },
  });
};

/** POST /onboarding/submit — finalise (empty body or bulk). */
export const useSubmitOnboarding = () => {
  const queryClient = useQueryClient();
  return useMutation<OnboardingState, Error, OnboardingSubmitPayload | void>({
    mutationFn: (payload) => submitOnboarding(payload ?? {}),
    onSuccess: (newState) => {
      queryClient.setQueryData(ONBOARDING_STATE_KEY, newState);
    },
  });
};

/** POST /onboarding/reset — wipe answers, retake. */
export const useResetOnboarding = () => {
  const queryClient = useQueryClient();
  return useMutation<OnboardingState, Error, void>({
    mutationFn: () => resetOnboarding(),
    onSuccess: (newState) => {
      queryClient.setQueryData(ONBOARDING_STATE_KEY, newState);
    },
  });
};
