'use server';

import React from 'react';

import { LexicalFormats } from '@/enums/lexical';

type ParagraphNodeProps = {
  node: Heading;
  children?: React.ReactNode;
};

export default async function TextNode(props: ParagraphNodeProps) {
  const { node, children } = props;

  const text: React.ReactNode = children ?? node.text;

  switch (node.format) {
    case LexicalFormats.BOLD:
      return <strong>{text}</strong>;
    case LexicalFormats.ITALIC:
      return <i>{text}</i>;
    case LexicalFormats.STRIKETHROUGH:
      return <span className={'line-through'}>{text}</span>;
    case LexicalFormats.UNDERLINE:
      return <span className={'underline'}>{text}</span>;
    case LexicalFormats.SUBSCRIPT:
      return <sub>{text}</sub>;
    case LexicalFormats.SUPERSCRIPT:
      return <sup>{text}</sup>;
    case LexicalFormats.CODE:
      return (
        <code className={'bg-teal-200 rounded text-center px-1 py-0.5'}>
          {text}
        </code>
      );
  }

  if (node.format > 0) {
    const types = [64, 32, 16, 8, 4, 2, 1];

    for (const type of types) {
      if (node.format >= type)
        return (
          <TextNode node={{ ...node, format: type }}>
            <TextNode node={{ ...node, format: node.format - type }} />
          </TextNode>
        );
    }
  }

  return <>{text}</>;
}
