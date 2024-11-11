'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import grecaptchaService from '@/services/grecapcha.service';

type ValidateProps = {
  action: (token: string, grecaptchaToken: string) => Promise<ActionResponse>;
  token: string;
};

export default function Validate(props: ValidateProps) {
  const router = useRouter();

  useEffect(() => {
    const effect = async () => {
      const grecaptchaToken = await grecaptchaService();
      const response = await props.action(props.token, grecaptchaToken);

      if (response?.success) {
        router.push('/?status=confirmation-successful');
        return;
      }

      router.push('/?status=confirmation-error');
    };

    effect().catch();
  }, []);

  return (
    <>
      <h1>Aguarde...</h1>
    </>
  );
}
