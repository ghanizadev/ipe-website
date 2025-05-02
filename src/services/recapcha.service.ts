'use client';

export default async function recaptchaService(): Promise<string> {
  if (process.env.IS_LOCALHOST) return '';

  return new Promise<string>((res) => {
    grecaptcha.ready(async () => {
      const token = await grecaptcha.execute(
        process.env.NEXT_PUBLIC_GRECAPTCHA_SITE_KEY!,
        { action: 'submit' }
      );
      res(token);
    });
  });
}
