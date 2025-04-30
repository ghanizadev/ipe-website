'use client';

import React, { useState } from 'react';

import PrimaryButton from '@/components/button/primary-button';
import { TextInput } from '@/components/input';
import Link from '@/components/link';

import recaptchaService from '@/services/recapcha.service';

import formEventParser from '@/helpers/form-event-parser.helper';

type UpdatePasswordParams = { password: string; 'confirm-password': string };

type UpdatePasswordFromProps = {
  action: (
    password: string,
    token: string,
    grecaptchaString: string
  ) => Promise<ActionResponse | void>;
  token: string;
};

export default function UpdatePasswordForm(props: UpdatePasswordFromProps) {
  const [errors, setErrors] = useState<{ [field: string]: string | boolean }>(
    {}
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { password, 'confirm-password': confirmPassword } =
      formEventParser<UpdatePasswordParams>(e);

    if (!password || password !== confirmPassword) {
      setErrors({
        'confirm-password': 'As senhas não conferem',
        password: true,
      });
      return;
    }

    const grecaptchaToken = await recaptchaService();
    const response = await props.action(password, props.token, grecaptchaToken);
    if (response?.success) setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className={'flex flex-col'}>
      <TextInput
        error={errors.password}
        label={'Nova senha'}
        name={'password'}
        type={'password'}
      />
      <TextInput
        error={errors['confirm-password']}
        label={'Confirme a senha'}
        name={'confirm-password'}
        type={'password'}
        className={'mb-4'}
      />
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
