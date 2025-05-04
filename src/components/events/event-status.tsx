import { Event } from '@/payload-types';

type EventStatusProps = {
  event: Event;
};

export default function EventStatus(props: EventStatusProps) {
  const { event } = props;

  const now = new Date();
  const date = new Date(event.date);

  if (event.dueDate && now.getTime() >= new Date(event.dueDate).getTime()) {
    if (now.getTime() >= date.getTime())
      return (
        <span
          className={'text-gray-600  w-min text-nowrap rounded px-1 py-0.5'}
          data-testid={'event-status'}
        >
          Finalizado
        </span>
      );

    return (
      <span
        className={'text-gray-600  w-min text-nowrap rounded px-1 py-0.5'}
        data-testid={'event-status'}
      >
        Inscrições encerradas
      </span>
    );
  }

  return (
    <span
      className={'text-gray-600 w-min text-nowrap rounded px-1 py-0.5'}
      data-testid={'event-status'}
    >
      Inscrições abertas
    </span>
  );
}
