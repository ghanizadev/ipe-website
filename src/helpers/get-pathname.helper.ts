'use server';

import { headers } from 'next/headers';

export default async function getPathname() {
  const headersList = await headers(),
    origin = headersList.get('origin') || '',
    referer = headersList.get('referer') || '',
    path = referer.replace(origin, '');

  if (path) {
    return new URL(path);
  }
}
