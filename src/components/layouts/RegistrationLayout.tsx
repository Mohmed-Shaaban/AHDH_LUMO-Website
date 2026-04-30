// import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import { Navbar } from '../Navbar';
import RegistrationSecondPart from '../RegistrationSecondPart';
import AuthPageTransition from '../animations/AuthPageTransition';

const RegistrationLayout = () => {
  return (
    <div className={'flex min-h-dvh flex-col overflow-x-hidden'}>
      <Navbar />
      <main className="flex flex-1 flex-col justify-center py-10">
        <div
          className={
            'relative mx-auto! flex w-full! flex-col px-4! sm:px-6! lg:px-8!'
          }
        >
          <div className="bg-secondary-500 dark:bg-secondary-900 fixed inset-0 -z-50 h-full w-full blur-[10vw]">
            <div className="absolute -top-[8%] -right-[8%] aspect-square w-[25%] rounded-full bg-amber-100" />
            <div className="bg-secondary-800 absolute top-0 -right-[10%] aspect-square w-[140%] rounded-full" />
            <div className="bg-secondary-500 absolute top-[75%] right-[75%] aspect-square w-[40%] rounded-full" />
          </div>
          <Toaster className="select-none" />
          <div className="flex h-fit w-full flex-row items-center gap-7 rounded-3xl bg-white p-3! max-[640px]:flex-col! dark:bg-black/50">
            <RegistrationSecondPart />
            {/* The Outlet exist inside the AuthPageTransition component through the useOutlet hook */}
            <AuthPageTransition />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegistrationLayout;
