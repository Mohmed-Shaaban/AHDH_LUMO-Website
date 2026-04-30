import { userKeys } from '@/features/user/user.queryKeys';
import type { resendVerificationCodePayloadT } from '@/schema/auth/resendVerificationCode.schema';
import resendVerificationCode from '@/services/auth/resendVerificationCode.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authKeys } from '../auth.queryKeys';
import { setCookie } from '@/utils/TS-Cookie';

const useResendVerificationCode = () => {
  const queryClient = useQueryClient();
  const {
    mutate: mutateResendVerificationCode,
    isPending: isLoadingResendVerificationCode,
    error: errorResendVerificationCode,
  } = useMutation({
    mutationFn: (payload: resendVerificationCodePayloadT) =>
      resendVerificationCode(payload),
    onSuccess: (data) => {
      console.log(data);
      toast.success('Verification code resent successfully');
      queryClient.invalidateQueries({
        queryKey: [
          userKeys.me(),
          authKeys.resendVerificationCode(data.data.verificationCode),
        ],
      });

      setCookie({
        name: 'SignupCreatedAt',
        value: new Date().toISOString(),
        days: 10 / (24 * 60),
      });
      setCookie({
        name: 'verificationCode',
        value: data.data.verificationCode,
        days: 10 / (24 * 60),
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return {
    mutateResendVerificationCode,
    isLoadingResendVerificationCode,
    errorResendVerificationCode,
  };
};

export { useResendVerificationCode };
