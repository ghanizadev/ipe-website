'use client';

import { useUser } from '@/context/user.context';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { AlertProps } from '@/components/alert/type';
import notificationEvent from '@/components/toast/toast-event';

import logoutService from '@/services/logout.service';

type ConfirmationAlertProps = {
  recoverAccountAction: () => Promise<void>;
};

export default function RecoverAccountAlert(props: ConfirmationAlertProps) {
  const [alertProps, setAlertProps] = useState<AlertProps>();
  const router = useRouter();
  const [user, refresh] = useUser();

  const handleAction = (status: 'confirm' | 'deny' | 'dismiss') => {
    return async () => {
      if (status === 'confirm') {
        await props.recoverAccountAction();
        notificationEvent({
          title: 'Boas notícias',
          message: 'A sua conta foi restaurada com sucesso!',
          type: 'success',
        });
      } else {
        await logoutService();
        await refresh();
        router.push('/');
      }

      router.refresh();

      setAlertProps(undefined);
    };
  };

  useEffect(() => {
    if (user?.softDelete) {
      const date = new Date(user.softDelete);
      const removeTime = new Date(user.softDelete);
      removeTime.setDate(removeTime.getDate() + 30);

      setAlertProps({
        title: 'Recuperar conta',
        message: `No dia ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, esta conta foi temporariamente removida. Para continuar usando os nossos serviços, você precisa cancelar a exclusão marcada para o dia ${removeTime.getDate()}/${removeTime.getMonth() + 1}/${removeTime.getFullYear()}.\n\nVocê desejar realmente CANCELAR a exclusão definitiva desta conta?`,
      });
    }
  }, [user]);

  return (
    <>
      {alertProps && (
        <div
          id='small-modal'
          tabIndex={-1}
          className='fixed inset-0 z-50 max-h-full w-full overflow-y-auto overflow-x-hidden bg-backdrop p-4'
        >
          <div className='relative left-[50%] top-[50%] max-h-full w-full max-w-lg -translate-x-1/2 -translate-y-1/2'>
            <div className='relative rounded-lg bg-white shadow'>
              <div className='flex items-center justify-between rounded-t border-b p-4 md:p-5'>
                <h3 className='text-xl font-medium text-gray-900'>
                  {alertProps?.title}
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
                {alertProps?.message
                  .split('\n')
                  .map((message, i) => <p key={i}>{message}</p>)}
              </div>
              <div className='flex items-center justify-end rounded-b border-t border-gray-200 p-4 md:p-5'>
                <button
                  data-modal-hide='small-modal'
                  type='button'
                  onClick={handleAction('deny')}
                  className='rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-700 focus:z-10'
                >
                  Cancelar
                </button>
                <button
                  data-modal-hide='small-modal'
                  type='button'
                  onClick={handleAction('confirm')}
                  className='ms-3 rounded-lg bg-[--primary] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[--primary-darker] focus:outline-none'
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
