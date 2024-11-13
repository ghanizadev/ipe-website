import moment from 'moment';
import { RedirectType, redirect } from 'next/navigation';
import React from 'react';

import Link from '@/components/link';
import RichText from '@/components/rich-text';

import getMeAction from '@/actions/get-me.action';
import getUserAction from '@/actions/get-user.action';

import cancelEnrollmentAction from './_actions/cancel-enrollment.action';
import findEnrollmentsAction from './_actions/find-enrollments.action';
import CancelEnrollmentButton from './_components/cancel-enrollment-button';

function getStatus(enrollment?: EnrollmentDTO) {
  let label = 'Inscrição confirmada';
  let color = 'text-yellow-700';
  let message =
    'Sua vaga está reservada, porém ainda não identificamos o pagamento da sua taxa de inscrição. Page a taxa de inscrição antes do término do prazo para garantir sua vaga.';

  if (enrollment?.payment?.paid) {
    label = 'Pagamento confirmado';
    color = 'text-green-700';
    message =
      'Está tudo certo! Por agora, veja como se preparar para o evento logo abaixo, no campo de instruções.';
  } else if (
    enrollment?.event?.dueDate &&
    new Date(enrollment?.event?.dueDate).getTime() <= Date.now()
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
  const me = await getMeAction();

  if (!me?.user) {
    return redirect('/', RedirectType.replace);
  }

  const { myEnrollments } = await findEnrollmentsAction(me.user.id);

  return (
    <div className={'m-4'}>
      <h4 className={'mb-2 font-bold'}>Minhas inscrições</h4>
      {myEnrollments?.map((enrollment) => {
        const event = enrollment.event;
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
            <p>Data do evento: {moment(enrollment.event?.date).format('L')}</p>
            <p>
              Término das inscrições:{' '}
              {moment(enrollment.event?.dueDate).format('L')}
            </p>
            <p>Local: {enrollment.event?.location}</p>
            <p>
              Taxa de inscrição: R${' '}
              {enrollment.event?.fee?.toFixed(2).replace('.', ',')}
            </p>
            <p className={'my-1'}>{getStatus(enrollment)}</p>
            <p className={'my-4 text-lg leading-none text-[--primary]'}>
              Instruções
            </p>
            <RichText html={enrollment.event?.instructionsHtml} />
            <div className={'absolute right-2 top-2 my-2'}></div>
            {!enrollment.payment?.paid && (
              <CancelEnrollmentButton
                enrollmentId={enrollment.id}
                action={cancelEnrollmentAction}
                updateAction={getUserAction}
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
