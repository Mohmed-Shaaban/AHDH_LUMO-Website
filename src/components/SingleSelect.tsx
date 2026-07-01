import type { QuestionConfig } from "@/types/onboarding.types";
import React, { useState } from "react";
import { OptionButton } from "./OptionButton";


interface SingleSelectProps {
  question: QuestionConfig;
  defaultValue?: string;
  onSubmit: (value: string) => void;
  isLoading: boolean;
  onBack?: () => void;
}

export const SingleSelect: React.FC<SingleSelectProps> = ({
  question,
  defaultValue,
  onSubmit,
  isLoading,
  onBack,
}) => {
  const [selected, setSelected] = useState<string>(defaultValue ?? "");

  return (
    <div className="flex flex-col">
      {/* Back button */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors mb-4 -ml-1"
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
      )}

      <h1 className="text-xl font-bold text-gray-900 text-center leading-snug mb-2">
        {question.title}
      </h1>
      <p className="text-sm text-gray-500 text-center leading-relaxed mb-5">
        {question.subtitle}
      </p>

      <div className="flex flex-col gap-2.5 mb-6">
        {question.options.map((opt) => (
          <OptionButton
            key={opt.value}
            option={opt}
            selected={selected === opt.value}
            onSelect={setSelected}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => selected && onSubmit(selected)}
        disabled={!selected || isLoading}
        className="w-full py-4 bg-gray-900 text-white text-base font-semibold rounded-xl transition-all duration-150 hover:bg-gray-800 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isLoading ? "Saving…" : "Continue"}
      </button>
    </div>
  );
};
