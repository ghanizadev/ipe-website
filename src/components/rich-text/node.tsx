'use server';

import React from 'react';

import HeadingNode from '@/components/rich-text/nodes/heading';
import HorizontalRuleNode from '@/components/rich-text/nodes/horizontal-rule';
import LineBreakNode from '@/components/rich-text/nodes/linebreak';
import ParagraphNode from '@/components/rich-text/nodes/paragraph';
import TextNode from '@/components/rich-text/nodes/text';

type GetNodeProps = {
  node: AnyNode;
};

export default async function Node({ node }: GetNodeProps) {
  switch (node.type) {
    case 'paragraph':
      return <ParagraphNode node={node} />;
    case 'text':
      return <TextNode node={node} />;
    case 'linebreak':
      return <LineBreakNode />;
    case 'heading':
      return <HeadingNode node={node} />;
    case 'horizontalrule':
      return <HorizontalRuleNode />;
    default:
      return <></>;
  }
}
