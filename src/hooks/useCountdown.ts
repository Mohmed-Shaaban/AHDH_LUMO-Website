import { useCallback, useEffect, useState } from 'react';

interface UseCountdownProps {
  initialSeconds: number;
  onFinish?: () => void;
}

export function useCountdown({ initialSeconds, onFinish }: UseCountdownProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  const start = useCallback(() => setIsActive(true), []);
  const pause = useCallback(() => setIsActive(false), []);
  const reset = useCallback(() => setSeconds(initialSeconds), [initialSeconds]);

  useEffect(() => {
    if (!isActive) return;

    if (seconds === 0) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setIsActive(false);
      onFinish?.();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, isActive, onFinish]);

  return { seconds, isActive, start, pause, reset };
}
