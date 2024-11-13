import { Metadata } from 'next';
import React from 'react';

import PrimaryButton from '@/components/button/primary-button';
import Form from '@/components/form';
import { TextInput } from '@/components/input';
import Link from '@/components/link';
import { H1, P } from '@/components/typography';

import sendForgotPasswordResetAction from './_actions/send-forgot-password-reset.action';

export default async function ForgotMyPasswordPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const { sent } = await searchParams;

  return (
    <div className={'flex h-[100vh] w-[100vw] items-center justify-center'}>
      <section
        className={
          'm-auto flex flex-col rounded-2xl p-16 md:border-2 md:border-[--primary]'
        }
      >
        {!sent && (
          <>
            <H1>Esqueci minha senha</H1>
            <P>Informe o e-mail que você usa para acessar sua conta</P>
            <Form
              action={sendForgotPasswordResetAction}
              className={'flex flex-col'}
            >
              <TextInput
                label={'Email'}
                name={'email'}
                type={'email'}
                className={'mb-4'}
              />
              <PrimaryButton tag={'button'}>Enviar</PrimaryButton>
              <small className={'text-gray-400 my-4'}>
                Este site é protegido pelo reCAPTCHA e as{' '}
                <Link href='https://policies.google.com/privacy'>
                  Políticas de Privacidade
                </Link>{' '}
                e os{' '}
                <Link href='https://policies.google.com/terms'>
                  Termos de Serviço
                </Link>{' '}
                da Google são aplicáveis.
              </small>
            </Form>
          </>
        )}
        {sent && (
          <>
            <H1>Mensagem enviada!</H1>
            <P>
              Um e-mail foi enviado para o endereço informado, caso ele exista.
            </P>
            <PrimaryButton tag={'anchor'} href={'/'}>
              Ir para o início
            </PrimaryButton>
          </>
        )}
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Esqueci minha senha / IPE - Inclusão Pelo Esporte',
};
