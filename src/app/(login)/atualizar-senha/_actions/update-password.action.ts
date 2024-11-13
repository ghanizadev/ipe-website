'use server';

import { redirect } from 'next/navigation';

import UserService from '@/services/user.service';

import validateGRecaptcha from '@/actions/validate-grecaptcha.action';

export default async function updatePasswordAction(
  password: string,
  token: string,
  grecaptchaToken: string
) {
  const isValid = await validateGRecaptcha(grecaptchaToken);
  if (!isValid) return;

  const service = new UserService();
  const success = await service.updatePassword({ password, token });

  if (success) {
    redirect('/entrar?create=password-updated');
  }
}
