'use client';

import { useEffect, useRef } from 'react';

import recaptchaService from '@/services/recapcha.service';

export function CaptchaInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadToken = async () => {
      if (inputRef.current) {
        inputRef.current.value = await recaptchaService();
      }
    };

    loadToken();
  }, [inputRef]);

  useEffect(() => {
    let form: HTMLFormElement | null = null;
    if (inputRef.current) {
      form = inputRef.current.closest('form');
    }

    const onSubmit = async () => {
      if (inputRef.current) {
        inputRef.current.value = await recaptchaService();
      }
    };

    form?.addEventListener('submit', onSubmit);

    return () => {
      form?.removeEventListener('submit', onSubmit);
    };
  }, [inputRef]);

  return <input type={'hidden'} ref={inputRef} name={'recaptcha'} />;
}
