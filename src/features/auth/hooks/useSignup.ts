import { userKeys } from '@/features/user/user.queryKeys';
import type { signupPayloadT } from '@/schema/auth/signup.schema';
import signup from '@/services/auth/signup.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authKeys } from '../auth.queryKeys';
import { setCookie } from '@/utils/TS-Cookie';
import { useNavigate } from 'react-router';
import { routes } from '@/routes/routes.config';

const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: mutateSignup,
    isPending: isLoadingSignup,
    error: errorSignup,
  } = useMutation({
    mutationFn: (payload: signupPayloadT) => signup(payload),
    onSuccess: (data) => {
      console.log(data);
      toast.success('Signup successful, please verify your email');
      queryClient.invalidateQueries({
        queryKey: [userKeys.me(), authKeys.signup()],
      });

      setCookie({
        name: 'SignupCreatedAt',
        value: data.data.user.createdAt,
        days: 10 / (24 * 60),
      });
      setCookie({
        name: 'verificationCode',
        value: data.data.verificationCode,
        days: 10 / (24 * 60),
      });
      setCookie({
        name: 'email',
        value: data.data.user.email,
        days: 10 / (24 * 60),
      });
      navigate(routes.VERIFY_EMAIL.path);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return {
    mutateSignup,
    isLoadingSignup,
    errorSignup,
  };
};

export { useSignup };
