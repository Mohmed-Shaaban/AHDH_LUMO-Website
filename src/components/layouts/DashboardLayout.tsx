import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import { Navbar } from '../Navbar';
import AppSidebar from '../AppSidebar';
import { SidebarInset, SidebarProvider, useSidebar } from '../ui/sidebar';

const DashboardContent = () => {
  const { state, isMobile } = useSidebar();
  const sidebarOffset = isMobile
    ? '0px'
    : state === 'expanded'
      ? '16rem'
      : '0rem';

  return (
    <SidebarInset
      className="flex min-h-dvh flex-1 flex-col overflow-x-hidden transition-[padding,margin,width,transform] duration-500"
      style={{
        paddingLeft: sidebarOffset,
      }}
    >
      {/* <Navbar /> */}
      <main className="dark:bg-background flex-1 ">
        <div className="mx-auto my-5! px-4! sm:px-6! lg:px-8! h-full flex">
          <Toaster className="select-none" />
          <Outlet />
        </div>
      </main>
    </SidebarInset>
  );
};

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <SidebarProvider>
        <AppSidebar />
        <DashboardContent />
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;