'use server';

import Link from '@/components/link';
import Node from '@/components/rich-text/node';

type LinkNodeProps = {
  node: LexicalLinkNode;
};

export default async function LinkNode(props: LinkNodeProps) {
  const { node } = props;
  const field = node.fields;

  return (
    <Link href={field?.url ?? '#'} target={field?.newTab ? '_blank' : '_self'}>
      {node.children.map((child, index) => (
        <Node key={index} node={child} />
      ))}
    </Link>
  );
}
