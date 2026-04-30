import { useForgetPassword } from '@/features/auth/hooks/useForgetPassword';
import {
  forgetPasswordPayloadSchema,
  type forgetPasswordPayloadT,
} from '@/schema/auth/forgetPassword.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { Field, FieldError, FieldLabel } from './ui/field';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';
import { Input } from './ui/input';

interface IProps {
  classNames?: {
    inputClassName?: string;
  };
}

const FormForgetPassword = ({ classNames = {} }: IProps) => {
  const form = useForm<forgetPasswordPayloadT>({
    resolver: zodResolver(forgetPasswordPayloadSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const { mutateResendForgetPassword, isLoadingResendForgetPassword } =
    useForgetPassword();

  const onSubmit: SubmitHandler<forgetPasswordPayloadT> = (data) => {
    console.log('Yes', data);
    mutateResendForgetPassword(data, {
      onSuccess: (data) => {
        console.log('Yes success', data);
        toast.success(data.message);
      },

      onError: (data) => {
        console.log('No, Failed', data);
        if (isAxiosError(data) && data.response?.data?.message) {
          toast.error(data.response.data.message);
        } else {
          toast.error('An error occurred, but no message was provided');
        }
      },
    });
  };

  const isSubmitting =
    form.formState.isSubmitting || isLoadingResendForgetPassword;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      noValidate
    >
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>

            <Input
              className={`${classNames.inputClassName} rounded-full`}
              {...field}
              id={field.name}
              type="text"
              placeholder="Enter your email"
              autoComplete="email"
              disabled={isSubmitting}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full"
      >
        {isSubmitting ? <Spinner className="size-6" /> : 'Send Code'}
      </Button>
    </form>
  );
};

export default FormForgetPassword;
