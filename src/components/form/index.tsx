'use client';

import _ from 'lodash';
import { useRouter } from 'next/navigation';
import React from 'react';

import grecaptchaService from '@/services/grecapcha.service';

import formEventParser from '@/helpers/form-event-parser.helper';

type FormProps<T, U> = {
  children?: React.ReactNode;
  action: (value: T & U) => void | Promise<void>;
  additionalData?: U;
  className?: string;
  refresh?: boolean;
};

export default function Form<
  T = Record<string, string>,
  U = Record<string, string>,
>(props: FormProps<T, U>) {
  const { action, children, additionalData, className, refresh } = props;

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const grecaptchaToken = await grecaptchaService();
    const formData = formEventParser<T>(e);
    _.merge(formData, additionalData, { grecaptchaToken });
    await action(formData as T & U);
    if (refresh) router.refresh();
  };
  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
