import { Event } from '@/payload-types';

import EventItem from '@/components/events/event-item';
import { H2 } from '@/components/typography';

export default function Events(props: { events: Event[] }) {
  return (
    <section className={'my-16 px-4'}>
      <H2>Próximos eventos</H2>
      {!props.events.length && (
        <div className={'text-gray-600 p-4'}>
          <p>Não há eventos ativos no momento.</p>
        </div>
      )}
      {props.events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </section>
  );
}
