'use server';

import { headers } from 'next/headers';
import qs from 'qs';

const G_RECAPTCHA_URL = 'https://www.google.com/recaptcha/api/siteverify';

export default async function validateRecaptcha(
  token: string
): Promise<boolean> {
  if (process.env.IS_LOCALHOST) return true;

  const requestHeaders = await headers();
  const remoteip = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim();

  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify({
      response: token,
      secret: process.env.GRECAPTCHA_SECRET_KEY,
      remoteip,
    }),
  };

  const response = await fetch(G_RECAPTCHA_URL, init);
  if (!response.ok) {
    console.log('Recaptcha Error', await response.text());
    return true;
  }

  const body = await response.json();
  console.log(body);
  return body.success;
}
