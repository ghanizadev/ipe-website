'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import PrimaryButton from '@/components/button/primary-button';
import { TextInput } from '@/components/input';

import grecaptchaService from '@/services/grecapcha.service';

import formEventParser from '@/helpers/form-event-parser.helper';

type LoginFormProps = {
  redirect?: string;
  action: (args: LoginUserDTO) => Promise<ActionResponse>;
};

export default function LoginForm(props: LoginFormProps) {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const grecaptchaToken = await grecaptchaService();
    const formData = formEventParser<LoginUserDTO>(e);

    const response = await props.action({ ...formData, grecaptchaToken });
    if (response?.success) {
      if (props.redirect) {
        try {
          const url = new URL(props.redirect);
          const ownUrl = new URL(process.env.NEXT_PUBLIC_URL!);

          if (url.hostname === ownUrl.hostname) {
            router.push(url.pathname + url.search);
            return;
          }
        } catch {}
      }

      router.push('/conta');
      return;
    }

    setError('Email e/ou senha incorretos');
  };

  return (
    <form onSubmit={handleSubmit} className={'flex flex-col'}>
      <TextInput label={'E-mail'} name={'email'} error={!!error} />
      <TextInput
        label={'Senha'}
        name={'password'}
        type={'password'}
        error={error}
      />
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
