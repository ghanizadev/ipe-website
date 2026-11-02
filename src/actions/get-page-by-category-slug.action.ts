'use server';

import { Page } from '@/payload-types';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

import cachePublicContent from '@/helpers/cache-public-content.helper';

const getPageByCategorySlug = cachePublicContent(
  'page-by-category-slug',
  async (categorySlug: string): Promise<Page | undefined> => {
    const payload = await getPayload({ config: payloadConfig });
    const paginatedResponse = await payload.find({
      collection: 'pages',
      where: {
        'category.slug': {
          equals: categorySlug,
        },
      },
    });

    return paginatedResponse.docs[0];
  }
);

export default async function getPageByCategorySlugAction(
  categorySlug: string
): Promise<Page | undefined> {
  return getPageByCategorySlug(categorySlug);
}
