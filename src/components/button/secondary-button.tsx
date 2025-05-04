'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

import Anchor from '@/components/button/anchor';
import { AnchorProps, ButtonProps } from '@/components/button/props';

import Button from './button';

function SecondaryButton(props: AnchorProps): React.JSX.Element;

function SecondaryButton(props: ButtonProps): React.JSX.Element;

function SecondaryButton({ tag, ...props }: ButtonProps | AnchorProps) {
  const classStr = [
    'border-2',
    'text-[--secondary]',
    'border-[--secondary]',
    'bg-transparent',
    'hover:text-[--primary]',
    'hover:border-[--primary]',
    'disabled:text-gray-600',
    'disabled:border-gray-600',
    'disabled:hover:text-gray-600',
    'disabled:hover:border-gray-600',
    'disabled:cursor-not-allowed',
    'disabled:opacity-75',
    'disabled:hover:bg-white',
  ];

  if (props.className) {
    classStr.push(props.className);
  }

  switch (tag) {
    case 'anchor':
      const anchorProps = props as AnchorProps;
      return (
        <Anchor
          {...anchorProps}
          className={twMerge(...classStr, props.className)}
        >
          {props.children}
        </Anchor>
      );
    default:
      const buttonProps = props as ButtonProps;
      return (
        <Button
          {...buttonProps}
          className={twMerge(...classStr, props.className)}
        >
          {props.children}
        </Button>
      );
  }
}

export default SecondaryButton;
