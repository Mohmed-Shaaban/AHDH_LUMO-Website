import type { OnboardingState } from "@/types/onboarding.types";
import axiosInstance from "../axiosInstance";
import type { ApiResponse } from "@/types";

export const getOnboardingState = async (): Promise<OnboardingState> => {
  const { data } = await axiosInstance.get<ApiResponse<OnboardingState>>("/onboarding/state");
  return data.data;
};

export const postOnboardingAnswer = async ({
  endpoint,
  body,
}: {
  endpoint: string;
  body: Record<string, unknown>;
}): Promise<OnboardingState> => {
  const { data } = await axiosInstance.post<ApiResponse<OnboardingState>>(
    `/onboarding/${endpoint}`,
    body
  );
  return data.data;
};