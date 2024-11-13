'use server';

import { cookies } from 'next/headers';

export default async function getUserAction(): Promise<UserDTO | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get('payload-token')?.value;

  if (!token) return null;

  const init: RequestInit = {
    headers: {
      Cookie: `payload-token=${token}`,
    },
  };
  const response = await fetch(process.env.CMS_API_URL + '/api/users/me', init);

  if (!response.ok) return null;
  const body = await response.json();

  if (!body.user) {
    return null;
  }

  if (body.softDelete) {
    const expiresAt = new Date(body.softDelete);
    expiresAt.setDate(expiresAt.getDate() + 30);

    cookieStore.set('account-recovery', '1', {
      sameSite: 'strict',
      expires: expiresAt,
    });
  } else {
    cookieStore.set('account-recovery', '0', {
      expires: new Date(0),
    });
  }

  return body.user;
}
