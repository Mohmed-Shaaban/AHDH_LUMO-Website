import React, { useState } from "react";
import type {
  LikertOption,
  OnboardingQuestion,
} from "@/types/onboarding.types";

interface LikertQuestionCardProps {
  question: OnboardingQuestion;
  categoryLabel: string;
  defaultValue?: number; // 0..4, if user already answered
  onSubmit: (value: number) => void;
  onBack?: () => void;
  isLoading: boolean;
  currentStep: number; // 1..25
  totalSteps: number; // 25
}

/**
 * Renders one of the 25 ADHD self-assessment questions with a 5-button
 * Likert scale (Never..Always). Local `selected` state so the user can
 * pick a value before we POST /onboarding/answer.
 */
export const LikertQuestionCard: React.FC<LikertQuestionCardProps> = ({
  question,
  categoryLabel,
  defaultValue,
  onSubmit,
  onBack,
  isLoading,
  currentStep,
  totalSteps,
}) => {
  // NOTE: this component is remounted per-question by parent via `key={question.id}`,
  // so this initializer runs fresh on every question change. Don't add a
  // useEffect-based sync here — it trips the react-hooks/set-state-in-effect rule.
  const [selected, setSelected] = useState<number | null>(defaultValue ?? null);

  return (
    <div className="flex flex-col">
      {/* Header row: back button + step counter */}
      <div className="flex items-center justify-between mb-4">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors -ml-1"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <span className="w-8 h-8" aria-hidden />
        )}
        <span className="text-xs font-medium text-gray-500">
          {currentStep} / {totalSteps}
        </span>
      </div>

      {/* Category chip */}
      <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-violet-600 text-center mb-2">
        {categoryLabel}
      </p>

      {/* Question */}
      <h1 className="text-lg font-bold text-gray-900 text-center leading-snug mb-1">
        {question.text}
      </h1>
      <p className="text-xs text-gray-400 text-center mb-5">
        How often does this apply to you?
      </p>

      {/* 5 Likert buttons */}
      <div className="flex flex-col gap-2.5 mb-6">
        {question.options.map((opt: LikertOption) => {
          const isSelected = selected === opt.points;
          return (
            <button
              key={opt.points}
              type="button"
              onClick={() => setSelected(opt.points)}
              aria-pressed={isSelected}
              className={[
                "w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-[1.5px] text-left transition-all duration-150 cursor-pointer",
                isSelected
                  ? "border-violet-600 bg-violet-50 shadow-[0_0_0_3px_rgba(124,58,237,0.12)]"
                  : "border-gray-200 bg-gray-50 hover:border-violet-300 hover:bg-violet-50/50",
              ].join(" ")}
            >
              <span
                className={`text-[0.9375rem] font-medium ${
                  isSelected ? "text-violet-800" : "text-gray-900"
                }`}
              >
                {opt.text}
              </span>
              <span
                className={`text-[0.75rem] font-semibold tabular-nums ${
                  isSelected ? "text-violet-600" : "text-gray-400"
                }`}
              >
                {opt.points}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => selected !== null && onSubmit(selected)}
        disabled={selected === null || isLoading}
        className="w-full py-4 bg-gray-900 text-white text-base font-semibold rounded-xl transition-all duration-150 hover:bg-gray-800 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isLoading
          ? "Saving…"
          : currentStep === totalSteps
            ? "Finish"
            : "Continue"}
      </button>
    </div>
  );
};
