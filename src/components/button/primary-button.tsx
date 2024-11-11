'use client';

import React from 'react';

import Anchor from '@/components/button/anchor';

import Button from './button';
import { AnchorProps, ButtonProps } from './props';

function PrimaryButton(props: AnchorProps): React.JSX.Element;

function PrimaryButton(props: ButtonProps): React.JSX.Element;

function PrimaryButton({ tag, ...props }: AnchorProps | ButtonProps) {
  const classes = ['text-white bg-[--primary] hover:bg-[--primary-darker]'];

  if (props.className) classes.push(props.className);

  switch (tag) {
    case 'anchor':
      const anchorProps = props as AnchorProps;
      return (
        <Anchor {...anchorProps} className={classes.join(' ')}>
          {props.children}
        </Anchor>
      );
    default:
      const buttonProps = props as ButtonProps;
      return (
        <Button {...buttonProps} className={classes.join(' ')}>
          {props.children}
        </Button>
      );
  }
}

export default PrimaryButton;
