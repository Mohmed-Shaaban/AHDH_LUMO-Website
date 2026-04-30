import type { appRouteT, WrapperConfigT } from '@/types/routes.types';
import type { RouteObject } from 'react-router';
import ProtectedRoute from './ProtectedRoute';

type BuildRouteParams = {
  config: appRouteT;
  element: React.ReactNode;
  extraWrappers?: WrapperConfigT[];
};

export function buildRoute({
  config,
  element,
  extraWrappers = [],
}: BuildRouteParams): RouteObject {
  let finalElement = element;

  const wrappers = [...(extraWrappers ?? [])];

  if (wrappers.length) {
    finalElement = wrappers.reduceRight((acc, wrapper) => {
      return (
        <ProtectedRoute
          redirectPath={wrapper.redirectPath}
          shouldRedirectIfLoggedIn={wrapper.shouldRedirectIfLoggedIn}
          isFullScreenLoader={wrapper.isFullScreenLoader}
        >
          {acc}
        </ProtectedRoute>
      );
    }, element);
  }

  return {
    path: config.path,
    element: finalElement,
  };
}
