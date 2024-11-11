import NextLink from 'next/link';
import React from 'react';

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: React.ReactNode;
};

export default function Link({ children, ...props }: LinkProps) {
  const classes = ['text-[--secondary] underline text-nowrap'];

  if (props.className) {
    classes.push(props.className);
  }

  return (
    <NextLink
      {...props}
      href={props.href ?? '#'}
      className={classes.join(' ').trim()}
    >
      {children}
    </NextLink>
  );
}
