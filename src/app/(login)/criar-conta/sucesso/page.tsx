import { Metadata } from 'next';
import Image from 'next/image';
import React, { Suspense } from 'react';

import GoBackLink from './_components/go-back-link';

export default async function SignUpSuccessPage() {
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
            Conta criada com sucesso!
          </h3>
          <span className={'mb-6 text-base text-gray-700'}>
            Um link de confirmação foi enviado para seu e-mail. Antes de
            continuar, por favor, valide sua conta por este link de confirmação.
          </span>
          <Suspense>
            <GoBackLink />
          </Suspense>
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
  title: 'Conta criada com sucesso / IPE - Inclusão Pelo Esporte',
};
