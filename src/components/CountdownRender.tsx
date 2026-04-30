import { useResendVerificationCode } from '@/features/auth/hooks/useResendVerificationCode';
import { useCountdown } from '@/hooks/useCountdown';
import { getCookie, setCookie } from '@/utils/TS-Cookie';
import { useEffect, useMemo, useState } from 'react';
import { Spinner } from './ui/spinner';
import { toast } from 'sonner';

interface ICountdownRenderProps {
  initialSeconds: number;
  onFinish?: () => void;
  onResend?: () => void;
  className?: string;
  autoStart?: boolean;
}

export const CountdownRender = ({
  initialSeconds,
  onFinish,
  onResend,
  className,
  autoStart = true,
}: ICountdownRenderProps) => {
  const { mutateResendVerificationCode, isLoadingResendVerificationCode } =
    useResendVerificationCode();
  const signupCreatedAt = getCookie({ name: 'SignupCreatedAt' });
  const signupEmail = getCookie({ name: 'email' });

  const [now] = useState(() => Date.now());

  const remainingSeconds = useMemo(() => {
    if (!signupCreatedAt) return initialSeconds;

    const createdAt = new Date(signupCreatedAt).getTime();
    const diff = Math.floor((now - createdAt) / 1000);

    const remaining = initialSeconds - diff;

    return remaining > 0 ? remaining : 0;
  }, [signupCreatedAt, initialSeconds, now]);

  const { seconds, start, reset } = useCountdown({
    initialSeconds: remainingSeconds,
    onFinish,
  });

  useEffect(() => {
    if (autoStart && remainingSeconds > 0) start();
  }, [autoStart, start, remainingSeconds]);

  const minutes = Math.floor(seconds / 60);
  const sec = seconds % 60;

  const handleResend = () => {
    if (signupEmail) {
      mutateResendVerificationCode(
        { email: signupEmail },
        {
          onSuccess: () => {
            setCookie({
              name: 'SignupCreatedAt',
              value: new Date().toISOString(),
              days: 10 / (24 * 60),
            });
            onResend?.();
            reset();
            start();
          },
        },
      );
    } else {
      toast.error('Please sign up first');
    }
  };

  return (
    <div className={className}>
      {seconds > 0 ? (
        <span className="text-sm text-gray-500">
          Resend code in {minutes.toString().padStart(2, '0')}:
          {sec.toString().padStart(2, '0')}
        </span>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          className="text-secondary-500 cursor-pointer text-sm font-bold hover:underline"
        >
          {isLoadingResendVerificationCode ? (
            <Spinner className="size-6" />
          ) : (
            'Resend code'
          )}
        </button>
      )}
    </div>
  );
};
