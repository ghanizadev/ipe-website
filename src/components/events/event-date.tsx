'use client';

export function EventDate(props: { date: string }) {
  const formattedDate = new Date(props.date);
  const hour = `${formattedDate.getHours().toString()}:${formattedDate.getMinutes().toString().padStart(2, '0')}`;
  const day = `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}`;

  return (
    <>
      <h3 className={'mr-2 text-2xl font-bold leading-none text-red-800'}>
        Dia {day}
      </h3>
      <p className={'mr-2 text-lg leading-none text-[--primary]'}>
        às {hour} horas
      </p>
    </>
  );
}
