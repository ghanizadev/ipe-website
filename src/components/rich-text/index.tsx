'use server';

import React from 'react';

import Node from '@/components/rich-text/node';

type RichTextProps = {
  nodes: LexicalNodes;
  className?: string;
};

export default async function RichText({ nodes, className }: RichTextProps) {
  return (
    <>
      <div className={['richText', className].join(' ').trim()}>
        {nodes.root.children.map((child: LexicalAnyNode, index: number) => (
          <Node key={index} node={child} />
        ))}
      </div>
    </>
  );
}
