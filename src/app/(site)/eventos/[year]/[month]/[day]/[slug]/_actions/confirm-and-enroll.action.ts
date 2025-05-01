'use server';

import payloadConfig from '@payload-config';
import { redirect } from 'next/navigation';
import { getPayload } from 'payload';
import { z } from 'zod';

import validateRecaptcha from '@/actions/validate-recaptcha.action';

const confirmAndEnrollSchema = z.object({
  userId: z.string(),
  eventId: z.string(),
  redirectTo: z.string(),
  name: z.string({ required_error: 'Por favor, informe seu nome.' }),
  email: z
    .string({ required_error: 'Por favor, informe seu e-mail.' })
    .email('O formato do e-mail é inválido'),
  birthday: z
    .string({ required_error: 'Por favor, informe sua data de aniversário.' })
    .date('O formato da data de aniversário é inválido'),
  address: z.string({ required_error: 'Por favor, informe o seu endereço.' }),
  cpf: z.string({ required_error: 'Por favor, informe seu CPF.' }),
  rg: z.string({ required_error: 'Por favor, informe seu RG.' }),
  modality: z
    .enum(['3km (caminhada)', '5km', '10km', '21km', '42km'], {
      required_error: 'Por favor, informe a modalidade da sua corrida.',
      message: 'Por favor, informe a modalidade da sua corrida.',
    })
    .optional(),
  'tshirt.type': z.enum(['masc', 'fem', 'inf'], {
    required_error: 'Por favor, informe o tipo da sua camiseta.',
    message: 'Por favor, informe o tipo da sua camiseta.',
  }),
  'tshirt.size': z.enum(['P', 'M', 'G', 'XG'], {
    required_error: 'Por favor, informe o tamanho da sua camiseta.',
    message: 'Por favor, informe o tamanho da sua camiseta.',
  }),
});

export default async function confirmAndEnrollAction(
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

  const validRecaptcha = await validateRecaptcha(recaptcha);

  if (!validRecaptcha) {
    return {
      success: false,
    };
  }

  const jsonData = Object.fromEntries(formData.entries());
  const validateData = confirmAndEnrollSchema.safeParse(jsonData);

  if (!validateData.success) {
    return {
      success: false,
      error: validateData.error.flatten().fieldErrors,
    };
  }

  if (!validateData.data.userId) {
    return redirect('/entrar?redirect=' + validateData.data.redirectTo);
  }

  const payload = await getPayload({ config: payloadConfig });
  const updatedUser = await payload.update({
    collection: 'users',
    id: validateData.data.userId,
    data: {
      gender: 'nda',
      name: validateData.data.name,
      email: validateData.data.email,
      address: validateData.data.address,
      birthday: new Date(validateData.data.birthday).toISOString(),
      cpf: validateData.data.cpf,
      rg: validateData.data.rg,
      tshirt: {
        type: validateData.data['tshirt.type'],
        size: validateData.data['tshirt.size'],
      },
    },
    overrideAccess: true,
  });

  if (!updatedUser) {
    return {
      success: false,
    };
  }

  const enrollment = await payload.create({
    collection: 'enrollments',
    data: {
      user: validateData.data.userId,
      event: validateData.data.eventId,
      modality: validateData.data.modality,
    },
    overrideAccess: true,
  });

  if (!enrollment) {
    return {
      success: false,
    };
  }

  redirect('/conta/eventos');
}
