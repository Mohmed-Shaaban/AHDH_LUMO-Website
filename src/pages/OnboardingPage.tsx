import { OnboardingLayoutGradiant } from "@/components/layouts/OnboardingLayoutGradiant";
import { LikertQuestionCard } from "@/features/onboarding/LikertQuestionCard";
import { OnboardingResultCard } from "@/features/onboarding/OnboardingResultCard";
import {
  useOnboardingQuestions,
  useOnboardingState,
  useResetOnboarding,
  useSaveOnboardingAnswer,
  useSubmitOnboarding,
} from "@/features/onboarding/useOnBoarding";
import type {
  OnboardingQuestion,
  OnboardingQuestions,
  OnboardingState,
} from "@/types/onboarding.types";
import React, { useEffect, useMemo, useState } from "react";

interface OnboardingPageProps {
  onComplete?: () => void;
}

// ─── Full-screen loader / error views ─────────────────────────────────────────

const OnboardingScreen: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    className="min-h-dvh flex items-center justify-center px-4"
    style={{
      background:
        "radial-gradient(ellipse 80% 70% at 20% 110%, #7c3aed, #4c1d95), linear-gradient(135deg, #6d28d9, #c4a882)",
    }}
  >
    {children}
  </div>
);

const OnboardingLoader: React.FC = () => (
  <OnboardingScreen>
    <div className="w-10 h-10 rounded-full border-[3px] border-white/30 border-t-white animate-spin" />
  </OnboardingScreen>
);

const OnboardingError: React.FC<{ message?: string }> = ({ message }) => (
  <OnboardingScreen>
    <p className="text-white text-base text-center max-w-sm">
      {message ?? "Something went wrong loading your progress. Please refresh."}
    </p>
  </OnboardingScreen>
);

// ─── Inner flow — only mounts once catalog + state are loaded ─────────────────

interface OnboardingFlowProps {
  catalog: OnboardingQuestions;
  state: OnboardingState;
  onComplete?: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  catalog,
  state,
  onComplete,
}) => {
  const totalSteps = catalog.totalQuestions;
  const questions = catalog.questions;

  const categoryLabelById = useMemo(() => {
    const map: Record<string, string> = {};
    for (const c of catalog.categories) map[c.id] = c.label;
    return map;
  }, [catalog.categories]);

  const { mutate: saveAnswer, isPending: isSaving, error: saveError } =
    useSaveOnboardingAnswer();
  const { mutate: submitFinal, isPending: isSubmitting, error: submitError } =
    useSubmitOnboarding();
  const { mutate: reset, isPending: isResetting } = useResetOnboarding();

  // Where to start: pick up wherever the backend left off (first unanswered),
  // clamped to the catalog length. Falls back to 1 for a fresh start.
  const initialIndex = useMemo(() => {
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (state.answers[String(q.id)] === undefined) return i;
    }
    return questions.length - 1;
  }, [questions, state.answers]);

  const [index, setIndex] = useState<number>(initialIndex);
  // Locally track answers written during this session so back-nav shows them
  // without waiting on a refetch. Seeded from backend state.
  const [localAnswers, setLocalAnswers] = useState<Record<number, number>>(
    () => {
      const seed: Record<number, number> = {};
      for (const [k, v] of Object.entries(state.answers)) {
        if (typeof v === "number") seed[Number(k)] = v;
      }
      return seed;
    }
  );
  // If the backend says we're done (either on entry or after final submit),
  // and we have a profile to show, render the result screen. The result screen
  // has its own CTA to leave onboarding — no auto-navigate here.
  const showResult =
    state.isCompleted && state.profile && state.categoryScores;

  const question: OnboardingQuestion | undefined = questions[index];

  const handleAnswer = (value: number) => {
    if (!question) return;
    const questionId = question.id;

    saveAnswer(
      { questionId, value },
      {
        onSuccess: () => {
          setLocalAnswers((prev) => ({ ...prev, [questionId]: value }));

          if (index < questions.length - 1) {
            setIndex(index + 1);
            return;
          }

          // Last question: finalise. Backend has all 25 saved answers already,
          // so we send an empty body. The result screen renders once state
          // refreshes with isCompleted + profile.
          submitFinal(undefined);
        },
      }
    );
  };

  const handleBack = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleRetake = () => {
    reset(undefined, {
      onSuccess: () => {
        setLocalAnswers({});
        setIndex(0);
      },
    });
  };

  // ─── Result screen ──────────────────────────────────────────────────────────
  if (showResult && state.profile && state.categoryScores) {
    return (
      <OnboardingLayoutGradiant currentStep={totalSteps} totalSteps={totalSteps}>
        <OnboardingResultCard
          profile={state.profile}
          categoryScores={state.categoryScores}
          categories={catalog.categories}
          totalPercent={state.totalPercent ?? 0}
          onContinue={() => onComplete?.()}
          onRetake={handleRetake}
          isResetting={isResetting}
        />
      </OnboardingLayoutGradiant>
    );
  }

  // ─── Question screen ────────────────────────────────────────────────────────
  if (!question) {
    // Defensive: catalog was empty. Should never hit in prod.
    return <OnboardingError message="Assessment unavailable. Please refresh." />;
  }

  const stepNumber = index + 1;
  const defaultValue = localAnswers[question.id];
  const err = (saveError ?? submitError) as Error | null;
  const isBusy = isSaving || isSubmitting;

  return (
    <OnboardingLayoutGradiant currentStep={stepNumber} totalSteps={totalSteps}>
      {err && (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-xl mb-4 text-center"
        >
          {err.message || "Failed to save. Please try again."}
        </div>
      )}
      <LikertQuestionCard
        // Remount per question so the local `selected` state resets cleanly.
        key={question.id}
        question={question}
        categoryLabel={categoryLabelById[question.category] ?? question.category}
        defaultValue={defaultValue}
        onSubmit={handleAnswer}
        onBack={index > 0 ? handleBack : undefined}
        isLoading={isBusy}
        currentStep={stepNumber}
        totalSteps={totalSteps}
      />
    </OnboardingLayoutGradiant>
  );
};

// ─── Outer component — handles loading / error / already-completed ────────────

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete }) => {
  const {
    data: catalog,
    isLoading: catalogLoading,
    isError: catalogError,
  } = useOnboardingQuestions();
  const {
    data: state,
    isLoading: stateLoading,
    isError: stateError,
  } = useOnboardingState();

  // If the user was already completed BEFORE they landed on this page (not the
  // fresh-finish path), skip the result screen and forward to the app.
  useEffect(() => {
    if (state?.isCompleted && !state.profile) {
      // Edge case: completed but backend didn't return profile data. Just leave.
      onComplete?.();
    }
  }, [state, onComplete]);

  if (catalogLoading || stateLoading) return <OnboardingLoader />;
  if (catalogError || stateError || !catalog || !state) return <OnboardingError />;

  return (
    <OnboardingFlow catalog={catalog} state={state} onComplete={onComplete} />
  );
};
