// src/components/guards/OnboardingGuard.tsx
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { routes } from '@/routes/routes.config';
import { useOnboardingState } from '@/features/onboarding/useOnBoarding';

const OnboardingGuard = () => {
  const navigate = useNavigate();
  const { data: state, isLoading } = useOnboardingState();

  useEffect(() => {
    if (!isLoading && state && !state.isCompleted) {
      navigate(routes.ONBOARDING.path, { replace: true });
    }
  }, [state, isLoading, navigate]);

  if (isLoading) return null; // or your existing full-screen loader

  return <Outlet />;
};

export default OnboardingGuard;