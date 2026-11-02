'use server';

import { Page } from '@/payload-types';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

import cachePublicContent from '@/helpers/cache-public-content.helper';

const getPageBySlug = cachePublicContent(
  'page-by-slug',
  async (pageSlug: string): Promise<Page | undefined> => {
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
);

export default async function getPageBySlugAction(
  pageSlug: string
): Promise<Page | undefined> {
  return getPageBySlug(pageSlug);
}
