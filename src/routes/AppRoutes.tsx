import RegistrationLayout from '@/components/layouts/RegistrationLayout';
import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';
import PageNotFound from '@/pages/PageNotFound';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Login from '@/pages/registration/Login';
import { buildRoute } from './BuildRoutes';
import { routes } from './routes.config';
import Signup from '@/pages/registration/Signup';
import HomeLayout from '@/components/layouts/HomeLayout';
import AppLayout from '@/components/layouts/AppLayout';
import TermsOfService from '@/pages/TermsOfService';
import VerifyEmailwithOTP from '@/pages/registration/VerifyEmailwithOTP';
import ForgetPassword from '@/pages/registration/ForgetPassword';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Tasks from '@/pages/Tasks';
import Habits from '@/pages/Habits';
import { Settings } from '@/pages/Settings';
import Account from '@/pages/Account';
import Overview from '@/pages/dashboard/Overview';
import Groups from '@/pages/Groups';
import Progress from '@/pages/Progress';
import { GroupDetailPage } from '@/pages/GroupDetailPage';
import OnboardingLayout from '@/components/layouts/OnboardingLayout';
import OnboardingGuard from '@/components/OnboardingGuard';
import { OnboardingPage } from '@/pages/OnboardingPage';

const router = createBrowserRouter([
  {
    element: <RegistrationLayout />,
    errorElement: <ErrorPage />,
    children: [
      buildRoute({
        config: routes.SIGNUP,
        element: <Signup />,
        extraWrappers: [
          {
            redirectPath: routes.DASHBOARD.index.path,
            shouldRedirectIfLoggedIn: true,
            isFullScreenLoader: false,
          },
        ],
      }),
      buildRoute({
        config: routes.LOGIN,
        element: <Login />,
        extraWrappers: [
          {
            redirectPath: routes.DASHBOARD.index.path,
            shouldRedirectIfLoggedIn: true,
            isFullScreenLoader: false,
          },
        ],
      }),
      buildRoute({
        config: routes.VERIFY_EMAIL,
        element: <VerifyEmailwithOTP />,
        extraWrappers: [
          {
            redirectPath: routes.DASHBOARD.index.path,
            shouldRedirectIfLoggedIn: true,
            isFullScreenLoader: false,
          },
        ],
      }),
      buildRoute({
        config: routes.FORGET_PASSWORD,
        element: <ForgetPassword />,
        extraWrappers: [
          {
            redirectPath: routes.HOME.path,
            shouldRedirectIfLoggedIn: true,
            isFullScreenLoader: false,
          },
        ],
      }),
    ],
  },
  {
  element: <OnboardingLayout />,
  errorElement: <ErrorPage />,
  children: [
    buildRoute({
      config: routes.ONBOARDING,
      element: (
        <OnboardingPage
          onComplete={() => {
            // handled via OnboardingGuard below, but
            // you can also navigate here directly:
            window.location.replace(routes.DASHBOARD.index.path);
          }}
        />
      ),
      extraWrappers: [
        {
          redirectPath: routes.DASHBOARD.index.path,
          shouldRedirectIfLoggedIn: false, // requires auth
          isFullScreenLoader: true,
        },
      ],
    }),
  ],
},
  {
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      buildRoute({
        config: routes.HOME,
        element: <Home />,
      }),
    ],
  },
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      buildRoute({
        config: routes.TERMS,
        element: <TermsOfService />,
      }),
    ],
  },
  {
    element: <OnboardingGuard />,
    errorElement: <ErrorPage />,
    children:[
      {
          element: <DashboardLayout />,
          errorElement: <ErrorPage />,
              children: [
      buildRoute({
        config: routes.DASHBOARD.index,
        element: <Overview />,
        extraWrappers: [
          {
            redirectPath: routes.HOME.path,
            shouldRedirectIfLoggedIn: false,
            isFullScreenLoader: true,
          },
        ],
      }),
      buildRoute({
        config: routes.DASHBOARD.tasks,
        element: <Tasks />,
        extraWrappers: [
          {
            redirectPath: routes.HOME.path,
            shouldRedirectIfLoggedIn: false,
            isFullScreenLoader: true,
          },
        ],
      }),
      buildRoute({
        config: routes.DASHBOARD.habit,
        element: <Habits />,
        extraWrappers: [
          {
            redirectPath: routes.HOME.path,
            shouldRedirectIfLoggedIn: false,
            isFullScreenLoader: true,
          },
        ],
      }),
      buildRoute({
        config: routes.DASHBOARD.progress,
        element: <Progress />,
        extraWrappers: [
          {
            redirectPath: routes.HOME.path,
            shouldRedirectIfLoggedIn: false,
            isFullScreenLoader: true,
          },
        ],
      }),
      buildRoute({
        config: routes.DASHBOARD.settings,
        element: <Settings />,
        extraWrappers: [
          {
            redirectPath: routes.HOME.path,
            shouldRedirectIfLoggedIn: false,
            isFullScreenLoader: true,
          },
        ],
      }),
      buildRoute({
        config: routes.DASHBOARD.goups,
        element: <Groups />,
        extraWrappers: [
          {
            redirectPath: routes.HOME.path,
            shouldRedirectIfLoggedIn: false,
            isFullScreenLoader: true,
          },
        ],
      }),
      buildRoute({
        config: routes.DASHBOARD.profile,
        element: <Account />,
        extraWrappers: [
          {
            redirectPath: routes.HOME.path,
            shouldRedirectIfLoggedIn: false,
            isFullScreenLoader: true,
          },
        ],
      }),
      buildRoute({
        config: routes.DASHBOARD.groupDetail,
        element: <GroupDetailPage />,
        extraWrappers: [
          {
            redirectPath: routes.HOME.path,
            shouldRedirectIfLoggedIn: false,
            isFullScreenLoader: true,
          },
        ],
      }),
      
    ],
      }
    ]

  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
