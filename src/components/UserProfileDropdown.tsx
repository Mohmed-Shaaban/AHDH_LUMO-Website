import { LayoutDashboard, LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { useNavigate } from 'react-router';
import useLogout from '@/features/auth/hooks/useLogout';
import { useAuthContext } from '@/providers/context/auth-context/AuthContext';
import { Skeleton } from './ui/skeleton';
import { routes } from '@/routes/routes.config';

const UserProfileDropdown = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { isLoadingUser, dataUser } = useAuthContext();
  console.log(dataUser)

  if (isLoadingUser) {
    return <Skeleton className="h-24 w-64 rounded-md" />;
  }

  if (!dataUser) return null;

  const initials = dataUser.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-64">
      <DropdownMenuLabel className="flex flex-col gap-1 px-2 py-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={import.meta.env.VITE_API_URL+dataUser.profilePicture || ''} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{dataUser.fullName}</span>
            <span className="text-muted-foreground text-xs">
              {dataUser.email}
            </span>
          </div>
        </div>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={() => navigate(routes.DASHBOARD.path)}>
        <LayoutDashboard className="mr-2 h-4 w-4" />
        Dashboard
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => navigate(routes.PROFILE.path)}>
        <User className="mr-2 h-4 w-4" />
        Profile
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        onClick={() => logout()}
        className="text-destructive focus:text-destructive"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </DropdownMenuItem>
    </div>
  );
};

export default UserProfileDropdown;
