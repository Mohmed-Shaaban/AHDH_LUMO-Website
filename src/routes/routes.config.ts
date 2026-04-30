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
  },
  DASHBOARD: {
    index: { path: PATHS.DASHBOARD.index },
    overview: { path: PATHS.DASHBOARD.overview },
    profile: { path: PATHS.DASHBOARD.profile },
    settings: { path: PATHS.DASHBOARD.settings },
  },
  PROFILE: {
    path: PATHS.PROFILE,
  },
};
