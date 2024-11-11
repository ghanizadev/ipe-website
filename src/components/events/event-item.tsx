'use server';

import Image from 'next/image';
import Link from 'next/link';

import SecondaryButton from '@/components/button/secondary-button';

type EventProps = {
  event: EventDTO;
};

export default async function EventItem(props: EventProps) {
  const {
    title,
    location,
    slug,
    date,
    standFirst,
    image: { height, width, url },
  } = props.event;

  const formattedDate = new Date(date);
  const hour = `${formattedDate.getHours().toString()}:${formattedDate.getMinutes().toString().padStart(2, '0')}`;
  const day = `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}`;

  const path = `/eventos/${formattedDate.getFullYear()}/${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${slug}`;

  return (
    <div className={'grid gap-4 lg:grid-cols-6'}>
      <div className={'col-span-3 flex flex-col items-end lg:col-span-2'}>
        <Image
          src={process.env.NEXT_PUBLIC_CMS_URL + url}
          alt={'alt'}
          width={width}
          height={height}
          className={'rounded-2xl object-cover'}
        />
      </div>
      <div
        className={
          'col-span-3 flex flex-row flex-wrap items-end lg:col-span-1 lg:flex-col lg:items-end'
        }
      >
        <h3 className={'mr-2 text-2xl font-bold leading-none text-red-800'}>
          Dia {day}
        </h3>
        <p className={'mr-2 text-lg leading-none text-[--primary]'}>
          às {hour} horas
        </p>
        <p
          className={
            'text-md font-base mr-2 w-full leading-none text-gray-500 lg:text-right lg:text-lg'
          }
        >
          {location}
        </p>
      </div>
      <div className={'col-span-3 flex flex-col lg:col-span-3'}>
        <Link
          href={path}
          className={'text-2xl font-bold text-[--primary] underline'}
        >
          {title}
        </Link>
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
