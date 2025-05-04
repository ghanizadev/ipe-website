'use server';

import { Event } from '@/payload-types';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

export default async function getEventBySlugAction(
  eventSlug?: string
): Promise<Event | undefined> {
  const payload = await getPayload({ config: payloadConfig });
  const paginatedResponse = await payload.find({
    collection: 'events',
    where: {
      slug: {
        equals: eventSlug,
      },
    },
    overrideAccess: true,
  });

  return paginatedResponse?.docs[0];
}
