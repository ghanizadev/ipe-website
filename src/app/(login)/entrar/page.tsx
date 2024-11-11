import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

import SecondaryButton from '@/components/button/secondary-button';
import { H1, P } from '@/components/typography';

import loginAction from './actions/login.action';
import LoginForm from './components/login-form';

type PageProps = {
  searchParams: Promise<Record<string, string>>;
};

export default async function SignInPage({ searchParams }: PageProps) {
  const { redirect } = await searchParams;

  return (
    <div className={'flex h-[100vh] w-[100vw] items-center justify-center'}>
      <div
        className={
          'grid h-auto max-w-2xl grid-cols-1 grid-rows-1 overflow-hidden rounded-2xl md:border-2 md:border-[--primary] 2xl:max-w-screen-xl 2xl:grid-cols-2'
        }
      >
        <section className={'m-auto flex flex-col p-16'}>
          <H1>Bem-vindo de volta!</H1>
          <P>Entre com suas credenciais para acessar sua conta</P>
          <LoginForm redirect={redirect} action={loginAction} />
          <div
            className={
              'my-8 flex w-full flex-row items-center justify-center text-center'
            }
          >
            <div className={'h-0.5 w-full bg-gray-200'}></div>
            <span className={'mx-1 text-gray-500'}>ou</span>
            <div className={'h-0.5 w-full bg-gray-200'}></div>
          </div>
          <SecondaryButton tag={'anchor'} href={'/criar-conta'}>
            Criar um conta
          </SecondaryButton>
        </section>
        <section className={'hidden 2xl:block'}>
          <Image
            src={'/hero.jpg'}
            alt={''}
            width={1920}
            height={850}
            className={'h-full w-full object-cover'}
          />
        </section>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Entre / IPE - Inclusão Pelo Esporte',
};
