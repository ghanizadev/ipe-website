import { Enrollment } from '@/payload-types';
import { Event } from '@/payload-types';
import moment from 'moment';
import { RedirectType, redirect } from 'next/navigation';
import React from 'react';

import Link from '@/components/link';
import RichText from '@/components/rich-text';

import { getUserAuth } from '@/actions/get-user-auth.action';

import cancelEnrollmentAction from './_actions/cancel-enrollment.action';
import findEnrollmentsAction from './_actions/find-enrollments.action';
import CancelEnrollmentButton from './_components/cancel-enrollment-button';

function getStatus(enrollment?: Enrollment) {
  let label = 'Inscrição confirmada';
  let color = 'text-yellow-700';
  let message =
    'Sua vaga está reservada, porém ainda não identificamos o pagamento da sua taxa de inscrição. Page a taxa de inscrição antes do término do prazo para garantir sua vaga.';

  const event = enrollment?.event as Event;
  if (enrollment?.payment?.paid) {
    label = 'Pagamento confirmado';
    color = 'text-green-700';
    message =
      'Está tudo certo! Por agora, veja como se preparar para o evento logo abaixo, no campo de instruções.';
  } else if (
    event?.dueDate &&
    new Date(event?.dueDate).getTime() <= Date.now()
  ) {
    label = 'Encerrado';
    color = 'text-gray-700';
    message =
      'Este evento está encerrado. Fique atento para novos eventos na página inicial.';
  }

  return (
    <span>
      <span className={`${color} font-bold`}>{label}</span> - {message}
    </span>
  );
}

export default async function Account() {
  const { user } = await getUserAuth();
  if (!user) {
    return redirect('/', RedirectType.replace);
  }

  const myEnrollments = await findEnrollmentsAction(user.id);

  const enrollments = (myEnrollments ?? []).filter(
    (enrollment) => typeof enrollment.event === 'object' && enrollment.event?.id
  );

  return (
    <div className={'m-4'}>
      <h4 className={'mb-2 font-bold'}>Minhas inscrições</h4>
      {!myEnrollments?.length && (
        <div className={'text-gray-600 p-4'}>
          <p>
            Você ainda não se inscreveu em nenhum evento. Confira os próximos
            eventos na nossa <Link href={'/'}>página inicial</Link>.
          </p>
        </div>
      )}
      {!enrollments.length ? (
        <p className={'my-4 text-neutral-500'}>Nenhuma inscrição</p>
      ) : (
        <></>
      )}
      {enrollments.map((enrollment) => {
        const event = enrollment.event as Event;
        return (
          <div
            key={enrollment.id}
            className={'relative rounded border-2 border-gray-100 p-4'}
          >
            <div className={'mb-4 font-bold leading-none'}>
              <span className={'text-2xl leading-none'}>{event?.title}</span>
            </div>
            <small className={'text-gray-600'}>{event?.standFirst}</small>
            <p className={'my-4 text-lg leading-none text-[--primary]'}>
              Geral
            </p>
            <p>Data do evento: {moment(event?.date).format('L')}</p>
            <p>Término das inscrições: {moment(event?.dueDate).format('L')}</p>
            <p>Local: {event?.location}</p>
            <p>
              Taxa de inscrição: R$ {event?.fee?.toFixed(2).replace('.', ',')}
            </p>
            <p className={'my-1'}>{getStatus(enrollment)}</p>
            <p className={'my-4 text-lg leading-none text-[--primary]'}>
              Instruções
            </p>
            {event?.instructions && (
              <RichText nodes={event?.instructions as LexicalNodes} />
            )}
            <div className={'absolute right-2 top-2 my-2'}></div>
            {!enrollment.payment?.paid && (
              <CancelEnrollmentButton
                enrollmentId={enrollment.id}
                action={cancelEnrollmentAction}
              />
            )}
            <br />
            <small className={'text-gray-500'}>
              Caso você tenha alguma dúvida quanto a pagamento, cancelamento e
              outras instruções, entre em contato por qualquer um dos nossos{' '}
              <Link href={'/contato'}>canais de atendimento</Link>.
            </small>
          </div>
        );
      })}
    </div>
  );
}
