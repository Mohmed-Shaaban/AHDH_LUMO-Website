import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import HamburgerIconSVG from './svg/HamburgerIconSVG';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from './ui/navigation-menu';
import ThemeToggle from './ThemeToggle';
import DropDownUser from './DropDownUser';
import Logo from './Logo';
import { useNavigate } from 'react-router';

export interface NavbarNavLink {
  href: string;
  label: string;
  active?: boolean;
}
export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigationLinks?: NavbarNavLink[];
  signInText?: string;
  signInHref?: string;
  ctaText?: string;
  ctaHref?: string;
  onSignInClick?: () => void;
  onCtaClick?: () => void;
}
// Default navigation links
const defaultNavigationLinks: NavbarNavLink[] = [];

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      //   logo = <Logo />,
      logoHref = '/',
      navigationLinks = defaultNavigationLinks,
      // signInText = 'Sign In',
      //   signInHref = '#signin',
      // ctaText = 'Get Started',
      //   ctaHref = '#get-started',
      // onSignInClick,
      // onCtaClick,
      ...props
    },
    ref,
  ) => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768);
        }
      };
      checkWidth();
      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      return () => {
        resizeObserver.disconnect();
      };
    }, []);
    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );
    return (
      <header
        ref={combinedRef}
        className={cn(
          'bg-background/95 supports-backdrop-filter:bg-background/30 !md:px-6 sticky top-0 z-50 w-full border-b px-4! backdrop-blur **:no-underline',
          className,
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group hover:bg-accent hover:text-accent-foreground h-9 w-9"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIconSVG />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-48 p-2">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-1">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index} className="w-full">
                          <button
                            onClick={(e) => e.preventDefault()}
                            className={cn(
                              'hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors',
                              link.active
                                ? 'bg-accent text-accent-foreground'
                                : 'text-foreground/80',
                            )}
                          >
                            {link.label}
                          </button>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}
            <div className="flex items-center gap-6">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(logoHref);
                }}
                className="text-primary hover:text-primary/90 flex cursor-pointer items-center space-x-2 transition-colors"
              >
                <span className="hidden text-xl font-bold sm:inline-block">
                  <Logo
                    classNames={{
                      name: 'animate-gradient bg-[length:200%_200%] bg-gradient-to-br from-violet-700 from-35% to-blue-500 bg-clip-text text-transparent',
                    }}
                  />
                </span>
              </button>
              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <button
                          onClick={(e) => e.preventDefault()}
                          className={cn(
                            'group hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex h-9 w-max cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium no-underline transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                            link.active
                              ? 'bg-accent text-accent-foreground'
                              : 'text-foreground/80 hover:text-foreground',
                          )}
                        >
                          {link.label}
                        </button>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Profile Menu */}
            <DropDownUser />
            <ThemeToggle />
          </div>
        </div>
      </header>
    );
  },
);
Navbar.displayName = 'Navbar';
export { HamburgerIconSVG };
