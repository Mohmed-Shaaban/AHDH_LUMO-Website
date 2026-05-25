import { buildRouteGroup } from './utils/buildRouteGroup';

/**
 * Centralized definition of all application routes.
 *
 * This object acts as the **single source of truth** for route paths
 * throughout the application.
 *
 * Benefits:
 *
 * - Prevents hardcoded route strings across the codebase
 * - Provides full **TypeScript autocomplete**
 * - Enables **type-safe URL generation** via {@link buildUrl}
 *
 * Route groups (like `DASHBOARD`) are created using {@link buildRouteGroup}
 * which automatically prefixes child routes with their base path.
 *
 * ---
 *
 * @example
 * Basic usage:
 *
 * ```ts
 * PATHS.LOGIN
 * // "/login"
 * ```
 *
 * @example
 * Using nested route groups:
 *
 * ```ts
 * PATHS.DASHBOARD.index
 * // "/dash"
 *
 * PATHS.DASHBOARD.profile
 * // "/dash/profile"
 * ```
 *
 * @example
 * Using with buildUrl:
 *
 * ```ts
 * buildUrl(PATHS.LOGIN)
 * // "/login"
 *
 * buildUrl(PATHS.DASHBOARD.settings)
 * // "/dash/settings"
 * ```
 *
 * ---
 *
 * @remarks
 * - All values are marked with `as const` to preserve literal types.
 * - These literal types power the {@link AppPathT} union type.
 */
export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  VERIFY_EMAIL: '/verify-email',
  FORGET_PASSWORD: '/forget-password',
  TERMS: '/terms-of-service',
  DASHBOARD: buildRouteGroup('/dash', {
    tasks:'/tasks',
    habit:'/habits',
    goups:'/groups',
    progress: '/progress', // => /dash/overview
    settings: '/settings', // => /dash/settings
    profile: '/profile', // => /dash/profile
    groupDetail:'/groups/:id'
  }),
  PROFILE: '/profile',
} as const;
