import ButtonMoveBack from '@/components/ButtonMoveBack';
import FormForgetPassword from '@/components/FormForgetPassword';

const ForgetPassword = () => {
  return (
    <div className="flex w-full flex-col gap-5 rounded-3xl">
      <ButtonMoveBack className="static!" />

      <h2 className="text-4xl font-bold">Forget Password</h2>

      <div className="flex flex-row gap-1 text-xs sm:text-sm">
        <span className="whitespace-nowrap">
          We will send a verification code to your email address
        </span>
      </div>
      <FormForgetPassword />
    </div>
  );
};

export default ForgetPassword;
