import ButterflySVG from './svg/ButterflySVG';

interface IProps {
  classNames?: {
    container?: string;
    name?: string;
    logo?: string;
  };
  name?: string;
  isName?: boolean;
  isLogo?: boolean;
}

const Logo = ({
  classNames = {},
  name = 'LUMO',
  isName = true,
  isLogo = true,
}: IProps) => {
  return (
    <div className={`${classNames.container} flex flex-row items-center gap-2`}>
      {isLogo && <ButterflySVG className={`${classNames.logo}`} scale={0.08} />}
      {isName && (
        <span className={`${classNames.name} text-2xl font-bold`}>{name}</span>
      )}
    </div>
  );
};

export default Logo;
