import React from 'react';

import './rich-text.scss';

type RichTextProps = {
  html?: string;
  className?: string;
};

export default function RichText({ html, className }: RichTextProps) {
  return (
    <div
      className={['richText', className].join(' ').trim()}
      dangerouslySetInnerHTML={{ __html: html ?? '' }}
    ></div>
  );
}
