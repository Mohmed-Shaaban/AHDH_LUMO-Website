import axiosInstance from "../axiosInstance";
import type { ApiResponse } from "@/types";
import type {
  OnboardingAnswerPayload,
  OnboardingQuestions,
  OnboardingState,
  OnboardingSubmitPayload,
} from "@/types/onboarding.types";

/** GET /onboarding/questions — static 25-question catalog. */
export const getOnboardingQuestions = async (): Promise<OnboardingQuestions> => {
  const { data } = await axiosInstance.get<ApiResponse<OnboardingQuestions>>(
    "/onboarding/questions"
  );
  return data.data;
};

/** GET /onboarding/state — progress + scores (once submitted). */
export const getOnboardingState = async (): Promise<OnboardingState> => {
  const { data } = await axiosInstance.get<ApiResponse<OnboardingState>>(
    "/onboarding/state"
  );
  return data.data;
};

/** POST /onboarding/answer — save/overwrite one answer. Idempotent. */
export const saveOnboardingAnswer = async (
  payload: OnboardingAnswerPayload
): Promise<OnboardingState> => {
  const { data } = await axiosInstance.post<ApiResponse<OnboardingState>>(
    "/onboarding/answer",
    payload
  );
  return data.data;
};

/**
 * POST /onboarding/submit — finalise.
 * Empty body = finalise whatever the backend already has.
 * Bulk mode = send all 25 at once.
 * 400 if any of the 25 ids missing.
 */
export const submitOnboarding = async (
  payload: OnboardingSubmitPayload = {}
): Promise<OnboardingState> => {
  const { data } = await axiosInstance.post<ApiResponse<OnboardingState>>(
    "/onboarding/submit",
    payload
  );
  return data.data;
};

/** POST /onboarding/reset — wipe answers, step, completedAt. */
export const resetOnboarding = async (): Promise<OnboardingState> => {
  const { data } = await axiosInstance.post<ApiResponse<OnboardingState>>(
    "/onboarding/reset",
    {}
  );
  return data.data;
};
