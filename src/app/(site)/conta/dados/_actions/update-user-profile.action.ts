'use server';

import payloadConfig from '@payload-config';
import { headers as nextHeaders } from 'next/headers';
import { getPayload } from 'payload';
import { z } from 'zod';

const updateUserSchema = z.object({
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

export default async function updateUserProfileAction(
  initialState: {
    success: boolean;
    error?: Record<string, string[] | undefined>;
  },
  formData: FormData
): Promise<{
  success: boolean;
  error?: Record<string, string[] | undefined>;
}> {
  const headers = await nextHeaders();
  const payload = await getPayload({ config: payloadConfig });

  const auth = await payload.auth({ headers });

  if (!auth.user) {
    return {
      success: false,
    };
  }

  const jsonData = Object.fromEntries(formData.entries());
  const validateData = updateUserSchema.safeParse(jsonData);

  if (!validateData.success) {
    return {
      success: false,
      error: validateData.error.flatten().fieldErrors,
    };
  }

  const updateResult = await payload.update({
    collection: 'users',
    id: auth.user?.id,
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
  });

  if (!updateResult) {
    return {
      success: false,
    };
  }

  return {
    success: true,
  };
}
