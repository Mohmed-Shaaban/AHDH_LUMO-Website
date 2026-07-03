import type { AssistantToolEnvelope, ConversationTurn } from '@/types/ai.types';
import { create } from 'zustand';

type AssistantMode = 'chat' | 'cbt';

export interface DisplayMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  tool?: AssistantToolEnvelope;
  createdAt: string; // ISO, stamped client-side on insert
}

const MAX_TURNS = 10;

interface AssistantState {
  isOpen: boolean;
  mode: AssistantMode;
  messages: DisplayMessage[];
  conversation: ConversationTurn[];
  pendingTool: AssistantToolEnvelope | null;
  cbtSessionId: string | null;
  cbtSessionEnded: boolean;

  open: () => void;
  close: () => void;
  toggle: () => void;

  addMessage: (msg: Omit<DisplayMessage, 'createdAt'>) => void;
  setPendingTool: (tool: AssistantToolEnvelope | null) => void;
  pushConversationTurn: (turn: ConversationTurn) => void;

  enterCbtMode: (sessionId: string) => void;
  endCbtSession: () => void;
  resetChat: () => void;
}

export const useAssistantStore = create<AssistantState>((set) => ({
  isOpen: false,
  mode: 'chat',
  messages: [],
  conversation: [],
  pendingTool: null,
  cbtSessionId: null,
  cbtSessionEnded: false,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),

  addMessage:  (msg) =>
    set((s) => ({
      messages: [...s.messages, { ...msg, createdAt: new Date().toISOString() }],
    })),
  setPendingTool: (tool) => set({ pendingTool: tool }),

  pushConversationTurn: (turn) =>
    set((s) => ({ conversation: [...s.conversation, turn].slice(-MAX_TURNS) })),

  enterCbtMode: (sessionId) =>
    set({ mode: 'cbt', cbtSessionId: sessionId, cbtSessionEnded: false }),

  endCbtSession: () => set({ cbtSessionEnded: true }),

  resetChat: () =>
    set({
      mode: 'chat',
      messages: [],
      conversation: [],
      pendingTool: null,
      cbtSessionId: null,
      cbtSessionEnded: false,
    }),
}));