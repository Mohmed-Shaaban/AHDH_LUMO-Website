import type { QuestionOption } from "@/types/onboarding.types";
import React from "react";

interface OptionButtonProps {
  option: QuestionOption;
  selected: boolean;
  onSelect: (value: string) => void;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  selected,
  onSelect,
}) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.value)}
      aria-pressed={selected}
      className={[
        "w-full flex flex-col items-center justify-center gap-0.5 px-4 py-3.5 rounded-xl border-[1.5px] text-center transition-all duration-150 cursor-pointer",
        selected
          ? "border-violet-600 bg-violet-50 shadow-[0_0_0_3px_rgba(124,58,237,0.12)]"
          : "border-gray-200 bg-gray-50 hover:border-violet-300 hover:bg-violet-50/50",
      ].join(" ")}
    >
      <span
        className={`text-[0.9375rem] font-medium leading-snug ${
          selected ? "text-violet-800" : "text-gray-900"
        }`}
      >
        {option.label}
      </span>
      {option.sublabel && (
        <span
          className={`text-[0.8125rem] font-normal ${
            selected ? "text-violet-600" : "text-gray-500"
          }`}
        >
          {option.sublabel}
        </span>
      )}
    </button>
  );
};
