'use client';

import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect } from 'react';

import PrimaryButton from '@/components/button/primary-button';
import { TextInput } from '@/components/input';
import Link from '@/components/link';
import { RecaptchaInput } from '@/components/recaptcha-input';

import { SERVER_URL } from '@/constants/server';

type LoginFormProps = {
  redirect?: string;
  loginAction: (
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

export default function LoginForm(props: LoginFormProps) {
  const router = useRouter();
  const [formState, formAction] = useActionState(props.loginAction, {
    success: false,
  });

  useEffect(() => {
    if (formState.success) {
      if (props.redirect) {
        try {
          const url = new URL(`${SERVER_URL}${props.redirect}`);
          router.push(url.pathname + url.search);
        } catch {
          router.push('/conta');
        }
      } else {
        router.push('/conta');
      }
    }
  }, [formState, router, props.redirect]);

  return (
    <form action={formAction} className={'flex flex-col'}>
      <TextInput
        label={'E-mail'}
        name={'email'}
        error={formState.error?.email?.[0]}
      />
      <TextInput
        label={'Senha'}
        name={'password'}
        type={'password'}
        error={formState.error?.password?.[0]}
      />
      <RecaptchaInput />
      <Link
        href={'/esqueci-minha-senha'}
        className={'mb-8 self-end text-sm text-[--primary] underline'}
      >
        Esqueci minha senha
      </Link>
      <PrimaryButton tag={'button'}>Entrar</PrimaryButton>
    </form>
  );
}
