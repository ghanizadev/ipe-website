'use server';

import { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import PrimaryButton from '@/components/button/primary-button';
import Form from '@/components/form';
import { TextInput } from '@/components/input';
import Modal from '@/components/modal';
import RichText from '@/components/rich-text';
import SelectInput from '@/components/select';
import { H3 } from '@/components/typography';

import getEventBySlug from '@/services/get-event-by-slug.service';
import getMeServerService from '@/services/get-me-server.service';

import makeEventLink from '@/helpers/make-event-link.helper';

import { tshirtSizes, tshirtTypes } from '@/constants/account.constants';

import confirmAndEnrollAction from './_actions/confirm-and-enroll.action';
import EnrollmentButton from './_components/enrollment-button';
import ShareBar from './_components/share-bar';

type PageProps = {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
};

export default async function EventPage(props: PageProps) {
  const { slug } = await props.params;
  const { register } = await props.searchParams;
  const heads = await headers();
  const pathname = heads.get('next-url');

  const cookieStore = await cookies();

  const me = await getMeServerService(cookieStore.get('payload-token')?.value);
  const event = await getEventBySlug(slug);

  if (!event) {
    return notFound();
  }

  return (
    <>
      <div className={'m-auto max-w-screen-xl'}>
        <h1
          className={
            'lg:6xl my-8 text-center text-4xl font-extrabold text-[--secondary]'
          }
        >
          {event.title}
        </h1>
        <div
          className={
            'my-16 flex flex-col items-center justify-center text-center'
          }
        >
          <div className={'w-2/3'}>
            <p className={'text-gray-600'}>{event.standFirst}</p>
          </div>
        </div>
        <Image
          src={process.env.NEXT_PUBLIC_CMS_URL + event.image.url}
          alt={''}
          width={event.image.width}
          height={event.image.height}
          className={
            'w-full h-72 max-h-72 md:h-[32em] md:max-h-[32em] object-cover'
          }
        />
        <div
          className={
            'flex justify-end items-center my-4 py-2 border-b-2 border-gray-100'
          }
        >
          <p className={'text-gray-600'}>Compartilhe:</p>
          <ShareBar link={makeEventLink(event)} title={event.title} />
        </div>
        <RichText html={event.html} className={'my-8'} />
        <div className={'mb-16 flex items-center justify-center'}>
          <EnrollmentButton event={event} />
        </div>
      </div>
      {register && (
        <Modal title={'Inscrição'}>
          <p className={'mb-4'}>Confirme seus dados e envie sua inscrição</p>
          <Form<
            Partial<UserDTO>,
            { eventId: string; redirectUrl: string; userId?: string }
          >
            action={confirmAndEnrollAction}
            additionalData={{
              eventId: event.id,
              userId: me?.user?.id,
              redirectUrl: pathname ?? '/',
            }}
          >
            <TextInput
              className={'mb-2'}
              label={'Nome'}
              name={'name'}
              defaultValue={me?.user?.name}
              readonly
              required
            />
            <TextInput
              className={'mb-2'}
              label={'E-mail'}
              name={'email'}
              defaultValue={me?.user?.email}
              readonly
              required
            />
            <H3>Documentação</H3>
            <TextInput
              className={'mb-2'}
              label={'Data de Nascimento'}
              name={'birthday'}
              type={'date'}
              defaultValue={me?.user?.birthday}
              required
            />
            <TextInput
              className={'mb-2'}
              label={'CPF (Certidão de Pessoa Física)'}
              name={'cpf'}
              defaultValue={me?.user?.cpf}
              required
            />
            <TextInput
              className={'mb-2'}
              label={'RG (Registro Geral)'}
              name={'rg'}
              defaultValue={me?.user?.rg}
              required
            />
            <H3>Camiseta</H3>
            <SelectInput
              className={'mb-2'}
              label={'Tipo da Camiseta'}
              name={'tshirt.type'}
              defaultValue={me?.user?.tshirt?.type}
              options={tshirtTypes}
              required
            />
            <SelectInput
              className={'mb-4'}
              label={'Tamanho da Camiseta'}
              name={'tshirt.size'}
              defaultValue={me?.user?.tshirt?.size}
              options={tshirtSizes}
              required
            />
            <small>
              <span className={'text-red-600'}>*</span> Campos obrigatórios.
            </small>
            <div className='mt-4 flex items-center justify-end rounded-b border-t border-gray-200 py-4 md:py-5'>
              <PrimaryButton tag={'button'} type={'submit'}>
                Salvar e Inscrever-se
              </PrimaryButton>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  return {
    title: `${event?.title ?? ''} / IPE - Inclusão Pelo Esporte`,
    openGraph: {
      title: event?.title,
      description: event?.standFirst,
      images: {
        height: event?.image.height,
        width: event?.image.width,
        alt: event?.image.altText,
        url: `${process.env.NEXT_PUBLIC_URL}${event?.image.url}`,
      },
    },
  };
}
