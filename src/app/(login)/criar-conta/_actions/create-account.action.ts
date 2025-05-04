'use server';

import payloadConfig from '@payload-config';
import { getPayload } from 'payload';
import { z } from 'zod';

import validateRecaptcha from '@/actions/validate-recaptcha.action';

const createUserSchema = z.object({
  email: z
    .string({
      message: 'E-mail é obrigatório',
    })
    .email('O e-mail é inválido'),
  role: z.enum(['guide', 'parathlete'], {
    message: 'O tipo de conta é obrigatório',
  }),
  gender: z.enum(['m', 'f', 'other'], {
    message:
      'Por favor, informe o seu gênero. Caso prefira não informar, selecione "Prefiro não dizer".',
  }),
  name: z
    .string({
      message: 'Nome é obrigatório',
    })
    .min(2, 'O nome deve ter pelo menos 3 caracteres'),
  birthday: z
    .string({
      message: 'Data de nascimento é obrigatória',
    })
    .date('A data de nascimento deve ser no formato DD/MM/AAAA.'),
  password: z
    .string({
      message: 'A senha é obrigatória',
    })
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/,
      'A senha deve possuir letras maiúsculas, letras minúsculas, e números, com 8 letras no mínimo.'
    ),
  pwdClassification: z
    .enum(['physical', 'intelectual', 'visual'], {
      message: 'Por favor, informe a sua classificação PCD.',
    })
    .optional(),
  'confirm-password': z.string({
    message: 'Confirme a senha',
  }),
  'accept-terms': z.enum(['on', 'off'], {
    message: 'Você deve aceitar os termos para prosseguir',
  }),
});

type FormState = {
  success: boolean;
  error?: Record<string, string[] | undefined>;
};

export default async function createAccountAction(
  initialState: FormState,
  formData: FormData
): Promise<FormState> {
  const recaptcha = formData.get('recaptcha')?.toString();

  if (!recaptcha)
    return {
      success: false,
    };

  const isValid = await validateRecaptcha(recaptcha);

  if (!isValid)
    return {
      success: false,
    };

  const jsonData = Object.fromEntries(formData.entries());
  const validateFields = createUserSchema.safeParse(jsonData);

  if (!validateFields.success)
    return {
      success: false,
      error: validateFields.error.flatten().fieldErrors,
    };

  const error: Record<string, string[]> = {};

  if (
    validateFields.data.password !== validateFields.data['confirm-password']
  ) {
    error.password = ['As senhas não conferem.'];
    error['confirm-password'] = ['As senhas não conferem.'];
  }

  if (validateFields.data['accept-terms'] !== 'on') {
    error['accept-terms'] = ['Você deve aceitar os termos para prosseguir'];
  }

  if (Object.keys(error).length > 0)
    return {
      success: false,
      error,
    };

  const payload = await getPayload({ config: payloadConfig });

  const exists = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: validateFields.data.email,
      },
    },
    overrideAccess: true,
  });

  if (exists.totalDocs)
    return {
      success: false,
      error: {
        email: ['O e-mail já está em uso'],
      },
    };

  await payload.create({
    collection: 'users',
    data: {
      role: validateFields.data.role,
      email: validateFields.data.email,
      name: validateFields.data.name,
      birthday: validateFields.data.birthday,
      password: validateFields.data.password,
      gender: validateFields.data.gender,
      pwdClassification: validateFields.data.pwdClassification,
    },
    overrideAccess: true,
  });

  return {
    success: true,
  };
}
