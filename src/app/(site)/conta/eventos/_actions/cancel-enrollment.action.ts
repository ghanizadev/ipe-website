'use server';

import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

export default async function cancelEnrollmentAction({
  enrollmentId,
}: {
  enrollmentId: string;
}) {
  const payload = await getPayload({ config: payloadConfig });
  await payload.delete({
    collection: 'enrollments',
    id: enrollmentId,
    overrideAccess: true,
  });
}
