'use client';

import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import PrimaryButton from '@/components/button/primary-button';
import Link from '@/components/link';

type CookiesConsentProps = {
  action: (accepts: boolean) => Promise<void>;
  hasConsented?: boolean;
};

export default function CookieConsent(props: CookiesConsentProps) {
  const [classStr, setClassStr] = useState(
    'fixed z-50 bottom-0 left-0 right-0 overflow-y-auto overflow-x-hidden p-4 md:bottom-5 md:left-5 md:right-auto hidden'
  );

  if (props.hasConsented) {
  }

  const handleConsent = (accept: boolean) => {
    return async () => {
      await props.action(accept);
    };
  };

  useEffect(() => {
    if (!props.hasConsented)
      setTimeout(() => {
        setClassStr((classStr) => classStr.slice(0, classStr.length - 7));
      }, 3000);
    else {
      setClassStr((classStr) => classStr + ' hidden');
    }
  }, [props.hasConsented]);

  return (
    <div id='cookie-modal' tabIndex={-1} className={classStr}>
      <div className='relative inset-0 max-h-full w-full max-w-lg shadow-backdrop drop-shadow-lg'>
        <div className='relative rounded-lg bg-[--secondary] shadow text-white'>
          <div className='flex items-center justify-between rounded-t border-b p-4 md:p-5'>
            <h3 className='text-xl font-bold text-white'>Nós usamos cookies</h3>
          </div>
          <div className={'p-4'}>
            <p>
              Nós usamos cookies primariamente para analisar e aprimorar sua
              experiência. Ao aceitar, você aceita o nosso uso destes cookies.
              Você pode alterar suas preferencias ou aprender mais sobre a nossa
              política de cookies.
            </p>
            <PrimaryButton
              tag={'button'}
              className={
                'bg-white hover:bg-[--primary] text-[--secondary] w-full my-2'
              }
              onClick={handleConsent(true)}
            >
              Aceitar todos
            </PrimaryButton>
            <PrimaryButton
              tag={'button'}
              className={
                'bg-white hover:bg-[--primary] text-[--secondary] w-full my-2'
              }
              onClick={handleConsent(false)}
            >
              Recusar todos
            </PrimaryButton>
            <div>
              <Link
                href={'/politicas-de-privacidade'}
                className={'text-white my-2 mr-2 hover:text-[--primary]'}
              >
                Políticas de Privacidade
              </Link>
              |
              <Link
                href={'/termos-de-uso'}
                className={'text-white my-2 ml-2 hover:text-[--primary]'}
              >
                Termos de Uso e Serviço
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
