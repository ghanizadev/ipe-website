'use client';

import React, { useActionState } from 'react';

import PrimaryButton from '@/components/button/primary-button';
import { TextInput } from '@/components/input';
import Link from '@/components/link';
import { RecaptchaInput } from '@/components/recaptcha-input';

type UpdatePasswordFromProps = {
  updatePasswordAction: (
    initialState: {
      success: boolean;
      error?: Record<string, string[] | undefined>;
    },
    formData: FormData
  ) => Promise<{
    success: boolean;
    error?: Record<string, string[] | undefined>;
  }>;
  token: string;
};

export default function UpdatePasswordForm(props: UpdatePasswordFromProps) {
  const [formState, formAction] = useActionState(props.updatePasswordAction, {
    success: false,
  });

  return (
    <form action={formAction} className={'flex flex-col'}>
      <TextInput
        error={formState.error?.password?.[0]}
        label={'Nova senha'}
        name={'password'}
        type={'password'}
      />
      <TextInput
        error={formState.error?.['confirm-password']?.[0]}
        label={'Confirme a senha'}
        name={'confirm-password'}
        type={'password'}
        className={'mb-4'}
      />
      <input type={'hidden'} name={'token'} value={props.token} />
      <RecaptchaInput />
      <PrimaryButton tag={'button'}>Salvar</PrimaryButton>
      <small className={'text-gray-400 my-4'}>
        Este site é protegido pelo reCAPTCHA e a{' '}
        <Link href='https://policies.google.com/privacy'>
          Políticas de Privacidade
        </Link>{' '}
        da Google e os seus{' '}
        <Link href='https://policies.google.com/terms'>Termos de Serviço</Link>{' '}
        são válidos.
      </small>
    </form>
  );
}
