'use server';

import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

import cachePublicContent from '@/helpers/cache-public-content.helper';

const getProductsCached = cachePublicContent(
  'products',
  async (page: number) => {
    const payload = await getPayload({ config: payloadConfig });
    return payload.find({
      collection: 'products',
      limit: 0,
      page,
      overrideAccess: true,
    });
  }
);

export default async function getProducts(page = 1) {
  return getProductsCached(page);
}
