'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

import Anchor from '@/components/button/anchor';
import Spinner from '@/components/spinner';

import Button from './button';
import { AnchorProps, ButtonProps } from './props';

function PrimaryButton(props: AnchorProps): React.JSX.Element;

function PrimaryButton(props: ButtonProps): React.JSX.Element;

function PrimaryButton({ tag, loading, ...props }: AnchorProps | ButtonProps) {
  let classStr = 'text-white bg-[--secondary] hover:bg-[--primary]';

  if (props.className) {
    classStr = twMerge(classStr, props.className);
  }

  switch (tag) {
    case 'anchor':
      const anchorProps = props as AnchorProps;
      return (
        <Anchor
          {...anchorProps}
          className={classStr}
          disabled={loading || props.disabled}
        >
          {loading ? <Spinner /> : props.children}
        </Anchor>
      );
    default:
      const buttonProps = props as ButtonProps;
      return (
        <Button
          {...buttonProps}
          className={classStr}
          disabled={loading || props.disabled}
        >
          {loading ? <Spinner /> : props.children}
        </Button>
      );
  }
}

export default PrimaryButton;
