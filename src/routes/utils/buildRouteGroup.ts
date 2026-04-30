import type { PrefixRoutes } from '../types';

/**
 * Builds a route group by combining a base path with a set of child routes.
 *
 * This helper is useful for organizing related routes under a shared base path
 * while keeping the route definitions concise and type-safe.
 *
 * The returned object will include:
 *
 * - `index` → the base path itself
 * - prefixed child routes → each child route automatically prefixed with the base path
 *
 * @template Base
 * The base path of the route group.
 *
 * @template Routes
 * An object containing child route definitions.
 *
 * @param base
 * The parent path that all child routes will be prefixed with.
 *
 * @param routes
 * A record of route names mapped to relative paths.
 *
 * @returns
 * An object containing the base route (`index`) and all prefixed child routes.
 *
 * ---
 *
 * @example
 * Creating a dashboard route group:
 *
 * ```ts
 * const DASHBOARD = buildRouteGroup("/dash", {
 *   overview: "/overview",
 *   profile: "/profile",
 *   settings: "/settings",
 * })
 * ```
 *
 * Result:
 *
 * ```ts
 * DASHBOARD.index
 * // "/dash"
 *
 * DASHBOARD.overview
 * // "/dash/overview"
 *
 * DASHBOARD.profile
 * // "/dash/profile"
 *
 * DASHBOARD.settings
 * // "/dash/settings"
 * ```
 *
 * ---
 *
 * @remarks
 * - Child routes **must start with "/"**.
 * - The function automatically concatenates `base + childPath`.
 * - The resulting routes are fully **type-safe**.
 */
export function buildRouteGroup<
  Base extends string,
  Routes extends Record<string, string>,
>(base: Base, routes: Routes): { index: Base } & PrefixRoutes<Base, Routes> {
  const prefixed: Partial<Record<keyof Routes, string>> = {};

  (Object.keys(routes) as (keyof Routes)[]).forEach((key) => {
    prefixed[key] = `${base}${routes[key]}`;
  });

  return {
    index: base,
    ...(prefixed as PrefixRoutes<Base, Routes>),
  };
}
