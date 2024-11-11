import React from 'react';

import type { HeadingProps } from '@/components/typography/type';

export default function H1({ children }: HeadingProps) {
  const classes = ['text-xl text-[--primary] font-extrabold mb-8 lg:text-4xl'];
  return <h1 className={classes.join(' ').trim()}>{children}</h1>;
}
