'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

import Anchor from '@/components/button/anchor';
import { AnchorProps, ButtonProps } from '@/components/button/props';

import Button from './button';

function SecondaryButton(props: AnchorProps): React.JSX.Element;

function SecondaryButton(props: ButtonProps): React.JSX.Element;

function SecondaryButton({ tag, ...props }: ButtonProps | AnchorProps) {
  let classStr =
    'border-2 text-[--secondary] border-[--secondary] bg-transparent hover:text-[--primary] hover:border-[--primary]';

  if (props.className) {
    classStr = twMerge(classStr, props.className);
  }

  switch (tag) {
    case 'anchor':
      const anchorProps = props as AnchorProps;
      return (
        <Anchor {...anchorProps} className={classStr}>
          {props.children}
        </Anchor>
      );
    default:
      const buttonProps = props as ButtonProps;
      return (
        <Button {...buttonProps} className={classStr}>
          {props.children}
        </Button>
      );
  }
}

export default SecondaryButton;
