'use server';

import payloadConfig from '@payload-config';
import { redirect } from 'next/navigation';
import { getPayload } from 'payload';
import { z } from 'zod';

import validateRecaptcha from '@/actions/validate-recaptcha.action';

const updatePasswordSchema = z.object({
  token: z.string({
    required_error: 'Requisição inválida. Tente novamente mais tarde.',
  }),
  password: z
    .string({
      required_error: 'A senha não pode ser vazia',
    })
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/,
      'A senha deve possuir letras maiúsculas, letras minúsculas, e números, com 8 letras no mínimo.'
    ),
  'confirm-password': z.string({
    required_error: 'Confirme a senha',
  }),
});

export default async function updatePasswordAction(
  initialState: {
    success: boolean;
    error?: Record<string, string[] | undefined>;
  },
  formData: FormData
): Promise<{ success: boolean; error?: Record<string, string[] | undefined> }> {
  const recaptcha = formData.get('recaptcha')?.toString();
  if (!recaptcha) return { success: false };

  const isValid = await validateRecaptcha(recaptcha);
  if (!isValid) return { success: false };

  const jsonData = Object.fromEntries(formData.entries());
  const validateFields = updatePasswordSchema.safeParse(jsonData);

  if (!validateFields.success)
    return {
      success: false,
      error: validateFields.error.flatten().fieldErrors,
    };

  if (
    validateFields.data.password !== validateFields.data['confirm-password']
  ) {
    return {
      success: false,
      error: {
        password: [' '],
        'confirm-password': ['As senhas não conferem.'],
      },
    };
  }

  const payload = await getPayload({ config: payloadConfig });

  await payload.resetPassword({
    collection: 'users',
    data: {
      password: validateFields.data.password,
      token: validateFields.data.token,
    },
    overrideAccess: true,
  });

  redirect('/entrar?create=password-updated');
}
