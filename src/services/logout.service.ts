'use server';

import payloadConfig from '@payload-config';
import { logout } from '@payloadcms/next/auth';
import { headers as nextHeaders } from 'next/headers';
import { getPayload } from 'payload';

export default async function logoutService() {
  const payload = await getPayload({ config: payloadConfig });
  const headers = await nextHeaders();
  const auth = await payload.auth({ headers });

  if (!auth.user) return;

  await logout({
    config: payloadConfig,
  });
}
