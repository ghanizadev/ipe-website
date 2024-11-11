'use server';

import { cookies } from 'next/headers';

export async function saveCookiesPreferencesAction(accept: boolean) {
  const expires = new Date();
  expires.setMonth(expires.getMonth() + 6);

  const cookieStore = await cookies();

  cookieStore.set('cookie-consent', accept ? 'true' : 'false', {
    expires,
    sameSite: 'strict',
    path: '/',
  });
}
