import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ToastProps } from './types';

export default function SimpleToast({ type, message, title }: ToastProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const classes = [
    'p-4 mb-4 w-max-xs text-sm rounded-lg border shadow md:w-max-auto',
  ];
  let messageTitle = title;

  switch (type) {
    case 'info':
      classes.push('text-blue-800 bg-blue-50 border-blue-300');
      if (!title) messageTitle = 'Info';
      break;
    case 'success':
      classes.push('text-green-800 bg-green-50 border-green-300');
      if (!title) messageTitle = 'Success';
      break;
    case 'warning':
      classes.push('text-yellow-800 bg-yellow-50 border-yellow-300');
      if (!title) messageTitle = 'Warning';
      break;
    case 'error':
      classes.push('text-red-800 bg-red-50 border-red-300');
      if (!title) messageTitle = 'Error';
      break;
  }

  const handleClose = () => {
    const event = new Event('toast.hide');
    window.dispatchEvent(event);
    if (searchParams.has('status')) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('status');
      router.replace(`${pathName}?${newParams.toString()}`);
    }
  };

  return (
    <div className={classes.join(' ').trim()} role='alert'>
      <button
        type='button'
        onClick={handleClose}
        className={
          'float-right ml-1.5 ms-auto inline-flex h-8 w-8 flex-shrink-0 items-center justify-center p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300'
        }
        data-dismiss-target={'#toast-interactive'}
        aria-label={'Close'}
      >
        <span className='sr-only'>Close</span>
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
      </button>
      <span className={'font-bold'}>{messageTitle}</span> {message}
    </div>
  );
}
