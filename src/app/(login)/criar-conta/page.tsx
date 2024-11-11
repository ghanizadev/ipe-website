import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

import Link from '@/components/link';

import CreateAccountForm from './_components/create-account-form';

export default async function SignUp() {
  return (
    <div className={'flex h-[100vh] w-[100vw] items-center justify-center'}>
      <div
        className={
          'grid h-auto max-w-2xl grid-cols-1 grid-rows-1 overflow-hidden rounded-2xl md:border-2 md:border-[--primary] 2xl:max-w-screen-xl 2xl:grid-cols-2'
        }
      >
        <section className={'m-auto flex flex-col p-16'}>
          <h3
            className={
              'mb-4 text-2xl font-bold leading-none tracking-tight text-[--primary] md:text-2xl lg:text-4xl'
            }
          >
            Crie sua conta
          </h3>
          <span className={'text-md mb-6 text-gray-700 lg:text-xl'}>
            Preencha com seus dados para criar sua conta
          </span>
          <CreateAccountForm />
          <div
            className={
              'my-8 flex w-full flex-row items-center justify-center text-center'
            }
          >
            <div className={'h-0.5 w-full bg-gray-200'}></div>
            <span className={'mx-1 text-gray-500'}>ou</span>
            <div className={'h-0.5 w-full bg-gray-200'}></div>
          </div>
          <span>
            Já possui uma conta?{' '}
            <Link href={'/entrar'}>Entre com seu e-mail e senha</Link>
          </span>
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
  title: 'Crie sua conta / IPE - Inclusão Pelo Esporte',
};
