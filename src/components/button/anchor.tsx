import Link from 'next/link';
import React from 'react';

import { AnchorProps } from '@/components/button/props';

export default function Anchor(props: AnchorProps) {
  const { className, children, ...otherProps } = props;

  const classNames =
    'inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center rounded-lg ' +
    className;

  return (
    <Link {...otherProps} className={classNames.trim()}>
      {children}
    </Link>
  );
}
