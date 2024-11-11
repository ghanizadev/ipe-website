'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

type ModalProps = {
  title: string;
  children?: React.ReactNode;
};

export default function Modal({ title, children }: ModalProps) {
  const router = useRouter();

  const handleClose = () => {
    router.push(window.location.pathname);
  };

  return (
    <div
      id='medium-modal'
      tabIndex={-1}
      className={
        'fixed inset-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden bg-backdrop p-4 md:inset-0'
      }
    >
      <div className='relative left-[50%] top-[50%] max-h-full w-full max-w-lg -translate-x-1/2 -translate-y-1/2'>
        <div className='relative rounded-lg bg-white shadow'>
          <div className='flex items-center justify-between rounded-t border-b p-4 md:p-5'>
            <h3 className='text-xl font-medium text-gray-900'>{title}</h3>
            <button
              type='button'
              className='ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
              onClick={handleClose}
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
          <div className={'p-4'}>{children}</div>
        </div>
      </div>
    </div>
  );
}
