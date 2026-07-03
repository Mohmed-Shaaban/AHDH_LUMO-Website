import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import type { TaskSplitPayload } from '@/types/ai.types';
import { postTaskSplit } from '@/services/ai/ai.api';


export const useTaskSplitter = () => {
  return useMutation({
    mutationFn: (payload: TaskSplitPayload) => postTaskSplit(payload),
    onError: (err) => {
      const status = (err as AxiosError)?.response?.status;
      if (status === 429) toast.error('Slow down — try again in a moment.');
      else if (status === 400) toast.error('Please check your input.');
      else toast.error('Could not split the task.');
    },
  });
};