export interface Subtask {
  step: number;
  title: string;
  duration_min: number;
  tip: string;
  order: number;
}

export interface TaskSplitResponse {
  intent: 'task' | 'habit' | 'note' | 'unclear';
  title: string;
  language: 'ar' | 'en' | 'mixed';
  subtasks: Subtask[];
  reward: string;
  schedule_suggestion: string;
  adhd_note: string;
  saved_task_id: number;
  vector_store_unavailable?: boolean;
}

export interface TaskSplitPayload {
  message: string;
  language?: 'ar' | 'en' | 'mixed';
  energyLevel?: number;
  deadline?: string; // ISO, must be future
}

// ---- Unified assistant (chat + CBT trigger) ----
export interface ConversationTurn {
  role: 'user' | 'assistant';
  text: string;
}

export interface AssistantToolEnvelope {
  name: string;
  args: Record<string, unknown>;
  requires_confirmation: boolean;
  executed: boolean;
  result?: unknown;
  error?: { code: string; message: string };
}

export interface AssistantChatResponse {
  reply: string;
  tool?: AssistantToolEnvelope;
}

export interface AssistantChatPayload {
  message: string;
  conversation?: ConversationTurn[];
  context?: {
    route?: string;
    confirm_tool?: { name: string; args: Record<string, unknown> };
  };
}

// ---- CBT ----
export interface CbtSession {
  id: string;
  userId: number;
  status: 'active' | 'completed' | 'abandoned';
  stage: 1 | 2 | 3;
  moodBefore: number | null;
  moodAfter: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CbtMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface CbtMessageResponse {
  reply: string;
  sessionEnded: boolean;
}

// Shared response envelope from the backend interceptor
export interface ApiEnvelope<T> {
  status: boolean;
  message: string;
  data: T;
  meta: { timestamp: string; path: string };
}