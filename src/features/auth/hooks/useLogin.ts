import { userKeys } from '@/features/user/user.queryKeys';
import login from '@/services/auth/login.api';
import { setCookie } from '@/utils/TS-Cookie';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authKeys } from '../auth.queryKeys';
import type { loginPayloadT } from '@/schema/auth/login.schema';

const useLogin = () => {
  const queryClient = useQueryClient();
  const {
    mutate: mutateLogin,
    isPending: isLoadingLogin,
    error: errorLogin,
  } = useMutation({
    mutationFn: (payload: loginPayloadT) => login(payload),
    onSuccess: (data) => {
      console.log(data);
      setCookie({ name: 'token', value: data.data.accessToken, days: 7 });
      queryClient.invalidateQueries({
        queryKey: [userKeys.me(), authKeys.login(data.data.accessToken)],
      });
      window.dispatchEvent(new Event('auth-change'));
      toast.success('Login successful');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return {
    mutateLogin,
    isLoadingLogin,
    errorLogin,
  };
};

export { useLogin };
