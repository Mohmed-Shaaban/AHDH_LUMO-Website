import type { AppPathT } from '@/routes/types';

export type WrapperConfigT = {
  redirectPath: AppPathT | (string & {});
  shouldRedirectIfLoggedIn: boolean;
  isFullScreenLoader?: boolean;
};

export type appRouteT = {
  path: AppPathT;
};
