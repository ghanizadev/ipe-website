'use server';

import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

export default async function removeAccountAction(
  userId: string
): Promise<void> {
  const payload = await getPayload({ config: payloadConfig });

  await payload.update({
    collection: 'users',
    where: {
      id: {
        equals: userId,
      },
    },
    data: {
      softDelete: new Date().toISOString(),
    },
  });
}
