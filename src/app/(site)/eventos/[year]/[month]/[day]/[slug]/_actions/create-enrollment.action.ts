'use server';

import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

export default async function createEnrollmentAction(
  eventId: string,
  userId: string
) {
  const payload = await getPayload({ config: payloadConfig });

  const enrollment = await payload.create({
    collection: 'enrollments',
    data: {
      event: eventId,
      user: userId,
    },
    overrideAccess: true,
  });

  return !!enrollment;
}
