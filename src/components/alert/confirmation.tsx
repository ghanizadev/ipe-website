'use client';

import React, { useEffect, useState } from 'react';

import { AlertProps } from '@/components/alert/type';

export default function ConfirmationAlert() {
  const [props, setProps] = useState<AlertProps & { callbackName: string }>();

  const handleInvocation = (event: Event) => {
    event.preventDefault();
    const { detail } = event as CustomEvent;
    setProps(detail);
  };

  const handleAction = (status: 'confirm' | 'deny' | 'dismiss') => {
    return () => {
      if (!props) return;

      const event = new CustomEvent(props.callbackName, { detail: { status } });
      window.dispatchEvent(event);
      setProps(undefined);
    };
  };

  useEffect(() => {
    window.addEventListener('alert.confirmation', handleInvocation);

    return () => {
      window.removeEventListener('alert.confirmation', handleInvocation);
    };
  }, []);

  return (
    <>
      {props && (
        <div
          id='small-modal'
          tabIndex={-1}
          className='fixed inset-0 z-50 max-h-full w-full overflow-y-auto overflow-x-hidden bg-backdrop p-4'
        >
          <div className='relative left-[50%] top-[50%] max-h-full w-full max-w-lg -translate-x-1/2 -translate-y-1/2'>
            <div className='relative rounded-lg bg-white shadow'>
              <div className='flex items-center justify-between rounded-t border-b p-4 md:p-5'>
                <h3 className='text-xl font-medium text-gray-900'>
                  {props?.title}
                </h3>
                <button
                  type='button'
                  className='ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
                  data-modal-hide='small-modal'
                  onClick={handleAction('dismiss')}
                >
                  <svg
                    className='h-3 w-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 14'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                    />
                  </svg>
                  <span className='sr-only'>Close modal</span>
                </button>
              </div>
              <div className='space-y-4 p-4 md:p-5'>
                {props?.message
                  .split('\n')
                  .map((message, i) => <p key={i}>{message}</p>)}
              </div>
              <div className='flex items-center justify-end rounded-b border-t border-gray-200 p-4 md:p-5'>
                <button
                  data-modal-hide='small-modal'
                  type='button'
                  onClick={handleAction('deny')}
                  className='rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100'
                >
                  Cancelar
                </button>
                <button
                  data-modal-hide='small-modal'
                  type='button'
                  onClick={handleAction('confirm')}
                  className='focus:ring-bg-[--secondary] ms-3 rounded-lg bg-[--primary] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[--primary-darker] focus:outline-none focus:ring-4'
                >
                  Aceito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
