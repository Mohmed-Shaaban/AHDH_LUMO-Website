import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { User2 } from 'lucide-react';
import { useAuthContext } from '@/providers/context/auth-context/AuthContext';
import { Skeleton } from './ui/skeleton';
import UserProfileDropdown from './UserProfileDropdown';

const DropDownUser = () => {
  const navigate = useNavigate();
  const { isLoadingUser, isLoggedIn, dataUser } = useAuthContext();

  if (isLoadingUser) {
    return <Skeleton className="h-9 w-9 rounded-md" />;
  }

  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => navigate('/login')}>
          Login
        </Button>
        <Button onClick={() => navigate('/signup')}>Signup</Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="default"
          className="bg-secondary-500/20! flex flex-row gap-2 rounded-full p-0"
        >
          <span>{dataUser?.fullName.split(' ').slice(0, 2)}</span>
          <User2 />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="p-0">
        <UserProfileDropdown />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownUser;
