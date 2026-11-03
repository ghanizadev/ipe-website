'use server';

import { Partner } from '@/payload-types';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

import cachePublicContent from '@/helpers/cache-public-content.helper';

const getPartners = cachePublicContent(
  'partners',
  async (): Promise<Partner[]> => {
    const payload = await getPayload({ config: payloadConfig });
    const paginatedResponse = await payload.find({
      collection: 'partners',
      limit: 0,
      overrideAccess: true,
    });

    return paginatedResponse.docs;
  }
);

export default async function getPartnersAction(): Promise<Partner[]> {
  return getPartners();
}
