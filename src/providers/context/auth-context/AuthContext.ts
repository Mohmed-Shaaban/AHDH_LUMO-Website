import type { loginPayloadT, loginResponseT } from '@/schema/auth/login.schema';
import type { userByTokenDataT } from '@/schema/user/userByToken.schema';
import { createContext, useContext } from 'react';

export type authContextCallbacksT = {
  onSuccess?: (data: loginResponseT) => void;
  onError?: (error: unknown) => void;
};

export interface IAuthContext {
  dataUser: userByTokenDataT | null;
  isLoadingUser: boolean;
  isLoggedIn: boolean;
  isLoadingLoggingIn: boolean;
  token: string | undefined;
  errorLogin: Error | null;
  login: (data: loginPayloadT, callbacks?: authContextCallbacksT) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error(
      'useAuthContext hook must be used within a <AuthContextProvider>...</AuthContextProvider>',
    );

  return context;
};
