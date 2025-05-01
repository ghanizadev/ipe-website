'use client';

import React, { useActionState, useEffect, useRef } from 'react';

import PrimaryButton from '@/components/button/primary-button';
import { TextInput } from '@/components/input';
import TextArea from '@/components/textarea';
import notificationEvent from '@/components/toast/toast-event';

type ContactFormProps = {
  action: (
    initialState: {
      success: boolean;
      error?: Record<string, string[] | undefined>;
    },
    formData: FormData
  ) => Promise<{
    success: boolean;
    error?: Record<string, string[] | undefined>;
  }>;
};

export default function ContactForm(props: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction] = useActionState(props.action, {
    success: false,
  });

  useEffect(() => {
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
      <TextInput className={'mb-2'} label={'Nome'} name={'name'} required />
      <TextInput
        className={'mb-2'}
        label={'E-mail'}
        name={'email'}
        type={'email'}
        required
      />
      <TextInput
        className={'mb-2'}
        label={'Telefone/Whatsapp'}
        name={'phone'}
        type={'phone'}
      />
      <TextArea
        className={'mb-2'}
        label={'Mensagem'}
        name={'message'}
        required
      />
      <PrimaryButton tag={'button'} className={'float-right'} type={'submit'}>
        Enviar
      </PrimaryButton>
    </form>
  );
}
