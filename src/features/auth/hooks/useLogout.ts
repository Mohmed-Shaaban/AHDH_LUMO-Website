import { deleteCookie } from '@/utils/TS-Cookie';
import { useQueryClient } from '@tanstack/react-query';

const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = () => {
    deleteCookie({ name: 'token' });
    queryClient.clear();
    window.dispatchEvent(new Event('auth-change'));
  };

  return {
    logout,
  };
};

export default useLogout;
