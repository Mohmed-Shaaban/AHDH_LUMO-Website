import type { appRouteT } from '@/types/routes.types';
import { PATHS } from './path';

/**
 * Utility type to map the nested structure of PATHS to the routes config.
 */
type RoutesMap<T> = {
  [K in keyof T]: T[K] extends string
    ? appRouteT
    : T[K] extends Record<string, unknown>
      ? RoutesMap<T[K]>
      : never;
};

export const routes: RoutesMap<typeof PATHS> = {
  HOME: {
    path: PATHS.HOME,
  },
  LOGIN: {
    path: PATHS.LOGIN,
  },
  SIGNUP: {
    path: PATHS.SIGNUP,
  },
  VERIFY_EMAIL: {
    path: PATHS.VERIFY_EMAIL,
  },
  FORGET_PASSWORD: {
    path: PATHS.FORGET_PASSWORD,
  },
  TERMS: {
    path: PATHS.TERMS,
  }, ONBOARDING: {
    path: PATHS.ONBOARDING,   
  },
    DASHBOARD: {
    index: {path:PATHS.DASHBOARD.index},
    tasks:{path:PATHS.DASHBOARD.tasks},
    habit: { path: PATHS.DASHBOARD.habit },
    goups: { path: PATHS.DASHBOARD.goups },
    progress: { path: PATHS.DASHBOARD.progress },
    settings: { path: PATHS.DASHBOARD.settings },
    profile: { path: PATHS.DASHBOARD.profile },
    groupDetail:{path:PATHS.DASHBOARD.groupDetail}
  },
  PROFILE: {
    path: PATHS.PROFILE,
  },
};
