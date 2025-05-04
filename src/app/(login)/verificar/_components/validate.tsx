'use client';

import { useRouter } from 'next/navigation';
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
  token: string;
};

export default function Validate(props: ValidateProps) {
  const router = useRouter();
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
    if (formState.done) {
      if (formState.success) {
        router.push('/?status=confirmation-successful');
      } else {
        router.push('/?status=confirmation-error');
      }
    }
  }, [formState, router]);

  useEffect(() => {
    if (formRef.current && ready) {
      formRef.current.requestSubmit();
    }
  }, [formRef, ready]);

  return (
    <>
      <form action={formAction} ref={formRef}>
        {pending && <h1>Aguarde...</h1>}
        <input type={'hidden'} name={'token'} value={props.token} />
        <RecaptchaInput onReady={handleOnReady} />
      </form>
    </>
  );
}
