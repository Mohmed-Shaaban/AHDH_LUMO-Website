import type { PATHS } from '../path';

/**
 * Creates a new type where all route values are automatically prefixed
 * with a given base path.
 *
 * This utility is used internally by {@link buildRouteGroup} to generate
 * fully-qualified child routes based on a parent (base) path.
 *
 * @template Base
 * The base path that should prefix all child routes.
 *
 * @template Routes
 * A record of route names mapped to relative paths.
 *
 * @example
 * type ChildRoutes = {
 *   overview: "/overview"
 *   settings: "/settings"
 * }
 *
 * type Result = PrefixRoutes<"/dash", ChildRoutes>
 *
 * Result will be:
 * {
 *   overview: "/dash/overview"
 *   settings: "/dash/settings"
 * }
 *
 * @example
 * Useful for generating grouped routes:
 *
 * ```ts
 * const DASHBOARD = buildRouteGroup("/dash", {
 *   overview: "/overview",
 *   settings: "/settings",
 * })
 *
 * DASHBOARD.overview
 * // "/dash/overview"
 * ```
 */
export type PrefixRoutes<
  Base extends string,
  Routes extends Record<string, string>,
> = {
  [K in keyof Routes]: `${Base}${Routes[K]}`;
};

/**
 * Recursively extracts all string values from a nested object type.
 *
 * This utility is used to collect **all route path strings** from the
 * {@link PATHS} object regardless of nesting depth.
 *
 * The result becomes a union type representing every valid route
 * in the application.
 *
 * @template T
 * The object type to extract string values from.
 *
 * ---
 *
 * @example
 *
 * Given:
 *
 * ```ts
 * const PATHS = {
 *   HOME: "/",
 *   DASHBOARD: {
 *     index: "/dash",
 *     profile: "/dash/profile"
 *   }
 * }
 * ```
 *
 * Result:
 *
 * ```ts
 * type Paths =
 *   | "/"
 *   | "/dash"
 *   | "/dash/profile"
 * ```
 *
 * ---
 *
 * @remarks
 * This utility enables {@link AppPathT} to represent **every valid route
 * defined in the application**.
 */
export type ExtractStringValues<T> = T extends string
  ? T
  : T extends Record<string, unknown>
    ? ExtractStringValues<T[keyof T]>
    : never;

/**
 * Represents the top-level keys of the {@link PATHS} object.
 *
 * Useful when you need to reference route identifiers rather
 * than the actual path strings.
 */
export type RouteKeyT = keyof typeof PATHS;

/**
 * Union type representing **all valid route paths** in the application.
 *
 * This type is automatically derived from the {@link PATHS} object
 * using {@link ExtractStringValues}.
 *
 * It ensures that utilities like {@link buildUrl} only accept
 * valid application routes.
 *
 * ---
 *
 * @example
 *
 * ```ts
 * let path: AppPathT
 *
 * path = "/login"         // ✅ valid
 * path = "/dash/profile"  // ✅ valid
 *
 * path = "/invalid"       // ❌ TypeScript error
 * ```
 *
 * ---
 *
 * @remarks
 * The union is generated automatically whenever `PATHS` changes,
 * ensuring type safety across the entire routing system.
 */
export type AppPathT = ExtractStringValues<typeof PATHS>;

/**
 * Extracts dynamic route parameters from a path string.
 *
 * This utility analyzes route patterns containing parameters
 * like `:id` or `:postId` and produces a corresponding
 * TypeScript object type.
 *
 * It is used internally by {@link buildUrl} to enforce
 * type-safe parameter passing.
 *
 * @template T
 * A route path string that may contain parameters.
 *
 * ---
 *
 * @example
 * Single parameter:
 *
 * ```ts
 * type Params = ExtractRouteParams<"/users/:id">
 *
 * // Result
 * {
 *   id: string | number
 * }
 * ```
 *
 * @example
 * Multiple parameters:
 *
 * ```ts
 * type Params = ExtractRouteParams<
 *   "/posts/:postId/comments/:commentId"
 * >
 *
 * // Result
 * {
 *   postId: string | number
 *   commentId: string | number
 * }
 * ```
 *
 * @example
 * No parameters:
 *
 * ```ts
 * type Params = ExtractRouteParams<"/login">
 *
 * // Result
 * never
 * ```
 *
 * ---
 *
 * @remarks
 * - Parameter values are typed as `string | number`.
 * - The extraction works recursively for deeply nested routes.
 */
export type ExtractRouteParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractRouteParams<`/${Rest}`>]: string | number }
    : T extends `${string}:${infer Param}`
      ? { [K in Param]: string | number }
      : never;
