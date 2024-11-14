'use server';

type LineBreakProps = {
  node: LineBreakNode;
};

export default async function LineBreakNode(props: LineBreakProps) {
  const { node } = props;
  return <br />;
}
