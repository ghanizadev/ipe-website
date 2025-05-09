'use client';

import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type SelectProps = {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  defaultValue?: string | null;
  className?: string;
  required?: boolean;
  error?: string | boolean;
  disabled?: boolean;
};

export default function SelectInput(props: SelectProps) {
  const [selected, setSelected] = useState<string | undefined>(
    props.defaultValue ?? undefined
  );

  const classes = [
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5',
  ];

  if (props.className) {
    classes.push(props.className);
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelected(value);
  };

  return (
    <>
      <label
        htmlFor={`${props.name}-input`}
        className='mb-1 block text-sm font-medium text-gray-900'
      >
        {props.label}
        {props.required ? <span className={'text-red-700'}> *</span> : ''}
      </label>
      <select
        id={`${props.name}-input`}
        className={twMerge(
          ...classes,
          props.error
            ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700'
            : ''
        )}
        name={props.name}
        required={props.required}
        value={selected ?? props.defaultValue ?? 'Selecione'}
        onChange={handleOnChange}
        disabled={props.disabled}
      >
        <option hidden value={'Selecione'}>
          Selecione
        </option>
        {props.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {typeof props.error === 'string' && (
        <p className='mt-2 text-sm text-red-600'>{props.error}</p>
      )}
    </>
  );
}
