'use server';

import { Event } from '@/payload-types';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

export default async function getEventsAction(): Promise<Event[]> {
  const payload = await getPayload({ config: payloadConfig });
  const paginatedResponse = await payload.find({
    collection: 'events',
    where: {
      date: {
        greater_than: new Date(),
      },
    },
    limit: 5,
    sort: ['date', 'dueDate'],
    overrideAccess: true,
  });

  return paginatedResponse?.docs ?? [];
}
