// ─── Onboarding types — 25-question ADHD self-assessment ──────────────────────
// Contract: LUMO-backend commit 56a4bff (see docs/from-backend/ai-endpoints-handoff.md §5)

export type OnboardingCategory =
  | "inattention"
  | "hyperactivity"
  | "impulsivity"
  | "cognitive"
  | "emotional"
  | "somatic";

export type OnboardingSeverity = "minimal" | "mild" | "moderate" | "severe";

export type AdhdType = "inattentive" | "hyperactive" | "combined";

/**
 * One of the 5 fixed Likert options attached to every question by the backend.
 * `points` is the value we POST — 0..4.
 */
export interface LikertOption {
  text: string;
  points: 0 | 1 | 2 | 3 | 4;
}

export interface OnboardingCategoryInfo {
  id: OnboardingCategory;
  label: string;
  maxScore: number;
}

export interface OnboardingQuestion {
  id: number; // 1..25
  originalTestNumber: number;
  text: string;
  category: OnboardingCategory;
  options: LikertOption[]; // always 5 items, Never..Always
}

/** Static catalog from GET /onboarding/questions. */
export interface OnboardingQuestions {
  totalQuestions: number; // 25
  totalMaxScore: number; // 100
  categories: OnboardingCategoryInfo[];
  questions: OnboardingQuestion[];
}

/** Answers saved so far, keyed by questionId (1..25) → value (0..4). */
export type OnboardingAnswers = Partial<Record<string, number>>;

export interface OnboardingProfile {
  severity: OnboardingSeverity;
  adhdType: AdhdType;
  topChallenges: OnboardingCategory[]; // top 2 by percent-of-max
}

export type OnboardingCategoryScores = Partial<Record<OnboardingCategory, number>>;

/** GET /onboarding/state — progress before submit, plus scores after. */
export interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
  completedAt: string | null;
  answers: OnboardingAnswers;
  // Populated only once isCompleted === true.
  categoryScores?: OnboardingCategoryScores;
  totalScore?: number;
  totalPercent?: number;
  profile?: OnboardingProfile;
}

/** Body for POST /onboarding/answer. */
export interface OnboardingAnswerPayload {
  questionId: number; // 1..25
  value: number; // 0..4
}

/** Body for POST /onboarding/submit (bulk mode). */
export interface OnboardingSubmitPayload {
  answers?: OnboardingAnswerPayload[];
}
