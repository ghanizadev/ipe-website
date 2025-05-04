'use server';

import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

export async function getUser(userId: string) {
  const payload = await getPayload({ config: payloadConfig });
  return payload.findByID({
    collection: 'users',
    id: userId,
    overrideAccess: true,
  });
}
