import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  loginPayloadSchema,
  type loginPayloadT,
} from '@/schema/auth/login.schema';
import { useAuthContext } from '@/providers/context/auth-context/AuthContext';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { Field, FieldError, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import InputPassword from './InputPassword';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';
import { Link } from 'react-router';
import { routes } from '@/routes/routes.config';
import { Checkbox } from './ui/checkbox';
import { useState } from 'react';

interface IProps {
  classNames?: {
    inputClassName?: string;
  };
}

const FormLogin = ({ classNames = {} }: IProps) => {
  const form = useForm<loginPayloadT>({
    resolver: zodResolver(loginPayloadSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      username: 'johndoe',
      password: 'SecurePass123!',
    },
  });
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const { login, isLoadingLoggingIn } = useAuthContext();

  const onSubmit: SubmitHandler<loginPayloadT> = (data) => {
    console.log('Yes', data);
    login(data, {
      onSuccess: (data) => {
        console.log('Yes success', data);
        toast.success('Login successful!');
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

  const isSubmitting = form.formState.isSubmitting || isLoadingLoggingIn;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      noValidate
    >
      <Controller
        name="username"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Username</FieldLabel>

            <Input
              className={`${classNames.inputClassName} rounded-full`}
              {...field}
              id={field.name}
              type="text"
              placeholder="Enter your Username"
              autoComplete="username"
              disabled={isSubmitting}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>

            <InputPassword
              className={`${classNames.inputClassName} rounded-full`}
              field={field}
              id={field.name}
              disabled={isSubmitting}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Link
        className="hover:text-secondary-400 ml-auto! text-sm underline! decoration-1! underline-offset-4! transition-colors duration-300"
        to={routes.FORGET_PASSWORD.path}
      >
        Forget Password ?
      </Link>
      <Button
        type="submit"
        disabled={isSubmitting || !isAgree}
        className="w-full rounded-full"
      >
        {isSubmitting ? <Spinner className="size-6" /> : 'Log in'}
      </Button>

      <div className="flex items-start gap-3">
        <Checkbox
          className="select-none!"
          id="terms"
          disabled={isSubmitting}
          checked={isAgree}
          onCheckedChange={(checked) => {
            setIsAgree(checked === true);
          }}
        />

        <label
          htmlFor="terms"
          className="cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the{' '}
          <Link
            to={routes.TERMS?.path ?? '/terms'}
            target="_blank"
            className="hover:text-secondary-400 font-bold underline! decoration-1! underline-offset-2! transition-colors duration-300"
          >
            terms and conditions
          </Link>
        </label>
      </div>
    </form>
  );
};

export default FormLogin;
