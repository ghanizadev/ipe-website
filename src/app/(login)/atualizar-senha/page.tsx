import { Metadata } from 'next';
import React from 'react';

import { H1, P } from '@/components/typography';

import updatePasswordAction from './actions/update-password.action';
import UpdatePasswordForm from './components/update-password-form';

export default async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const { token } = await searchParams;

  return (
    <div className={'flex h-[100vh] w-[100vw] items-center justify-center'}>
      <section
        className={
          'm-auto flex flex-col rounded-2xl p-16 md:border-2 md:border-[--primary]'
        }
      >
        <H1>Redefina sua senha</H1>
        <P>Informe o e-mail que você usa para acessar sua conta</P>
        <UpdatePasswordForm token={token} action={updatePasswordAction} />
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Atualize sua senha / IPE - Inclusão Pelo Esporte',
};
