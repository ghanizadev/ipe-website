'use server';

import { Page } from '@/payload-types';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

import cachePublicContent from '@/helpers/cache-public-content.helper';

const getPages = cachePublicContent('pages', async (): Promise<Page[]> => {
  const payload = await getPayload({ config: payloadConfig });
  const paginatedResponse = await payload.find({
    collection: 'pages',
    limit: 0,
    overrideAccess: true,
  });

  return paginatedResponse.docs;
});

export default async function getPagesAction(): Promise<Page[]> {
  return getPages();
}
