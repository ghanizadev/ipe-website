'use server';

import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

export default async function getProducts(page = 1) {
  const payload = await getPayload({ config: payloadConfig });
  return payload.find({
    collection: 'products',
    limit: 0,
    page,
    overrideAccess: true,
  });
}
