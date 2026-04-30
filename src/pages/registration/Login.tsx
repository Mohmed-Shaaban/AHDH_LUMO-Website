import ButtonMoveBack from '@/components/ButtonMoveBack';
import FormLogin from '@/components/FormLogin';
import OAuthLogin from '@/components/OAuthLogin';
import { Separator } from '@/components/ui/separator';
import { routes } from '@/routes/routes.config';
import { Link } from 'react-router';

const Login = () => {
  return (
    <div className="flex w-full flex-col gap-5 rounded-3xl">
      <ButtonMoveBack className="static!" />
      <h2 className="text-4xl font-bold">Log in</h2>
      <div className="flex flex-row gap-1 text-xs sm:text-sm">
        <span className="whitespace-nowrap">Don’t have an account?</span>
        <Link
          className="hover:text-secondary-400 font-bold whitespace-nowrap underline! decoration-1! underline-offset-2! transition-colors duration-300"
          to={routes.SIGNUP.path}
        >
          Create an Account
        </Link>
      </div>
      <FormLogin />
      <Separator className="relative before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:p-2 before:text-gray-500 before:backdrop-blur-3xl before:content-['OR']" />
      <OAuthLogin />
    </div>
  );
};

export default Login;
