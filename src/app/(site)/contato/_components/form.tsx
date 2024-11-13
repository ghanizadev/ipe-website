'use client';

import React, { useRef } from 'react';

import notificationEvent from '@/components/toast/toast-event';

import formEventParser from '@/helpers/form-event-parser.helper';

export default function ContactForm({
  children,
  action,
}: {
  children?: React.ReactNode;
  action: (formData: MessageDTO) => Promise<boolean>;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = formEventParser<MessageDTO>(e);
    const success = await action(formData);
    if (success) {
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
  };

  return (
    <form ref={formRef} id={'contact-form'} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
