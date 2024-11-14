'use server';

import React from 'react';

import Node from '@/components/rich-text/node';

type ParagraphNodeProps = {
  node: ParagraphNode;
};

export default async function ParagraphNode(props: ParagraphNodeProps) {
  const { node } = props;

  if (!node.children.length) return <br />;

  const className = ['my-2'];

  if (node.format) {
    switch (node.format) {
      case 'justify':
        className.push('text-justify');
        break;
      case 'left':
        className.push('text-left');
        break;
      case 'right':
        className.push('text-right');
        break;
      case 'center':
        className.push('text-center');
        break;
    }
  }

  return (
    <p
      style={{ textIndent: node.indent ? node.indent + 'em' : undefined }} // TODO: Move to tailwind
      className={className.join(' ').trim()}
    >
      {node.children.map((child, index) => (
        <Node key={index} node={child} />
      ))}
    </p>
  );
}
