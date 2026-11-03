'use client';

import { useSearchParams } from 'next/navigation';

import PrimaryButton from '@/components/button/primary-button';
import { H1, P } from '@/components/typography';

import { ForgotPasswordForm } from '@/app/(login)/esqueci-minha-senha/_components/forgot-password-form';

import forgotPasswordAction from '../_actions/forgot-password.action';

export default function ForgotPasswordContent() {
  const sent = useSearchParams().get('sent');

  return (
    <div className='flex h-[100vh] w-[100vw] items-center justify-center'>
      <section className='m-auto flex flex-col rounded-2xl p-16 md:border-2 md:border-[--primary]'>
        {!sent && (
          <>
            <H1>Esqueci minha senha</H1>
            <P>Informe o e-mail que você usa para acessar sua conta</P>
            <ForgotPasswordForm forgotPasswordAction={forgotPasswordAction} />
          </>
        )}
        {sent && (
          <>
            <H1>Mensagem enviada!</H1>
            <P>
              Um e-mail foi enviado para o endereço informado, caso ele exista.
            </P>
            <PrimaryButton tag='anchor' href='/'>
              Ir para o início
            </PrimaryButton>
          </>
        )}
      </section>
    </div>
  );
}
