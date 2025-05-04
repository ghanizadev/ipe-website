'use server';

import { Redirect } from '@/payload-types';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

export default async function getRedirectsAction(): Promise<Redirect[]> {
  const payload = await getPayload({ config: payloadConfig });
  const paginatedResponse = await payload.find({
    collection: 'redirects',
    limit: 0,
    overrideAccess: true,
  });

  return paginatedResponse.docs;
}
