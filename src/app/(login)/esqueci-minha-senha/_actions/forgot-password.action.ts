'use server';

import payloadConfig from '@payload-config';
import { redirect } from 'next/navigation';
import { getPayload } from 'payload';
import { z } from 'zod';

import validateRecaptcha from '@/actions/validate-recaptcha.action';

const forgotSchema = z.object({
  email: z
    .string({ required_error: 'O e-mail precisa ser informado.' })
    .email('O formato do e-mail é inválido.'),
});

export default async function forgotPasswordAction(
  initialState: {
    success: boolean;
    error?: Record<string, string[] | undefined>;
  },
  formData: FormData
): Promise<{ success: boolean; error?: Record<string, string[] | undefined> }> {
  const recaptcha = formData.get('recaptcha')?.toString();

  if (!recaptcha) {
    return {
      success: false,
    };
  }

  const isValid = await validateRecaptcha(recaptcha);
  if (!isValid)
    return {
      success: false,
    };

  const jsonData = Object.fromEntries(formData.entries());
  const validateFields = forgotSchema.safeParse(jsonData);

  if (!validateFields.success)
    return {
      success: false,
      error: validateFields.error.flatten().fieldErrors,
    };

  const payload = await getPayload({ config: payloadConfig });

  await payload.forgotPassword({
    collection: 'users',
    data: {
      email: validateFields.data.email,
    },
  });

  redirect('/esqueci-minha-senha?sent=1');
}
