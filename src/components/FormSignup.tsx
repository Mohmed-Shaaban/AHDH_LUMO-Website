import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  signupPayloadSchema,
  type signupPayloadT,
} from '@/schema/auth/signup.schema';
import { useSignup } from '@/features/auth/hooks/useSignup';
import { Field, FieldError, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import InputPassword from './InputPassword';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';
import { Checkbox } from './ui/checkbox';
import { Link } from 'react-router';
import { routes } from '@/routes/routes.config';
import { useState } from 'react';

interface IProps {
  classNames?: {
    inputClassName?: string;
  };
}

const FormSignup = ({ classNames = {} }: IProps) => {
  const form = useForm<signupPayloadT>({
    resolver: zodResolver(signupPayloadSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      username: '',
      password: '',
      fullName: '',
    },
  });

  const { mutateSignup, isLoadingSignup } = useSignup();
  const [isAgree, setIsAgree] = useState<boolean>(false);

  const onSubmit: SubmitHandler<signupPayloadT> = (data) => {
    mutateSignup(data);
  };

  const isSubmitting = form.formState.isSubmitting || isLoadingSignup;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      noValidate
    >
      {/* Full Name */}
      <Controller
        name="fullName"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>

            <Input
              className={`${classNames.inputClassName} rounded-full`}
              {...field}
              id={field.name}
              type="text"
              placeholder="Enter your full name"
              disabled={isSubmitting}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Username */}
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
              placeholder="Enter your username"
              autoComplete="username"
              disabled={isSubmitting}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Email */}
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
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              disabled={isSubmitting}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Password */}
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

      {/* Terms */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="terms"
          disabled={isSubmitting}
          checked={isAgree}
          onCheckedChange={(checked) => {
            setIsAgree(checked === true);
          }}
        />

        <label htmlFor="terms" className="cursor-pointer text-sm leading-none">
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

      <Button
        type="submit"
        disabled={isSubmitting || !isAgree}
        className="w-full rounded-full"
      >
        {isSubmitting ? <Spinner className="size-6" /> : 'Create Account'}
      </Button>
    </form>
  );
};

export default FormSignup;
