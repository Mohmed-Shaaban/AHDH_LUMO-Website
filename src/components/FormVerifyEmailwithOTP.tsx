import { useVerifyEmailwithOTP } from '@/features/auth/hooks/useVerifyEmailwithOTP';
import {
  verifyEmailwithOTPPayloadSchema,
  type verifyEmailwithOTPPayloadT,
} from '@/schema/auth/verifyEmailwithOTP.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Field, FieldError } from './ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';
import { CountdownRender } from './CountdownRender';
import { useUserByToken } from '@/features/user/hooks/useUserByToken';
import { useAuthContext } from '@/providers/context/auth-context/AuthContext';
import { setCookie } from '@/utils/TS-Cookie';

interface IProps {
  email?: string;
}

const FormVerifyEmailwithOTP = ({ email }: IProps) => {
  const { mutateVerifyEmailwithOTP, isLoadingVerifyEmailwithOTP } =
    useVerifyEmailwithOTP();
  const { token } = useAuthContext();
  const { refetchUserByToken } = useUserByToken(token);

  const form = useForm<verifyEmailwithOTPPayloadT>({
    resolver: zodResolver(verifyEmailwithOTPPayloadSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email,
      otp: '',
    },
  });

  const onSubmit: SubmitHandler<verifyEmailwithOTPPayloadT> = (data) => {
    mutateVerifyEmailwithOTP(data, {
      onSuccess: (data) => {
        setCookie({ name: 'token', value: data.data.accessToken, days: 7 });
        window.dispatchEvent(new Event('auth-change'));
        refetchUserByToken();
      },
    });
  };

  const isSubmitting =
    form.formState.isSubmitting || isLoadingVerifyEmailwithOTP;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col items-start gap-6"
      noValidate
    >
      <p className="text-muted-foreground text-sm">
        Enter the 6-digit code sent to{' '}
        {email ? (
          <span className="font-bold">{email}</span>
        ) : (
          <span className="text-red-500">No email provided</span>
        )}
      </p>

      <Controller
        name="otp"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="items-center">
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={(value) => {
                field.onChange(value);

                if (value.length === 6) {
                  form.handleSubmit(onSubmit)();
                }
              }}
              disabled={isSubmitting}
            >
              <InputOTPGroup className="flex w-full gap-3">
                <InputOTPSlot
                  className="flex-1 rounded-full! border border-gray-300 p-3 py-5! text-center"
                  index={0}
                />
                <InputOTPSlot
                  className="flex-1 rounded-full border border-gray-300 p-3 py-5! text-center"
                  index={1}
                />
                <InputOTPSlot
                  className="flex-1 rounded-full border border-gray-300 p-3 py-5! text-center"
                  index={2}
                />
                <InputOTPSlot
                  className="flex-1 rounded-full border border-gray-300 p-3 py-5! text-center"
                  index={3}
                />
                <InputOTPSlot
                  className="flex-1 rounded-full border border-gray-300 p-3 py-5! text-center"
                  index={4}
                />
                <InputOTPSlot
                  className="flex-1 rounded-full! border border-gray-300 p-3 py-5! text-center"
                  index={5}
                />
              </InputOTPGroup>
            </InputOTP>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <CountdownRender initialSeconds={60 * 1} />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full"
      >
        {isSubmitting ? <Spinner className="size-6" /> : 'Verify Email'}
      </Button>
    </form>
  );
};

export default FormVerifyEmailwithOTP;
