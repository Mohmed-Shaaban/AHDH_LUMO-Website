import React from "react";
import type {
  OnboardingCategory,
  OnboardingCategoryInfo,
  OnboardingProfile,
  OnboardingSeverity,
} from "@/types/onboarding.types";

interface OnboardingResultCardProps {
  profile: OnboardingProfile;
  categoryScores: Partial<Record<OnboardingCategory, number>>;
  categories: OnboardingCategoryInfo[];
  totalPercent: number;
  onContinue: () => void;
  onRetake: () => void;
  isResetting: boolean;
}

const SEVERITY_LABEL: Record<OnboardingSeverity, string> = {
  minimal: "Minimal",
  mild: "Mild",
  moderate: "Moderate",
  severe: "Severe",
};

const SEVERITY_COPY: Record<OnboardingSeverity, string> = {
  minimal: "Your responses suggest minimal ADHD-related patterns.",
  mild: "Your responses suggest mild ADHD-related patterns.",
  moderate:
    "Your responses suggest moderate ADHD-related patterns. LUMO will adapt to help.",
  severe:
    "Your responses suggest strong ADHD-related patterns. We'll pace things gently for you.",
};

const ADHD_TYPE_LABEL: Record<OnboardingProfile["adhdType"], string> = {
  inattentive: "Predominantly Inattentive",
  hyperactive: "Predominantly Hyperactive-Impulsive",
  combined: "Combined Presentation",
};

/**
 * Result screen. Rendered when GET /onboarding/state returns
 * isCompleted === true — shows severity, ADHD type, and the top 2
 * category bars ("top challenges") computed by the backend.
 */
export const OnboardingResultCard: React.FC<OnboardingResultCardProps> = ({
  profile,
  categoryScores,
  categories,
  totalPercent,
  onContinue,
  onRetake,
  isResetting,
}) => {
  // Merge scores with catalog metadata so we can render label + percent bars.
  const rows = categories.map((cat) => {
    const raw = categoryScores[cat.id] ?? 0;
    const percent = cat.maxScore > 0 ? Math.round((raw / cat.maxScore) * 100) : 0;
    return { ...cat, raw, percent };
  });

  return (
    <div className="flex flex-col">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-violet-600 text-center mb-1">
        Your ADHD Profile
      </p>
      <h1 className="text-2xl font-bold text-gray-900 text-center leading-snug mb-1">
        {SEVERITY_LABEL[profile.severity]}
      </h1>
      <p className="text-sm text-gray-500 text-center leading-relaxed mb-5">
        {SEVERITY_COPY[profile.severity]}
      </p>

      {/* Two stat pills */}
      <div className="grid grid-cols-2 gap-2.5 mb-6">
        <div className="rounded-xl border border-violet-100 bg-violet-50/60 px-3 py-3 text-center">
          <p className="text-[0.6875rem] uppercase tracking-wide text-violet-700/70 mb-1">
            Type
          </p>
          <p className="text-sm font-semibold text-violet-900 leading-tight">
            {ADHD_TYPE_LABEL[profile.adhdType]}
          </p>
        </div>
        <div className="rounded-xl border border-violet-100 bg-violet-50/60 px-3 py-3 text-center">
          <p className="text-[0.6875rem] uppercase tracking-wide text-violet-700/70 mb-1">
            Overall
          </p>
          <p className="text-sm font-semibold text-violet-900 leading-tight">
            {totalPercent}
            <span className="text-xs font-medium text-violet-700/70"> / 100</span>
          </p>
        </div>
      </div>

      {/* Category bars */}
      <p className="text-xs font-semibold text-gray-700 mb-2">
        By category
      </p>
      <div className="flex flex-col gap-3 mb-6">
        {rows.map((r) => {
          const isTop = profile.topChallenges.includes(r.id);
          return (
            <div key={r.id}>
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-xs font-medium leading-tight ${
                    isTop ? "text-violet-800" : "text-gray-700"
                  }`}
                >
                  {r.label}
                  {isTop && (
                    <span className="ml-1.5 text-[0.625rem] font-semibold uppercase tracking-wide text-violet-600">
                      Focus area
                    </span>
                  )}
                </span>
                <span className="text-[0.6875rem] font-semibold text-gray-500 tabular-nums">
                  {r.percent}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isTop
                      ? "bg-violet-600"
                      : "bg-gray-400"
                  }`}
                  style={{ width: `${Math.max(r.percent, 3)}%` }}
                  role="progressbar"
                  aria-valuenow={r.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="w-full py-4 bg-gray-900 text-white text-base font-semibold rounded-xl transition-all duration-150 hover:bg-gray-800 active:scale-[0.99]"
      >
        Continue to LUMO
      </button>
      <button
        type="button"
        onClick={onRetake}
        disabled={isResetting}
        className="w-full py-3 mt-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors disabled:opacity-40"
      >
        {isResetting ? "Resetting…" : "Retake assessment"}
      </button>
    </div>
  );
};
