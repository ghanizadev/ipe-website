'use client';

import { useUser } from '@/context/user.context';
import { Event } from '@/payload-types';
import { useSearchParams } from 'next/navigation';

import Modal from '@/components/modal';

import confirmAndEnrollAction from '../_actions/confirm-and-enroll.action';
import UpdateAndSubmitForm from './update-and-submit-form';

type EventRegistrationModalProps = {
  event: Event;
  redirectTo: string;
};

export default function EventRegistrationModal({
  event,
  redirectTo,
}: EventRegistrationModalProps) {
  const searchParams = useSearchParams();
  const [user] = useUser();

  if (!user || searchParams.get('register') !== '1') return null;

  return (
    <Modal title={'Inscrição'}>
      <p className={'mb-4'}>Confirme seus dados e envie sua inscrição</p>
      <UpdateAndSubmitForm
        event={event}
        redirectTo={redirectTo}
        updateAndEnrollAction={confirmAndEnrollAction}
      />
    </Modal>
  );
}
