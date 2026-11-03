'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useRef, useState } from 'react';

import { RecaptchaInput } from '@/components/recaptcha-input';

type ValidateProps = {
  validateAction: (
    initialState: { success: boolean; done: boolean },
    formData: FormData
  ) => Promise<{
    success: boolean;
    done: boolean;
  }>;
};

export default function Validate(props: ValidateProps) {
  const router = useRouter();
  const token = useSearchParams().get('token') ?? '';
  const [ready, setReady] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction, pending] = useActionState(
    props.validateAction,
    { success: false, done: false }
  );

  const handleOnReady = () => {
    setReady(true);
  };

  useEffect(() => {
    if (!token) router.replace('/');
  }, [router, token]);

  useEffect(() => {
    if (formState.done) {
      if (formState.success) {
        router.push('/?status=confirmation-successful');
      } else {
        router.push('/?status=confirmation-error');
      }
    }
  }, [formState, router]);

  useEffect(() => {
    if (formRef.current && ready && token) {
      formRef.current.requestSubmit();
    }
  }, [formRef, ready, token]);

  if (!token) return null;

  return (
    <>
      <form action={formAction} ref={formRef}>
        {pending && <h1>Aguarde...</h1>}
        <input type={'hidden'} name={'token'} value={token} />
        <RecaptchaInput onReady={handleOnReady} />
      </form>
    </>
  );
}
