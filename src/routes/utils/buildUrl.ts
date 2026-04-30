import type { AppPathT, ExtractRouteParams } from '../types';

/**
 * Builds a final URL string by replacing dynamic route parameters in the path.
 *
 * This utility ensures type-safe URL construction using the application's
 * predefined route paths (`AppPathT`). If the route contains parameters
 * (e.g. `:id`), TypeScript will require them when calling the function.
 *
 * The function scans the path for parameters like `:paramName` and replaces
 * them with the values provided in `args`.
 *
 * @template T - A valid application route path from {@link AppPathT}.
 *
 * @param path
 * A route path string that may contain dynamic parameters (e.g. `/users/:id`).
 *
 * @param args
 * An object containing values for the dynamic parameters in the path.
 * This argument is **only required if the path contains parameters**.
 *
 * @returns
 * The final URL string with all parameters replaced.
 *
 * ---
 *
 * @example
 * Basic usage with a static route (no parameters):
 *
 * ```ts
 * buildUrl(PATHS.LOGIN);
 * // "/login"
 * ```
 *
 * @example
 * Using a nested route from a route group:
 *
 * ```ts
 * buildUrl(PATHS.DASHBOARD.overview);
 * // "/dash/overview"
 * ```
 *
 * @example
 * Route with a single parameter:
 *
 * ```ts
 * const USER_DETAILS = "/users/:id" as const;
 *
 * buildUrl(USER_DETAILS, { id: 42 });
 * // "/users/42"
 * ```
 *
 * @example
 * Route with multiple parameters:
 *
 * ```ts
 * const POST_COMMENT = "/posts/:postId/comments/:commentId" as const;
 *
 * buildUrl(POST_COMMENT, {
 *   postId: 10,
 *   commentId: 55,
 * });
 *
 * // "/posts/10/comments/55"
 * ```
 *
 * @example
 * Type safety example (TypeScript error if params are missing):
 *
 * ```ts
 * const USER_DETAILS = "/users/:id" as const;
 *
 * buildUrl(USER_DETAILS);
 * // ❌ TypeScript Error: parameter "id" is required
 * ```
 *
 * @example
 * Using string values instead of numbers:
 *
 * ```ts
 * const ORDER = "/orders/:orderId" as const;
 *
 * buildUrl(ORDER, { orderId: "A123" });
 * // "/orders/A123"
 * ```
 *
 * ---
 *
 * @remarks
 * - Parameter values can be **string or number**.
 * - If the route contains no parameters, the second argument must not be provided.
 * - All routes are inferred from the `PATHS` object via {@link AppPathT}.
 */
export function buildUrl<T extends AppPathT>(
  path: T,
  ...args: [ExtractRouteParams<T>] extends [never]
    ? []
    : [ExtractRouteParams<T>]
): string {
  let finalPath: string = path;
  const params = args[0] as Record<string, string | number> | undefined;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      finalPath = finalPath.replace(`:${key}`, String(value));
    });
  }

  return finalPath;
}
