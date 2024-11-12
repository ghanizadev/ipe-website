export default function makeEventLink(event: EventDTO): string {
  const date = new Date(event.createdAt);
  return `${process.env.NEXT_PUBLIC_URL}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/${event.slug}`;
}
