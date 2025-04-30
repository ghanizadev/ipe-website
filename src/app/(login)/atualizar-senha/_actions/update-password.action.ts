'use server';

import payloadConfig from '@payload-config';
import { redirect } from 'next/navigation';
import { getPayload } from 'payload';

import validateGRecaptcha from '@/actions/validate-grecaptcha.action';

export default async function updatePasswordAction(
  password: string,
  token: string,
  grecaptchaToken: string
) {
  const isValid = await validateGRecaptcha(grecaptchaToken);
  if (!isValid) return;

  const payload = await getPayload({ config: payloadConfig });
  await payload.resetPassword({
    collection: 'users',
    data: {
      password,
      token,
    },
    overrideAccess: true,
  });

  redirect('/entrar?create=password-updated');
}
