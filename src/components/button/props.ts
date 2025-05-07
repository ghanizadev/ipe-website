import React from 'react';

export type CommonButtonProps = {
  className?: string;
  tag: 'button' | 'anchor';
  loading?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
};

export type AnchorProps = CommonButtonProps & {
  tag: 'anchor';
  href: string;
  target?: string;
  rel?: string;
};

export type ButtonProps = CommonButtonProps & {
  tag: 'button';
  type?: 'submit' | 'reset' | 'button';
};
