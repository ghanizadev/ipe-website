'use server';

import type { User } from '@/payload-types';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';
import { SafeParseReturnType, z } from 'zod';

import validateGRecaptcha from '@/actions/validate-grecaptcha.action';

const createUserSchema = z.object({
  email: z
    .string({
      required_error: 'E-mail é obrigatório',
    })
    .email(),
  name: z.string({
    required_error: 'Nome é obrigatório',
  }),
  birthday: z
    .string({
      required_error: 'Data de nascimento é obrigatória',
    })
    .date(),
  password: z
    .string({
      required_error: 'A senha é obrigatória',
    })
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/,
      'A senha deve possuir letras maiúsculas, letras minúsculas, e números, com 8 letras no mínimo.'
    ),
  'confirm-password': z.string({
    required_error: 'Confirme a senha',
  }),
  'accept-terms': z.boolean({
    required_error: 'Você deve aceitar os termos para prosseguir',
  }),
});

type CreateUserForm = z.infer<typeof createUserSchema>;

export default async function createAccountAction(
  initialState: SafeParseReturnType<CreateUserForm, CreateUserForm>,
  formData: FormData
): Promise<SafeParseReturnType<CreateUserForm, CreateUserForm>> {
  const grecaptchaToken = formData.get('grecaptchaToken')?.toString();

  if (!grecaptchaToken)
    return {
      success: false,
      error: {},
    };

  const isValid = validateGRecaptcha(grecaptchaToken);

  if (!isValid)
    return {
      success: false,
    };

  const validateFields = createUserSchema.safeParse(formData);

  const {
    'confirm-password': confirmPassword,
    'accept-terms': acceptTerms,
    ...userData
  } = formData
    .entries()
    .reduce(
      (acc, curr) => ({ ...acc, [curr[0]]: curr[1] }),
      {} as User & { 'confirm-password': string; 'accept-terms': boolean }
    );
  const errors: Record<string, string> = {};
  let isOk = true;

  if (!userData.email) {
    errors.email = 'E-mail é obrigatório';
    isOk = false;
  }

  if (!userData.name) {
    errors.name = 'Nome é obrigatório';
    isOk = false;
  }

  if (!userData.birthday) {
    errors.birthday = 'Data de nascimento é obrigatória';
    isOk = false;
  }

  if (userData.password !== confirmPassword) {
    errors['confirm-password'] = 'As senhas não conferem';
    isOk = false;
  }

  if (!acceptTerms) {
    errors['accept-terms'] = 'Você deve aceitar os termos para prosseguir';
    isOk = false;
  }

  if (!isOk)
    return {
      success: false,
      errors,
    };

  const payload = await getPayload({ config: payloadConfig });

  await payload.create({
    collection: 'users',
    data: userData,
    overrideAccess: true,
  });

  return {
    success: true,
  };
}
