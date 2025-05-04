'use server';

import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

export default async function findEnrollmentsAction(userId: string) {
  const payload = await getPayload({ config: payloadConfig });
  const paginatedResponse = await payload.find({
    collection: 'enrollments',
    where: {
      user: {
        equals: userId,
      },
    },
  });

  return paginatedResponse.docs;
}
