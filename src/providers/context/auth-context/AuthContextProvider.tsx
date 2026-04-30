import { useLogin } from '@/features/auth/hooks/useLogin';
import useLogout from '@/features/auth/hooks/useLogout';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import { useQueryClient } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import {
  AuthContext,
  type authContextCallbacksT,
  type IAuthContext,
} from './AuthContext';
import type { loginPayloadT } from '@/schema/auth/login.schema';

interface IProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: IProps) => {
  const queryClient = useQueryClient();

  const { dataUser, isLoading, isLoggedIn, token } = useIsLoggedIn();
  const { mutateLogin, isLoadingLogin, errorLogin } = useLogin();
  const { logout } = useLogout();

  const login = (data: loginPayloadT, callbacks?: authContextCallbacksT) => {
    mutateLogin(data, {
      onSuccess: (response) => {
        queryClient.invalidateQueries();
        callbacks?.onSuccess?.(response);
      },
      onError: (error) => {
        callbacks?.onError?.(error);
      },
    });
  };

  const value: IAuthContext = {
    dataUser,
    errorLogin,
    isLoggedIn,
    isLoadingUser: isLoading,
    isLoadingLoggingIn: isLoadingLogin,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
