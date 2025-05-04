'use client';

import React, { useActionState } from 'react';

import PrimaryButton from '@/components/button/primary-button';
import { TextInput } from '@/components/input';
import Link from '@/components/link';
import { RecaptchaInput } from '@/components/recaptcha-input';

type ForgotPasswordFormProps = {
  forgotPasswordAction: (
    initialState: {
      success: boolean;
      error?: Record<string, string[] | undefined>;
    },
    formData: FormData
  ) => Promise<{
    success: boolean;
    error?: Record<string, string[] | undefined>;
  }>;
};

export function ForgotPasswordForm(props: ForgotPasswordFormProps) {
  const [formState, formAction] = useActionState(props.forgotPasswordAction, {
    success: false,
  });

  return (
    <form action={formAction} className={'flex flex-col'}>
      <TextInput
        label={'Email'}
        name={'email'}
        type={'email'}
        className={'mb-4'}
        error={formState.error?.email?.[0]}
      />
      <RecaptchaInput />
      <PrimaryButton tag={'button'}>Enviar</PrimaryButton>
      <small className={'text-gray-400 my-4'}>
        Este site é protegido pelo reCAPTCHA e as{' '}
        <Link href='https://policies.google.com/privacy'>
          Políticas de Privacidade
        </Link>{' '}
        e os{' '}
        <Link href='https://policies.google.com/terms'>Termos de Serviço</Link>{' '}
        da Google são aplicáveis.
      </small>
    </form>
  );
}
