import React from 'react';

import type { HeadingProps } from '@/components/typography/type';

export default function h2({ children }: HeadingProps) {
  const classes = ['text-lg text-gray-700 font-bold mb-8 lg:text-2xl'];
  return <h2 className={classes.join(' ').trim()}>{children}</h2>;
}
