'use client';

import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type TextAreaProps = {
  label: string;
  name: string;
  className?: string;
  placeholder?: string;
  defaultValue?: string | null;
  required?: boolean;
  error?: string | boolean;
};

export default function TextAreaInput({
  label,
  name,
  className,
  placeholder,
  defaultValue,
  required,
  error,
}: TextAreaProps) {
  const [value, setValue] = useState<string | undefined>(
    defaultValue ?? undefined
  );

  const classes = [
    'block p-2.5 my-1 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300',
  ];

  if (className) {
    classes.push(className);
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <>
      <label
        htmlFor={`${name}-textarea`}
        className='mb-2 block text-sm font-medium text-gray-900'
      >
        {label}
        {required ? <span className={'text-red-700'}> *</span> : ''}
      </label>
      <textarea
        id={`${name}-textarea`}
        rows={4}
        className={twMerge(
          ...classes,
          error ? 'bg-red-50 border-red-500 text-red-900' : ''
        )}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleOnChange}
      ></textarea>
      {typeof error === 'string' && (
        <p className='mt-2 text-sm text-red-600'>{error}</p>
      )}
    </>
  );
}
