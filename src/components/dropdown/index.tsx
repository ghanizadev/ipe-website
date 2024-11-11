import Link from 'next/link';
import React from 'react';

type DropdownItemProps = {
  href: string;
  children?: React.ReactNode | React.ReactNode[];
};

function DropdownItem(props: DropdownItemProps) {
  return (
    <Link
      href={props.href}
      className='block px-4 py-2 hover:bg-[--primary-clear] hover:text-[--primary]'
    >
      {props.children}
    </Link>
  );
}

type DropdownProps = {
  label: string;
  options: { label: string; path: string }[];
};

export default function Dropdown(props: DropdownProps) {
  const { options, label } = props;

  return (
    <>
      <button
        id='dropdownNavbarLink'
        data-dropdown-toggle={'dropdown' + label}
        className='flex w-full items-center justify-between rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-[--primary-lighter]'
      >
        {label}
        <svg
          className='ms-2.5 h-2.5 w-2.5'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 10 6'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m1 1 4 4 4-4'
          />
        </svg>
      </button>
      <div
        id={'dropdown' + label}
        className='z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white font-normal shadow'
      >
        <ul
          className='py-2 text-sm text-gray-700'
          aria-labelledby='dropdownLargeButton'
        >
          {options.map(({ path, label }) => (
            <DropdownItem key={path} href={path}>
              {label}
            </DropdownItem>
          ))}
        </ul>
      </div>
    </>
  );
}
