// ─── Onboarding API Types ───────────────────────────────────────────────────

export interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
  completedAt: string | null;
  answers: Partial<OnboardingAnswers>;
}

export interface OnboardingAnswers {
  occupation: Occupation;
  language: Language;
  learningStyle: LearningStyle;
  motivations: Motivation[];
  challenges: Challenge[];
  focusTimeOfDay: FocusTimeOfDay;
  primaryGoal: PrimaryGoal;
  adhdSeverity: AdhdSeverity;
  focusDuration: FocusDuration;
  adhdType: AdhdType;
}

// ─── Valid Values per endpoint ───────────────────────────────────────────────

export type Occupation =
  | "student"
  | "developer"
  | "doctor"
  | "designer"
  | "teacher"
  | "freelancer"
  | "parent"
  | "other";

export type Language = "arabic" | "english" | "mixed";

export type LearningStyle = "visual" | "auditory" | "kinesthetic" | "reading";

export type Motivation =
  | "points"
  | "streaks"
  | "praise"
  | "badges"
  | "visual_progress";

export type Challenge =
  | "procrastination"
  | "overwhelm"
  | "distraction"
  | "time_blindness"
  | "impulsivity"
  | "forgetfulness";

export type FocusTimeOfDay = "morning" | "afternoon" | "evening";

export type PrimaryGoal = "personal" | "occupation_specific" | "general";

export type AdhdSeverity = "mild" | "moderate" | "severe";

export type FocusDuration = "5-10" | "10-15" | "15-20" | "20-25" | "25-30";

export type AdhdType = "inattentive" | "hyperactive" | "combined";

// ─── Question Config Types ───────────────────────────────────────────────────

export type QuestionType = "single" | "multi";

export interface QuestionOption {
  value: string;
  label: string;
  sublabel?: string; // for Arabic subtitles
}

export interface QuestionConfig {
  step: number; // 1-based, matches q1..q10
  endpoint: string; // e.g. "q1"
  fieldName: keyof OnboardingAnswers;
  type: QuestionType;
  title: string;
  subtitle: string;
  options: QuestionOption[];
  bodyKey: string; // the key to POST e.g. "occupation"
}
