import ButtonMoveBack from '@/components/ButtonMoveBack';
import FormVerifyEmailwithOTP from '@/components/FormVerifyEmailwithOTP';
import { routes } from '@/routes/routes.config';
import { getCookie } from '@/utils/TS-Cookie';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';

const VerifyEmailwithOTP = () => {
  const email = getCookie({ name: 'email' });
  const verificationCode = getCookie({ name: 'verificationCode' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!verificationCode || !email) {
      navigate(routes.HOME.path);
    }
  }, [navigate, email, verificationCode]);

  return (
    <div className="flex w-full flex-col gap-5 rounded-3xl">
      <ButtonMoveBack className="static!" />

      <h2 className="text-4xl font-bold">Verification Code</h2>

      <div className="flex flex-row gap-1 text-xs sm:text-sm">
        <span className="whitespace-nowrap">Already have an account?</span>
        <Link
          className="hover:text-secondary-400 font-bold whitespace-nowrap underline! decoration-1! underline-offset-2! transition-colors duration-300"
          to={routes.LOGIN.path}
        >
          Log in
        </Link>
      </div>

      <FormVerifyEmailwithOTP email={email} />
    </div>
  );
};

export default VerifyEmailwithOTP;
