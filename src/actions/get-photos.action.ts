'use server';

import { Photo } from '@/payload-types';
import payloadConfig from '@payload-config';
import { PaginatedDocs, getPayload } from 'payload';

import cachePublicContent from '@/helpers/cache-public-content.helper';

const getPhotos = cachePublicContent(
  'photos',
  async (page: number, limit: number): Promise<PaginatedDocs<Photo>> => {
    const payload = await getPayload({ config: payloadConfig });

    return await payload.find({
      collection: 'photos',
      limit,
      page,
      overrideAccess: true,
    });
  }
);

export default async function getPhotosAction(
  page: number,
  limit = 15
): Promise<PaginatedDocs<Photo>> {
  return getPhotos(page, limit);
}
