'use server';

import { Page } from '@/payload-types';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

export default async function getPagesAction(): Promise<Page[]> {
  const payload = await getPayload({ config: payloadConfig });
  const paginatedResponse = await payload.find({
    collection: 'pages',
    limit: 0,
    overrideAccess: true,
  });

  return paginatedResponse.docs;
}
