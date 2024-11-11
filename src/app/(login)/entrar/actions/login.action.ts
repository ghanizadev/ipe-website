'use server';

import { cookies } from 'next/headers';

import validateGRecaptcha from '@/actions/validate-grecaptcha.action';

export default async function loginAction(
  data: LoginUserDTO
): Promise<ActionResponse> {
  const cookieStore = await cookies();
  const url = `${process.env.CMS_API_URL}/api/users/login`;

  const isValid = await validateGRecaptcha(data.grecaptchaToken);
  if (!isValid) {
    console.warn('Login failed. Invalid Recaptcha.');
    return {
      success: false,
      errors: [{ field: '*', message: 'E-mail e/ou senha incorretos.' }],
    };
  }

  const init: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  };

  const response = await fetch(url, init);
  if (!response.ok) {
    console.warn('Login failed. Invalid credentials.');
    return {
      success: false,
      errors: [{ field: '*', message: 'E-mail e/ou senha incorretos.' }],
    };
  }

  const responseBody = await response.json();
  const expires = new Date();
  expires.setHours(expires.getHours() + 2);

  cookieStore.set('payload-token', responseBody.token, {
    sameSite: 'lax',
    httpOnly: true,
    expires,
  });

  return { success: true };
}
