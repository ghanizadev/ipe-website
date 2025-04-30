'use server';

import { Page } from '@/payload-types';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

export default async function getPageBySlug(
  pageSlug: string
): Promise<Page | undefined> {
  const payload = await getPayload({ config: payloadConfig });
  const paginatedResponse = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: pageSlug,
      },
    },
  });

  return paginatedResponse.docs[0];
}
