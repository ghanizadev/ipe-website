'use client';

import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type CheckboxInputProps = {
  name: string;
  title?: string;
  error?: string | boolean;
  inputClassName?: string;
  labelClassName?: string;
  required?: boolean;
  children?: React.ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
};

export default function CheckboxInput(props: CheckboxInputProps) {
  const [checked, setChecked] = useState<boolean>(
    props.defaultChecked ?? false
  );
  const inputClasses = [
    'w-4 h-4 text-[--primary] border border-gray-300 rounded bg-gray-50',
  ];
  const labelClasses = ['ms-2 text-sm font-medium text-gray-900'];

  if (props.inputClassName) {
    inputClasses.push(props.inputClassName);
  }

  if (props.labelClassName) {
    labelClasses.push(props.labelClassName);
  }

  if (props.error) {
    labelClasses.push('text-red-600');
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setChecked(checked);
  };

  return (
    <div className='mb-5 flex items-start'>
      <div className='flex h-5 items-center'>
        <input
          id={props.name + '-checkbox'}
          type='checkbox'
          name={props.name}
          title={props.title}
          required={props.required}
          checked={checked}
          onChange={handleOnChange}
          className={twMerge(...inputClasses)}
          disabled={props.disabled}
        />
      </div>
      <label
        htmlFor={props.name + '-checkbox'}
        className={labelClasses.join(' ').trim()}
      >
        {props.children}
      </label>
    </div>
  );
}
