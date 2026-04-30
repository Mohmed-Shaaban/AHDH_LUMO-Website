import { userKeys } from '@/features/user/user.queryKeys';
import type { forgetPasswordPayloadT } from '@/schema/auth/forgetPassword.schema';
import forgetPassword from '@/services/auth/forgetPassword.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authKeys } from '../auth.queryKeys';

const useForgetPassword = () => {
  const queryClient = useQueryClient();
  const {
    mutate: mutateResendForgetPassword,
    isPending: isLoadingResendForgetPassword,
    error: errorResendForgetPassword,
  } = useMutation({
    mutationFn: (payload: forgetPasswordPayloadT) => forgetPassword(payload),
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [userKeys.me(), authKeys.forgetPassword()],
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return {
    mutateResendForgetPassword,
    isLoadingResendForgetPassword,
    errorResendForgetPassword,
  };
};

export { useForgetPassword };
