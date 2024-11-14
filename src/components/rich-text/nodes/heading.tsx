'use server';

import React from 'react';

import Node from '@/components/rich-text/node';

type HeadingNodeProps = {
  node: HeadingNode;
};

export default async function HeadingNode(props: HeadingNodeProps) {
  const { node } = props;

  const Tag = node.tag;

  const className: string[] = [];

  switch (node.tag) {
    case 'h1':
      className.push(
        'text-xl text-[--primary] font-extrabold mb-8 lg:text-4xl'
      );
      break;
    case 'h2':
      //TODO
      break;
    case 'h3':
      className.push('my-4 text-lg text-[--primary] lg:text-xl');
      break;
    case 'h4':
      className.push(
        'my-2 text-base text-[--primary] text-gray-600 lg:text-lg'
      );
      break;
    case 'h5':
      //TODO
      break;
    case 'h6':
      //TODO
      break;
  }

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
    <Tag className={className.join(' ').trim()}>
      {node.children.map((child, index) => (
        <Node key={index} node={child} />
      ))}
    </Tag>
  );
}
