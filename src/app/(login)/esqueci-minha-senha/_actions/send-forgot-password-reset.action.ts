'use server';

import { redirect } from 'next/navigation';

import UserService from '@/services/user.service';

import validateRecaptcha from '@/actions/validate-recaptcha.action';

export default async function sendForgotPasswordResetAction({
  email,
  grecaptchaToken,
}: Record<string, string>) {
  if (!email) return;

  const isValid = await validateRecaptcha(grecaptchaToken);
  if (!isValid) return;

  const service = new UserService();
  await service.forgotPassword(email);
  redirect('/esqueci-minha-senha?sent=1');
}
