import { Edit, Eye, Settings, Users, SquareCheckBig } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from './ui/sidebar';
import { Link, useLocation } from 'react-router';
import { useState } from 'react';
import { routes } from '@/routes/routes.config';

interface ISidebarItem {
  title: string;
  url?: string;
  icon: React.ElementType;
  children?: ISidebarItem[];
}

const items: ISidebarItem[] = [
  {
    title: 'Overview',
    url: routes.DASHBOARD.overview.path,
    icon: Users,
  },
  {
    title: 'Tasks',
    icon: SquareCheckBig,
    children: [
      {
        title: 'Show Tickets',
        url: '/dash/tickets/show',
        icon: Eye,
      },
      {
        title: 'Unassigned Tickets',
        url: '/dash/tickets/unassigned',
        icon: SquareCheckBig,
      },
      {
        title: 'Manage Tickets',
        url: '/dash/tickets/manage',
        icon: Edit,
      },
    ],
  },
  {
    title: 'Page-2',
    url: '/dash/page-2',
    icon: Settings,
  },
  {
    title: 'Page-3',
    url: '/dash/page-3',
    icon: Settings,
  },
  {
    title: 'Page-4',
    url: '/dash/page-4',
    icon: Settings,
  },
];

const AppSidebar = () => {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {};
    items.forEach((item) => {
      if (
        item.children &&
        item.children.some((child) => location.pathname.startsWith(child.url!))
      ) {
        state[item.title] = true;
      }
    });
    return state;
  });

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };
  return (
    <Sidebar className="mt-auto! h-[calc(100%-4rem)]! w-[16rem] shrink-0">
      <SidebarHeader />
      <SidebarTrigger className="absolute top-2 -right-7 cursor-pointer rounded-md rounded-l-none border border-l-0 border-zinc-500 bg-zinc-500/40" />
      <SidebarContent className="px-4!">
        <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => {
              if (item.children) {
                const isOpen = openGroups[item.title] ?? false;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="flex items-center justify-between rounded-md px-3!"
                      onClick={() => toggleGroup(item.title)}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="mr-2 size-5" />
                        <span>{item.title}</span>
                      </div>

                      <span className="ml-2">{isOpen ? '▾' : '▸'}</span>
                    </SidebarMenuButton>

                    {isOpen && (
                      <SidebarGroupContent className="mt-1! pl-4!">
                        <SidebarMenu>
                          {item.children.map((child) => (
                            <SidebarMenuItem key={child.title}>
                              <SidebarMenuButton
                                className={`${
                                  location.pathname === child.url
                                    ? 'bg-zinc-500/30'
                                    : ''
                                } rounded-md px-3!`}
                                asChild
                              >
                                <Link to={child.url!}>
                                  <child.icon className="mr-2" />
                                  <span>{child.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    )}
                  </SidebarMenuItem>
                );
              }

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`${
                      location.pathname === item.url ? 'bg-zinc-500/30' : ''
                    } rounded-md px-3!`}
                    asChild
                  >
                    <Link to={item.url!}>
                      <item.icon className="mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
