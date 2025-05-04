'use client';

import React, { useActionState, useEffect, useRef } from 'react';

import PrimaryButton from '@/components/button/primary-button';
import { TextAreaInput, TextInput } from '@/components/input';
import { RecaptchaInput } from '@/components/recaptcha-input';
import notificationEvent from '@/components/toast/toast-event';

type ContactFormProps = {
  action: (
    initialState: {
      success: boolean;
      done: boolean;
      error?: Record<string, string[] | undefined>;
    },
    formData: FormData
  ) => Promise<{
    success: boolean;
    done: boolean;
    error?: Record<string, string[] | undefined>;
  }>;
};

export default function ContactForm(props: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction] = useActionState(props.action, {
    success: false,
    done: false,
  });

  useEffect(() => {
    if (formState.done)
      if (formState.success) {
        notificationEvent({
          title: 'Sucesso',
          message: 'a mensagem foi enviada.',
          type: 'success',
        });
        formRef.current?.reset();
      } else {
        notificationEvent({
          title: 'Erro',
          message: 'a mensagem não foi enviada, tente novamente mais tarde.',
          type: 'error',
        });
      }
  }, [formState]);

  return (
    <form ref={formRef} id={'contact-form'} action={formAction}>
      <TextInput
        className={'mb-2'}
        label={'Nome'}
        name={'name'}
        required
        error={formState.error?.name?.[0]}
      />
      <TextInput
        className={'mb-2'}
        label={'E-mail'}
        name={'email'}
        type={'email'}
        required
        error={formState.error?.email?.[0]}
      />
      <TextInput
        className={'mb-2'}
        label={'Telefone/Whatsapp'}
        name={'phone'}
        type={'phone'}
        error={formState.error?.phone?.[0]}
      />
      <TextAreaInput
        className={'mb-2'}
        label={'Mensagem'}
        name={'message'}
        required
        error={formState.error?.message?.[0]}
      />
      <RecaptchaInput />
      <PrimaryButton tag={'button'} className={'float-right'} type={'submit'}>
        Enviar
      </PrimaryButton>
    </form>
  );
}
