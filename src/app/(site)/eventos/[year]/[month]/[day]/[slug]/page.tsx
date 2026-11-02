'use server';

import { Media } from '@/payload-types';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import EventStatus from '@/components/events/event-status';
import RichText from '@/components/rich-text';

import getAllEventsAction from '@/actions/get-all-events.action';

import makeEventLink from '@/helpers/make-event-link.helper';

import { SERVER_URL } from '@/constants/server';

import getEventBySlugAction from '@/app/(site)/eventos/[year]/[month]/[day]/[slug]/_actions/get-event-by-slug.action';

import EnrollmentButton from './_components/enrollment-button';
import EventRegistrationModal from './_components/event-registration-modal';
import ShareBar from './_components/share-bar';

type PageProps = {
  params: Promise<Record<string, string>>;
};

export async function generateStaticParams() {
  const events = await getAllEventsAction();

  return events.map((event) => {
    const [, , year, month, day, slug] = makeEventLink(event).split('/');
    return { year, month, day, slug };
  });
}

export default async function EventPage(props: PageProps) {
  const { slug, year, month, day } = await props.params;

  const event = await getEventBySlugAction(slug);

  if (!event) {
    return notFound();
  }

  const url = `/eventos/${year}/${month}/${day}/${slug}`;

  if (url !== makeEventLink(event)) {
    return notFound();
  }

  const image = event.image as Media;
  const imageWidth = image.width ?? 0;
  const imageHeight = image.height ?? 0;
  const imageUrl = image.url ?? '';

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
          src={imageUrl}
          alt={''}
          width={imageWidth}
          height={imageHeight}
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
          <ShareBar
            link={`${SERVER_URL}${makeEventLink(event)}`}
            title={event.title}
          />
        </div>
        {event?.content && (
          <RichText nodes={event.content as LexicalNodes} className={'my-8'} />
        )}
        <div className={'mb-16 flex items-center justify-center'}>
          {new Date(event.dueDate ?? 0).getTime() > Date.now() ? (
            <EnrollmentButton event={event} />
          ) : (
            <EventStatus event={event} />
          )}
        </div>
      </div>
      <Suspense fallback={null}>
        <EventRegistrationModal event={event} redirectTo={url} />
      </Suspense>
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlugAction(slug);

  if (!event) return {};

  const image = event.image as Media;
  const imageWidth = image.width ?? 0;
  const imageHeight = image.height ?? 0;
  const imageAltText = image.altText ?? '';
  const imageUrl = image.url ?? '';

  return {
    title: `${event?.title ?? ''} / IPE - Inclusão Pelo Esporte`,
    description: event?.standFirst,
    openGraph: {
      title: event?.title,
      description: event?.standFirst,
      url: SERVER_URL + makeEventLink(event),
      siteName: 'IPE - Inclusão Pelo Esporte',
      images: {
        height: imageHeight,
        width: imageWidth,
        alt: imageAltText,
        url: `${SERVER_URL}${imageUrl}`,
      },
    },
  };
}
