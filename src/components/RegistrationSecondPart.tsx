import useWindowSize from '@/hooks/useWindowSize';
import ButterflySVG from './svg/ButterflySVG';

const RegistrationSecondPart = () => {
  const { width } = useWindowSize();
  return (
    <div className="bg-secondary-700 relative flex h-full! flex-[0_0_33%] flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl max-[954px]:w-full">
      <div className="absolute inset-0 h-full w-full blur-[6vw]">
        <div className="absolute -top-[8%] -right-[8%] aspect-square w-[25%] rounded-full bg-amber-100" />
        <div className="bg-secondary-800 absolute top-0 -right-[10%] aspect-square w-[140%] rounded-full" />
        <div className="bg-secondary-500 absolute top-[75%] right-[75%] aspect-square w-[40%] rounded-full" />
      </div>
      <ButterflySVG
        className="-translate-x-60 scale-110 max-[640px]:translate-x-0"
        scale={width <= 600 ? 0.3 : width <= 639 ? 0.4 : 1}
      />
      <h1 className="mx-auto translate-x-9 text-5xl font-light text-white max-[1081px]:translate-x-7 max-[1081px]:tracking-[3.7rem]! max-[978px]:tracking-[3.3rem]! max-[940px]:translate-x-5 max-[940px]:tracking-[2.6rem]! max-[838px]:tracking-[2.2rem]! max-[807px]:text-4xl! max-[703px]:text-3xl! max-[360px]:translate-x-5 max-[360px]:tracking-[2.5rem]! lg:tracking-[4.5rem] xl:tracking-[5rem] 2xl:translate-x-11 2xl:tracking-[6.5rem]">
        LUMO
      </h1>
    </div>
  );
};

export default RegistrationSecondPart;
