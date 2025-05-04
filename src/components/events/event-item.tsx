import { Event, Media } from '@/payload-types';
import Image from 'next/image';
import Link from 'next/link';

import SecondaryButton from '@/components/button/secondary-button';
import { EventDate } from '@/components/events/event-date';
import EventStatus from '@/components/events/event-status';

import makeEventLink from '@/helpers/make-event-link.helper';

type EventProps = {
  event: Event;
};

export default function EventItem(props: EventProps) {
  const { title, location, date, standFirst, image } = props.event;

  const imageWidth = (image as Media)?.width ?? 0;
  const imageHeight = (image as Media)?.height ?? 0;
  const imageUrl = (image as Media)?.url ?? '';

  const path = makeEventLink(props.event);

  return (
    <div
      className={'grid gap-4 lg:grid-cols-6 mb-6'}
      data-testid={'event-card'}
    >
      <div className={'col-span-3 flex flex-col items-end lg:col-span-2'}>
        <Image
          src={imageUrl}
          alt={'alt'}
          width={imageWidth}
          height={imageHeight}
          className={'rounded-lg object-cover h-56'}
        />
      </div>
      <div
        className={
          'col-span-3 flex flex-row flex-wrap items-end lg:col-span-1 lg:flex-col lg:items-end'
        }
      >
        <EventDate date={date} />
        <p
          className={
            'text-md font-base mr-2 w-full leading-none text-gray-500 lg:text-right lg:text-lg'
          }
        >
          {location}
        </p>
      </div>
      <div className={'col-span-3 flex flex-col lg:col-span-3'}>
        <div className={'flex flex-col'}>
          <Link
            href={path}
            className={'text-2xl font-bold text-[--primary] underline'}
          >
            {title}
          </Link>
          <EventStatus event={props.event} />
        </div>
        <p className={'my-2'}>{standFirst}</p>
        <div className={'w-32 self-end'}>
          <SecondaryButton tag={'anchor'} href={path}>
            Saiba mais
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
