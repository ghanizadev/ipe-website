'use server';

import payloadConfig from '@payload-config';
import { cookies } from 'next/headers';
import { getPayload } from 'payload';
import { z } from 'zod';

import validateRecaptcha from '@/actions/validate-recaptcha.action';

const loginForm = z.object({
  email: z
    .string({ required_error: 'E-mail não informado.' })
    .email('O e-mail é inválido.'),
  password: z.string({ required_error: 'Senha não informada.' }),
});

export default async function loginAction(
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

  if (!isValid) {
    return {
      success: false,
      error: {
        email: [' '],
        password: ['E-mail e/ou senha incorretos.'],
      },
    };
  }

  const jsonData = Object.fromEntries(formData.entries());
  const validateFields = loginForm.safeParse(jsonData);

  if (!validateFields.success) {
    return {
      success: false,
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();

  const payload = await getPayload({ config: payloadConfig });

  try {
    const response = await payload.login({
      collection: 'users',
      data: {
        email: validateFields.data.email,
        password: validateFields.data.password,
      },
    });

    if (!response.token) {
      return {
        success: false,
        error: {
          email: [' '],
          password: ['E-mail e/ou senha incorretos.'],
        },
      };
    }

    const expires = new Date();
    expires.setHours(expires.getHours() + 2);

    cookieStore.set('payload-token', response.token, {
      sameSite: 'lax',
      httpOnly: true,
      expires,
    });

    if (response.user?.softDelete) {
      const expiresAt = new Date(response.user?.softDelete);
      expiresAt.setDate(expiresAt.getDate() + 30);

      cookieStore.set('account-recovery', '1', {
        sameSite: 'strict',
        expires: expiresAt,
      });
    } else {
      cookieStore.set('account-recovery', '0', {
        expires: new Date(0),
      });
    }

    return { success: true };
  } catch (error: unknown) {
    if ((error as Error).name === 'UnverifiedEmail') {
      return {
        success: false,
        error: {
          email: ['Confirme seu e-mail para continuar.'],
        },
      };
    }

    return {
      success: false,
      error: {
        email: ['Erro ao tentar fazer login. Tente novamente mais tarde.'],
      },
    };
  }
}
