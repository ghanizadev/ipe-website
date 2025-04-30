'use server';

import payloadConfig from '@payload-config';
import { headers as nextHeaders } from 'next/headers';
import { getPayload } from 'payload';

export default async function recoverAccount() {
  const headers = await nextHeaders();

  const payload = await getPayload({ config: payloadConfig });
  const auth = await payload.auth({ headers });

  if (auth.user) {
    await payload.update({
      collection: 'users',
      where: {
        id: {
          equals: auth.user.id,
        },
      },
      data: {
        softDelete: null,
      },
    });
  }
}
