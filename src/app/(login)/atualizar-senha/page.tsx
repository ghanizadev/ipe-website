import { Metadata } from 'next';
import { Suspense } from 'react';
import React from 'react';

import { H1, P } from '@/components/typography';

import updatePasswordAction from './_actions/update-password.action';
import UpdatePasswordForm from './_components/update-password-form';

export default function UpdatePasswordPage() {
  return (
    <div className={'flex h-[100vh] w-[100vw] items-center justify-center'}>
      <section
        className={
          'm-auto flex flex-col rounded-2xl p-16 md:border-2 md:border-[--primary]'
        }
      >
        <H1>Redefina sua senha</H1>
        <P>Informe o e-mail que você usa para acessar sua conta</P>
        <Suspense fallback={null}>
          <UpdatePasswordForm updatePasswordAction={updatePasswordAction} />
        </Suspense>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Atualize sua senha / IPE - Inclusão Pelo Esporte',
};
