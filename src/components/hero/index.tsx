'use server';

import Image from 'next/image';

import PrimaryButton from '@/components/button/primary-button';

import { MOTIVATION } from '@/constants/content.constants';

export default async function Hero() {
  return (
    <div className={'py-18 grid lg:grid-cols-12 lg:grid-rows-1 lg:py-24'}>
      <div className={'col-span-6 p-4'}>
        <span
          className={
            'mb-4 text-lg leading-none tracking-tight text-[--primary] lg:text-xl'
          }
        >
          O mundo não muda com opiniões, muda com exemplos.
        </span>
        <h1
          className={
            'mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'
          }
        >
          Inclusão Pelo Esporte
        </h1>
        <p className={'mb-6 text-lg font-normal text-gray-500 lg:text-xl'}>
          {MOTIVATION}
        </p>
        <PrimaryButton tag={'anchor'} href={'/como-ajudar'}>
          Saiba como ajudar
        </PrimaryButton>
      </div>
      <div className={'col-span-6 hidden p-4 lg:block'}>
        <Image
          src={'/hero.jpg'}
          alt={''}
          width={1920}
          height={850}
          className={'h-[100%] rounded-2xl object-cover'}
        />
      </div>
    </div>
  );
}
