import { useQuery } from '@tanstack/react-query';
import { userKeys } from '../user.queryKeys';
import userByToken from '@/services/user/userByToken.api';

const useUserByToken = (token?: string) => {
  const {
    data: dataUserByToken,
    isPending: isLoadingUserByToken,
    error: errorUserByToken,
    refetch: refetchUserByToken,
  } = useQuery({
    queryKey: userKeys.me(token),
    queryFn: () => userByToken(),
    enabled: !!token,
  });

  return {
    dataUserByToken,
    isLoadingUserByToken,
    errorUserByToken,
    refetchUserByToken,
  };
};

export { useUserByToken };
