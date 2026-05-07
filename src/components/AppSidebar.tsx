import { CircleUser, Settings, Users, ChartSpline, CircleCheck,House } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from './ui/sidebar';
import { Link, useLocation } from 'react-router';
import { routes } from '@/routes/routes.config';

interface ISidebarItem {
  title: string;
  url?: string;
  icon: React.ElementType;
  children?: ISidebarItem[];
}

const items: ISidebarItem[] = [
  {
    title: 'Home',
    url: routes.DASHBOARD.index.path,
    icon: House,
  },
  {
    title: 'My Tasks',
    url: routes.DASHBOARD.tasks.path,
    icon: CircleCheck,
  },
  {
    title: 'Habits',
    url: routes.DASHBOARD.habit.path,
    icon: Users,
  },
  {
    title: 'Groups',
    url: routes.DASHBOARD.goups.path,
    icon: Users,
  },
  {
    title: 'Progress',
    url: routes.DASHBOARD.progress.path,
    icon: ChartSpline,
  },
  {
    title: 'Settings',
    url: routes.DASHBOARD.settings.path,
    icon: Settings,
  },
  // {
  //   title: 'Account',
  //   url: routes.DASHBOARD.profile.path,
  //   icon: CircleUser,
  // },
  // {
  //   title: 'Tasks',
  //   icon: SquareCheckBig,
  //   children: [
  //     {
  //       title: 'Show Tickets',
  //       url: '/dash/tickets/show',
  //       icon: Eye,
  //     },
  //     {
  //       title: 'Unassigned Tickets',
  //       url: '/dash/tickets/unassigned',
  //       icon: SquareCheckBig,
  //     },
  //     {
  //       title: 'Manage Tickets',
  //       url: '/dash/tickets/manage',
  //       icon: Edit,
  //     },
  //   ],
  // },
  // {
  //   title: 'Page-2',
  //   url: '/dash/page-2',
  //   icon: Settings,
  // },
  // {
  //   title: 'Page-3',
  //   url: '/dash/page-3',
  //   icon: Settings,
  // },
  // {
  //   title: 'Page-4',
  //   url: '/dash/page-4',
  //   icon: Settings,
  // },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar className="mt-auto! h-[calc(100%-4rem)]! w-[16rem] shrink-0 ">
      <SidebarTrigger className="absolute top-2 -right-7 cursor-pointer rounded-md rounded-l-none border border-l-0 border-zinc-500 bg-zinc-500/40" />
      <SidebarContent>
        {/* <SidebarGroupLabel>Dashboard</SidebarGroupLabel> */}
        <SidebarGroupContent className='py-10!'>
          <SidebarMenu className='flex flex-col h-full'>
            {items.map((item) => {
              return (
                <SidebarMenuItem className={`px-4! py-2!`} key={item.title}>
                  <SidebarMenuButton
                    className={`${
                      location.pathname === item.url ? 'bg-indigo-800' : ''
                    } rounded-md py-5! px-2! `}
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
            <SidebarFooter className='pb-10!'>
              <SidebarMenu>
            <SidebarMenuItem className="px-4! py-2!">
              <SidebarMenuButton
                className={`${location.pathname === routes.DASHBOARD.profile.path ? 'bg-indigo-800' : ''} rounded-md !py-5 !px-2`}
                asChild
              >
                <Link to={routes.DASHBOARD.profile.path}>
                  <CircleUser className="mr-2" />
                  <span>{'Account'}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
            </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
