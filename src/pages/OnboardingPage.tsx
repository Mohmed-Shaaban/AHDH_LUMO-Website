
import { OnboardingLayoutGradiant } from "@/components/layouts/OnboardingLayoutGradiant";
import { MultiSelect } from "@/components/MultiSelect";
import { SingleSelect } from "@/components/SingleSelect";
import { useOnboardingState, useSubmitAnswer } from "@/features/onboarding/useOnBoarding";
import type { OnboardingAnswers, OnboardingState } from "@/types/onboarding.types";
import { ONBOARDING_QUESTIONS, TOTAL_STEPS } from "@/utils/constants";
import React, { useEffect, useState } from "react";

interface OnboardingPageProps {
  onComplete?: () => void;
}

// ─── Inner component — only mounts after state is loaded ──────────────────────
// initialStep is passed as a prop so useState initializes correctly (not stale)

interface OnboardingFlowProps {
  initialStep: number;
  state: OnboardingState;
  onComplete?: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  initialStep,
  state,
  onComplete,
}) => {
  // Temporarily in OnboardingPage, just above the initialStep line:
console.log("Onboarding state:", state);
console.log("initialStep will be:", Math.min(state.currentStep + 1, TOTAL_STEPS));
  const { mutate: submitAnswer, isPending: isSubmitting, error: submitError } = useSubmitAnswer();
  const [localStep, setLocalStep] = useState<number>(initialStep);

  const question = ONBOARDING_QUESTIONS.find((q) => q.step === localStep);
  if (!question) return null;

  const answers = state.answers ?? ({} as Partial<OnboardingAnswers>);

  const handleSubmit = (value: string | string[]) => {
    const body = { [question.bodyKey]: value };
    submitAnswer(
      { endpoint: question.endpoint, body },
      {
        onSuccess: (newState) => {
          if (newState.isCompleted) {
            onComplete?.();
          } else {
            setLocalStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
          }
        },
      }
    );
  };

  const handleBack = () => {
    setLocalStep((prev) => Math.max(prev - 1, 1));
  };

  const renderQuestion = () => {
    const sharedProps = {
      question,
      isLoading: isSubmitting,
      onBack: localStep > 1 ? handleBack : undefined,
    };

    if (question.type === "multi") {
      const defaultValues = answers[question.fieldName] as string[] | undefined;
      return (
        <MultiSelect
          {...sharedProps}
          defaultValues={defaultValues}
          onSubmit={(values) => handleSubmit(values)}
        />
      );
    }

    const defaultValue = answers[question.fieldName] as string | undefined;
    return (
      <SingleSelect
        {...sharedProps}
        defaultValue={defaultValue}
        onSubmit={(value) => handleSubmit(value)}
      />
    );
  };

  return (
    <OnboardingLayoutGradiant currentStep={localStep} totalSteps={TOTAL_STEPS}>
      {submitError && (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-xl mb-4 text-center"
        >
          {(submitError as Error).message || "Failed to save. Please try again."}
        </div>
      )}
      {renderQuestion()}
    </OnboardingLayoutGradiant>
  );
};

// ─── Outer component — handles loading / error / completion ──────────────────

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete }) => {
  const { data: state, isLoading: stateLoading, isError } = useOnboardingState();

  // Completion check — runs only when isCompleted flips, no setState called
  useEffect(() => {
    if (state?.isCompleted) {
      onComplete?.();
    }
  }, [state?.isCompleted]); // eslint-disable-line react-hooks/exhaustive-deps

  if (stateLoading) {
    return (
      <div
        className="min-h-dvh flex items-center justify-center"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 20% 110%, #7c3aed, #4c1d95), linear-gradient(135deg, #6d28d9, #c4a882)",
        }}
      >
        <div className="w-10 h-10 rounded-full border-[3px] border-white/30 border-t-white animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-6">
        <p className="text-white text-base text-center">
          Something went wrong loading your progress. Please refresh.
        </p>
      </div>
    );
  }

  if (!state) return null;

  // Safe to derive here — state is guaranteed loaded, no effect needed
  const initialStep = Math.min(state.currentStep + 1, TOTAL_STEPS);

  return (
    <OnboardingFlow
      key={initialStep}    // if the user resets onboarding, this remounts cleanly
      initialStep={initialStep}
      state={state}
      onComplete={onComplete}
    />
  );
};