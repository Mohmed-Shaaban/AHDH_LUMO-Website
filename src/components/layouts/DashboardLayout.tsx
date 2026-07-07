import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import { Navbar } from '../Navbar';
import AppSidebar from '../AppSidebar';
import { SidebarInset, SidebarProvider, useSidebar } from '../ui/sidebar';
import FloatingAssistant from '../FloatingAssistant';
import MoodPickerSheet from '@/features/moods/MoodPickerSheet';
import { useTodayMood } from '@/features/moods/useMoods';
import { useMoodPromptStore } from '@/providers/context/moodPromptStore';

const DAILY_PROMPT_HOUR = 9;

/**
 * Fires the daily mood prompt the first time this layout mounts after 09:00
 * local time on a day the user hasn't logged a mood or dismissed the prompt.
 */
const DailyMoodPrompter = () => {
  const { data, isSuccess } = useTodayMood();
  const openWith = useMoodPromptStore((s) => s.openWith);
  const dismissedForToday = useMoodPromptStore((s) => s.dismissedForToday);
  const alreadyOpen = useMoodPromptStore((s) => s.open);

  useEffect(() => {
    if (!isSuccess) return;
    if (dismissedForToday) return;
    if (alreadyOpen) return;
    if (data !== null) return;
    if (new Date().getHours() < DAILY_PROMPT_HOUR) return;
    openWith({ source: 'daily' });
    // Only re-evaluate when the query result flips or the persisted
    // dismissed-flag changes. `openWith` is a stable Zustand selector.
  }, [isSuccess, data, dismissedForToday, alreadyOpen, openWith]);

  return null;
};

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
        <div className="mx-auto  sm:px-6! lg:px-8! h-full pt-10 flex bg-[#F4F1FA]">
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
      <FloatingAssistant />
      <MoodPickerSheet />
      <DailyMoodPrompter />
    </>
  );
};

export default DashboardLayout;