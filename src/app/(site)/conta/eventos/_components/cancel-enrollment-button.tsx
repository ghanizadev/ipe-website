'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import callAlert from '@/components/alert/call-alert';
import SecondaryButton from '@/components/button/secondary-button';

type CancelEnrollmentButtonProps = {
  enrollmentId: string;
  action: (args: { enrollmentId: string }) => Promise<void>;
  updateAction: () => Promise<any>;
};

export default function CancelEnrollmentButton(
  props: CancelEnrollmentButtonProps
) {
  const router = useRouter();

  const handleCancelEnrollment = async () => {
    const { status } = await callAlert('confirmation', {
      title: 'Deseja mesmo cancelar esta inscrição?',
      message:
        'É possivel cancelar sua inscrição se ela não estiver paga ainda.\nAlém disso, você poderá se reinscrever neste mesmo evento, porém não pode ser que não tenha mais vagas.\n\nAo aceitar, você concorda em desistir da sua reserva.',
    });

    if (status === 'confirm') {
      await props.action({ enrollmentId: props.enrollmentId });
      router.refresh();
    }
  };

  useEffect(() => {
    props.updateAction();
  }, []);

  return (
    <SecondaryButton
      tag={'button'}
      className={
        'mb-2 mt-4 w-full border-red-700 text-red-700 md:float-right md:mb-0 md:w-fit'
      }
      onClick={handleCancelEnrollment}
    >
      Cancelar inscrição
    </SecondaryButton>
  );
}
