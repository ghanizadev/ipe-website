'use server';

import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

import validateRecaptcha from '@/actions/validate-recaptcha.action';

export default async function verifyAccountAction(
  initialState: { success: boolean; done: boolean },
  formData: FormData
): Promise<{ success: boolean; done: boolean }> {
  const recaptcha = formData.get('recaptcha')?.toString();

  if (!recaptcha) {
    return {
      success: false,
      done: true,
    };
  }
  const isValid = await validateRecaptcha(recaptcha);
  if (!isValid) {
    return {
      success: false,
      done: true,
    };
  }

  const token = formData.get('token')?.toString();

  if (!token) {
    return {
      success: false,
      done: true,
    };
  }

  const payload = await getPayload({ config: payloadConfig });

  const success = await payload.verifyEmail({
    collection: 'users',
    token,
  });

  if (!success) {
    return {
      success: false,
      done: true,
    };
  }

  return { success: true, done: true };
}
