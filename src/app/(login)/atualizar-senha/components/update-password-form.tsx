'use client';

import React, { useState } from 'react';

import PrimaryButton from '@/components/button/primary-button';
import { TextInput } from '@/components/input';

import grecaptchaService from '@/services/grecapcha.service';

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

    const grecaptchaToken = await grecaptchaService();
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
    </form>
  );
}
