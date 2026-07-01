import React, { useState } from "react";
import type { QuestionConfig } from "@/types/onboarding.types";
import { OptionButton } from "./OptionButton";

interface MultiSelectProps {
  question: QuestionConfig;
  defaultValues?: string[];
  onSubmit: (values: string[]) => void;
  isLoading: boolean;
  onBack?: () => void;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  question,
  defaultValues,
  onSubmit,
  isLoading,
  onBack,
}) => {
  const [selected, setSelected] = useState<string[]>(defaultValues ?? []);

  const handleSelect = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

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
      <p className="text-sm text-gray-500 text-center leading-relaxed mb-1">
        {question.subtitle}
      </p>
      <p className="text-xs text-gray-400 text-center mb-5">
        Select all that apply
      </p>

      <div className="flex flex-col gap-2.5 mb-6">
        {question.options.map((opt) => (
          <OptionButton
            key={opt.value}
            option={opt}
            selected={selected.includes(opt.value)}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => selected.length > 0 && onSubmit(selected)}
        disabled={selected.length === 0 || isLoading}
        className="w-full py-4 bg-gray-900 text-white text-base font-semibold rounded-xl transition-all duration-150 hover:bg-gray-800 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isLoading ? "Saving…" : "Continue"}
      </button>
    </div>
  );
};
