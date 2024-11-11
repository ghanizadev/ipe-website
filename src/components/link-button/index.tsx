import Link from 'next/link';
import React from 'react';

type LinkProps = {
  href: string;
  target?: string;
  current?: string;
  children?: React.ReactNode | React.ReactNode[];
};

export default function LinkButton(props: LinkProps) {
  return (
    <Link
      href={props.href}
      data-current={props.current}
      className='block rounded px-3 py-2 hover:text-[--primary-lighter] hover:underline md:border-0 md:p-0'
    >
      {props.children}
    </Link>
  );
}
