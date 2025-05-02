import React from 'react';
import { twMerge } from 'tailwind-merge';

import { ButtonProps } from '@/components/button/props';

export default function Button(props: ButtonProps) {
  const { onClick, children, type } = props;

  const handleOnClick = async () => {
    if (onClick) await onClick();
  };

  const classNames = [
    'inline-flex',
    'items-center',
    'justify-center',
    'px-5',
    'py-3',
    'text-base',
    'font-medium',
    'text-center',
    'rounded-lg',
    'disabled:opacity-75',
    'disabled:cursor-not-allowed',
    'disabled:hover:bg-[--secondary]',
    ...(props.className ?? '').split(' '),
  ];

  return (
    <button
      type={type}
      disabled={props.disabled}
      onClick={handleOnClick}
      className={twMerge(...classNames)}
    >
      {children}
    </button>
  );
}
