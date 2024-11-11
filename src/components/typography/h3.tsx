import React from 'react';

import type { HeadingProps } from '@/components/typography/type';

export default function H3({ children }: HeadingProps) {
  const classes = ['text-lg text-[--primary] mt-4 mb-2 lg:text-xl'];
  return <h2 className={classes.join(' ').trim()}>{children}</h2>;
}
