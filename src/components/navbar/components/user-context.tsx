'use client';

import { useUser } from '@/context/user.context';
import React from 'react';

import PrimaryButton from '@/components/button/primary-button';
import LinkButton from '@/components/link-button';
import LogoutButton from '@/components/navbar/components/logout-button';

export function UserContext() {
  const user = useUser();

  return (
    <>
      {!user && (
        <>
          <li className={'m-auto'}>
            <PrimaryButton tag={'anchor'} href={'/entrar'}>
              Entrar
            </PrimaryButton>
          </li>
        </>
      )}
      <hr className='my-2 h-px border-0 bg-gray-200 md:hidden' />
      {user && (
        <>
          <li className={'m-auto text-[--primary-darker]'}>
            <LinkButton href='/conta'>
              Olá, {user.name?.split(' ')[0]}
            </LinkButton>
          </li>
          <li className={'m-auto md:hidden'}>
            <LinkButton href='/conta/eventos'>Meus eventos</LinkButton>
          </li>
          <li className={'m-auto md:hidden'}>
            <LinkButton href='/conta/dados'>Minha conta</LinkButton>
          </li>
          <li className={'m-auto text-red-700 md:hidden'}>
            <LogoutButton />
          </li>
        </>
      )}
    </>
  );
}
