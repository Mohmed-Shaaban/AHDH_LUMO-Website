import type { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  overlayColor?: string;
}

const ScreenFadeWrapper = ({
  children,
  overlayColor = 'bg-background',
}: IProps) => {
  return (
    <>
      <div
        className={`${overlayColor} animate-out fade-out fill-mode-forwards pointer-events-none fixed inset-0 z-[99999] h-full w-full duration-500`}
      />
      {children}
    </>
  );
};

export default ScreenFadeWrapper;
