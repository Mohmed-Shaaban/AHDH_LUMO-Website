import { Button } from '@/components/ui/button.tsx';
import { useMoveBack } from '@/hooks/useMoveBack';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

interface IProps {
  className?: string;
  fallbackPath?: string;
}

const ButtonMoveBack = ({ className, fallbackPath }: IProps) => {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  return (
    <Button
      className={`bg-secondary-500/50 fixed inset-0 top-16 left-0 z-30 mr-auto mb-4 flex h-fit w-fit flex-row items-center justify-center rounded-full p-2! md:top-16 md:left-0 ${className}`}
      size={'icon'}
      variant="ghost"
      onClick={() => (fallbackPath ? navigate(fallbackPath) : moveBack())}
    >
      <ArrowLeft size={17} />
    </Button>
  );
};
export default ButtonMoveBack;
