'use server';

import { Event } from '@/payload-types';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

import cachePublicContent from '@/helpers/cache-public-content.helper';

const getAllEvents = cachePublicContent(
  'all-events',
  async (): Promise<Event[]> => {
    const payload = await getPayload({ config: payloadConfig });
    const paginatedResponse = await payload.find({
      collection: 'events',
      limit: 0,
      overrideAccess: true,
    });

    return paginatedResponse.docs;
  }
);

export default async function getAllEventsAction(): Promise<Event[]> {
  return getAllEvents();
}
