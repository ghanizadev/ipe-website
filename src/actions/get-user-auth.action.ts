'use server';

import payloadConfig from '@payload-config';
import { headers as nextHeaders } from 'next/headers';
import { getPayload } from 'payload';

export async function getUserAuth() {
  const headers = await nextHeaders();
  const payload = await getPayload({ config: payloadConfig });
  return payload.auth({ headers });
}
