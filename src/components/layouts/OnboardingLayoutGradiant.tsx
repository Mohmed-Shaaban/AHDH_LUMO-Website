import React from "react";

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
}

export const OnboardingLayoutGradiant: React.FC<OnboardingLayoutProps> = ({
  currentStep,
  totalSteps,
  children,
}) => {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div
      className="relative min-h-dvh flex items-center justify-center px-4 py-6 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 70% at 20% 110%, #7c3aed 0%, #5b21b6 35%, #4c1d95 60%, transparent 100%), radial-gradient(ellipse 60% 50% at 90% 0%, #e8d5b7 0%, #d4b896 40%, transparent 100%), linear-gradient(135deg, #6d28d9 0%, #7c3aed 40%, #c4a882 100%)",
      }}
    >
      {/* Centered card container */}
      <div className="relative z-10 w-full max-w-sm flex flex-col">
        {/* Progress bar */}
        <div
          className="w-full h-[5px] bg-white/30 rounded-full overflow-hidden mb-4"
          aria-label={`Step ${currentStep} of ${totalSteps}`}
        >
          <div
            className="h-full bg-white rounded-full transition-[width] duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
          />
        </div>

        {/* White card */}
        <div className="bg-white rounded-3xl px-6 py-8 shadow-2xl shadow-purple-900/20">
          {children}
        </div>
      </div>
    </div>
  );
};
