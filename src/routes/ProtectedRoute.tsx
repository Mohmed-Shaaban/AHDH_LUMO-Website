import { type ReactNode } from 'react';
import { Navigate } from 'react-router';
import { Spinner } from '@/components/ui/spinner.tsx';
import { useAuthContext } from '@/providers/context/auth-context/AuthContext';

/**
 * A wrapper component that protects routes based on authentication state.
 *
 * This component handles:
 * - Redirecting unauthenticated users from protected routes.
 * - Redirecting authenticated users away from public routes (e.g., login/register).
 * - Displaying a loading spinner while the authentication state is being resolved.
 *
 * @component
 *
 * @param {React.ReactNode} props.children
 * The component(s) to render when access is allowed.
 *
 * @param {string} props.redirectPath
 * The path to navigate to when the user should be redirected.
 *
 * @param {boolean} props.shouldRedirectIfLoggedIn
 * Controls redirect behavior:
 * - `true` → Redirect authenticated users (used for public routes like login/register).
 * - `false` → Redirect unauthenticated users (used for protected routes like dashboard).
 *
 * @param {boolean} [props.isFullScreenLoader=true]
 * Determines how the loading spinner is displayed while the authentication state is loading.
 * - `true` → Full screen spinner overlay.
 * - `false` → Centered spinner within the current layout.
 *
 * @returns {React.ReactElement | null}
 * - Renders `children` if access conditions are met.
 * - Otherwise redirects using `<Navigate />`.
 * - While authentication is loading, displays a spinner.
 *
 * @example
 * // Example: Only allow authenticated users
 * <ProtectedRoute redirectPath="/login" shouldRedirectIfLoggedIn={false}>
 *   <Dashboard />
 * </ProtectedRoute>
 *
 * @example
 * // Example: Prevent logged-in users from accessing login page
 * <ProtectedRoute redirectPath="/" shouldRedirectIfLoggedIn={true}>
 *   <LoginPage />
 * </ProtectedRoute>
 *
 * @example
 * // Example: Show inline loader instead of full screen
 * <ProtectedRoute
 *   redirectPath="/login"
 *   shouldRedirectIfLoggedIn={false}
 *   isFullScreenLoader={false}
 * >
 *   <Dashboard />
 * </ProtectedRoute>
 */
interface IProps {
  children: ReactNode;
  redirectPath: string;
  shouldRedirectIfLoggedIn: boolean;
  isFullScreenLoader?: boolean;
}

const ProtectedRoute = ({
  children,
  redirectPath = '/',
  shouldRedirectIfLoggedIn,
  isFullScreenLoader = true,
}: IProps) => {
  const { isLoadingUser: isLoading, isLoggedIn } = useAuthContext();

  if (isLoading) {
    if (!isFullScreenLoader) {
      return (
        <div className="flex min-h-[50vh] w-full flex-1 items-center justify-center">
          <Spinner className="size-12 text-red-600" />
        </div>
      );
    }
    if (isFullScreenLoader) {
      return (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center">
          <Spinner className="size-12 text-red-600" />
        </div>
      );
    }
  }

  const shouldRedirect =
    (isLoggedIn && shouldRedirectIfLoggedIn) ||
    (!isLoggedIn && !shouldRedirectIfLoggedIn);

  if (shouldRedirect) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
