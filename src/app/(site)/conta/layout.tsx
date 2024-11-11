'use server';

import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import LogoutButton from '@/app/(site)/conta/_components/logout-button';

type AccountLayoutPageProps = {
  children: React.ReactNode;
};

export default async function AccountLayout({
  children,
}: AccountLayoutPageProps) {
  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <div className={'mb-8 grid grid-cols-1 gap-4 md:grid-cols-sidebar'}>
        <aside
          className={
            'col-span-1 hidden w-44 border-r-2 border-gray-100 md:block'
          }
        >
          <h3 className={'mb-4 text-lg text-[--primary] lg:text-2xl'}>
            Minha conta
          </h3>
          <nav>
            <ul>
              <li className={'mb-2'}>
                <Link
                  className={'text-[--primary] underline'}
                  href={'/conta/eventos'}
                >
                  Meus eventos
                </Link>
              </li>
              <li className={'mb-2'}>
                <Link
                  className={'mb-2 text-[--primary] underline'}
                  href={'/conta/dados'}
                >
                  Minha conta
                </Link>
              </li>
              <li>
                <hr className='my-4 h-px border-0 bg-gray-200' />
              </li>
              <li className={'mb-2'}>
                <LogoutButton />
              </li>
            </ul>
          </nav>
        </aside>
        <div className={'col-span-1'}>{children}</div>
      </div>
    </>
  );
}
