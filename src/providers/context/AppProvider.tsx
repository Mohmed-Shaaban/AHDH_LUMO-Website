import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ThemeContextProvider from './theme-context/ThemeContextProvider';
import InternetConnectionProvider from '../InternetConnectionProvider';
import AuthContextProvider from './auth-context/AuthContextProvider';
import ScreenFadeWrapper from '@/components/animations/ScreenFadeWrapper';

interface IProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const AppProvider = ({ children }: IProps) => {
  return (
    <ThemeContextProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ScreenFadeWrapper overlayColor="bg-secondary-500">
          <InternetConnectionProvider showSpeedDetails={true}>
            <AuthContextProvider>{children}</AuthContextProvider>
          </InternetConnectionProvider>
        </ScreenFadeWrapper>
      </QueryClientProvider>
    </ThemeContextProvider>
  );
};

export default AppProvider;
