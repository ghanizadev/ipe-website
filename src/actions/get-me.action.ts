'use server';

import { cookies } from 'next/headers';

export default async function getMeAction(): Promise<{
  user?: UserDTO;
} | null> {
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
  return response.json();
}
