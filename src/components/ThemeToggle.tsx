import { Moon, Sun, Laptop, Check, type LucideIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  useThemeContext,
  type Theme,
} from '@/providers/context/theme-context/ThemeContext';

const ThemeToggle = () => {
  const { setTheme, theme } = useThemeContext();

  const themes: {
    label: string;
    value: Theme;
    icon: LucideIcon;
  }[] = [
    { label: 'Light', value: 'light', icon: Sun },
    { label: 'Dark', value: 'dark', icon: Moon },
    { label: 'System', value: 'system', icon: Laptop },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full">
          <Sun
            className={`absolute h-5 w-5 transition-all duration-300 ${theme === 'light' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`}
          />
          <Moon
            className={`absolute h-5 w-5 transition-all duration-300 ${theme === 'dark' || theme === 'system' ? 'scale-100 rotate-0' : 'scale-0 rotate-90'}`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-44 rounded-xl p-2 shadow-lg"
      >
        {themes.map(({ label, value, icon: Icon }) => {
          const isActive = theme === value;

          return (
            <DropdownMenuItem
              key={value}
              onClick={() => setTheme(value)}
              className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors ${isActive ? 'bg-muted font-medium' : 'hover:bg-muted/60'} `}
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </div>

              {isActive && <Check className="text-primary h-4 w-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
