import { Event } from '@/payload-types';

export default function makeEventLink(event: Event): string {
  const date = new Date(event.date);
  return `/eventos/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/${event.slug}`;
}
