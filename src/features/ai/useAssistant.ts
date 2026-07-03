import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useAssistantStore } from '@/providers/context/assistantStore';
import { postAssistantChat, postCbtMessage, postCbtSessionStart } from '@/services/ai/ai.api';


const handleAiError = (err: unknown) => {
  const status = (err as AxiosError)?.response?.status;
  if (status === 429) {
    toast.error('Slow down — try again in a moment.');
  } else if (status === 503) {
    toast.error('AI is busy — try again.');
  } else {
    toast.error('Something went wrong.');
  }
};

export const useAssistantChat = () => {
  const { conversation, addMessage, pushConversationTurn, setPendingTool, enterCbtMode } =
    useAssistantStore();

  return useMutation({
    mutationFn: (message: string) => postAssistantChat({ message, conversation }),
    onSuccess: (data, message) => {
      pushConversationTurn({ role: 'user', text: message });
      pushConversationTurn({ role: 'assistant', text: data.reply });

      addMessage({ id: crypto.randomUUID(), role: 'assistant', text: data.reply, tool: data.tool });

      setPendingTool(data.tool?.requires_confirmation && !data.tool.executed ? data.tool : null);

      if (data.tool?.name === 'start_cbt_session' && data.tool.executed) {
        const { session_id } = data.tool.result as { session_id: string };
        enterCbtMode(session_id);
      }
    },
    onError: handleAiError,
  });
};

export const useConfirmTool = () => {
  const { pendingTool, conversation, addMessage, pushConversationTurn, setPendingTool } =
    useAssistantStore();

  return useMutation({
    mutationFn: () => {
      if (!pendingTool) throw new Error('No pending tool');
      return postAssistantChat({
        message: '__confirm__',
        conversation,
        context: { confirm_tool: { name: pendingTool.name, args: pendingTool.args } },
      });
    },
    onSuccess: (data) => {
      pushConversationTurn({ role: 'assistant', text: data.reply });
      addMessage({ id: crypto.randomUUID(), role: 'assistant', text: data.reply, tool: data.tool });
      setPendingTool(null);
    },
    onError: handleAiError,
  });
};

export const useStartCbt = () => {
  const { addMessage, enterCbtMode } = useAssistantStore();
  return useMutation({
    mutationFn: (moodBefore?: number) => postCbtSessionStart(moodBefore),
    onSuccess: (session) => {
      enterCbtMode(session.id);
      addMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        text: 'أنا هنا. يلا نتكلم.',
      });
    },
    onError: handleAiError,
  });
};

export const useCbtMessage = () => {
  const { cbtSessionId, addMessage, endCbtSession } = useAssistantStore();
  return useMutation({
    mutationFn: (message: string) => {
      if (!cbtSessionId) throw new Error('No active CBT session');
      return postCbtMessage(cbtSessionId, message);
    },
    onSuccess: (data) => {
      addMessage({ id: crypto.randomUUID(), role: 'assistant', text: data.reply });
      if (data.sessionEnded) endCbtSession();
    },
    onError: handleAiError,
  });
};