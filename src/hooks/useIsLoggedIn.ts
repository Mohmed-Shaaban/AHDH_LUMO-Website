import { useUserByToken } from '@/features/user/hooks/useUserByToken';
import type { userByTokenDataT } from '@/schema/user/userByToken.schema';
import { deleteCookie, getCookie } from '@/utils/TS-Cookie';
import { useEffect, useState } from 'react';

interface IUseIsLoggedIn {
  isLoggedIn: boolean;
  token: string | undefined;
  dataUser: userByTokenDataT | null;
  isLoading: boolean;
  error?: string;
}

const useIsLoggedIn = (): IUseIsLoggedIn => {
  const [token, setToken] = useState<string | undefined>(() =>
    getCookie({ name: 'token' }),
  );

  const { dataUserByToken, isLoadingUserByToken, errorUserByToken } =
    useUserByToken(token);

  useEffect(() => {
    const handleAuthChange = () => {
      setToken(getCookie({ name: 'token' }));
    };

    window.addEventListener('auth-change', handleAuthChange);
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  useEffect(() => {
    if (errorUserByToken) {
      deleteCookie({ name: 'token' });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setToken(undefined);
    }
  }, [errorUserByToken]);

  // Case 1: No Token present
  if (!token) {
    return {
      isLoggedIn: false,
      token: undefined,
      dataUser: null,
      isLoading: false, // Not loading because we know we aren't logged in
      error: 'Unauthorized',
    };
  }

  // Case 2: Token exists, but fetching user data (prevents Flash/Lag)
  // We check isLoadingUserByToken OR if we have a token but no data yet (initial fetch)
  if (isLoadingUserByToken || (!dataUserByToken && !errorUserByToken)) {
    return {
      isLoggedIn: false, // Technically false until verified
      token,
      dataUser: null,
      isLoading: true, // ✨ Keep loading true to show Spinner in ProtectedRoute
    };
  }

  // Case 3: Token invalid / Error fetching user
  if (errorUserByToken) {
    deleteCookie({ name: 'token' });
    return {
      isLoggedIn: false,
      token: undefined,
      dataUser: null,
      isLoading: false,
      error: errorUserByToken.message,
    };
  }

  return {
    isLoggedIn: !!dataUserByToken?.data,
    token,
    dataUser: dataUserByToken?.data ?? null,
    isLoading: false,
  };
};

export default useIsLoggedIn;
