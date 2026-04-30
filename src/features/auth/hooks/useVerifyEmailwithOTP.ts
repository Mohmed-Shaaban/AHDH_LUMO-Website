import { userKeys } from '@/features/user/user.queryKeys';
import type { verifyEmailwithOTPPayloadT } from '@/schema/auth/verifyEmailwithOTP.schema';
import verifyEmailwithOTP from '@/services/auth/verifyEmailwithOTP.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const useVerifyEmailwithOTP = () => {
  const queryClient = useQueryClient();
  const {
    mutate: mutateVerifyEmailwithOTP,
    isPending: isLoadingVerifyEmailwithOTP,
    error: errorVerifyEmailwithOTP,
  } = useMutation({
    mutationFn: (payload: verifyEmailwithOTPPayloadT) =>
      verifyEmailwithOTP(payload),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: [userKeys.me()],
      });
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return {
    mutateVerifyEmailwithOTP,
    isLoadingVerifyEmailwithOTP,
    errorVerifyEmailwithOTP,
  };
};

export { useVerifyEmailwithOTP };
