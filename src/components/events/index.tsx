'use server';

import EventItem from '@/components/events/event-item';
import { H2 } from '@/components/typography';

import getEvents from '@/services/get-events.service';

export default async function Events() {
  const events = await getEvents();

  return (
    <section className={'my-16 px-4'}>
      <H2>Próximos eventos</H2>
      {events?.docs?.map((event) => <EventItem key={event.id} event={event} />)}
    </section>
  );
}
