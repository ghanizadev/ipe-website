'use server';

type HorizontalRuleProps = {
  node: HorizontalRuleNode;
};

export default async function HorizontalRuleNode(props: HorizontalRuleProps) {
  const { node } = props;
  return <hr className={'my-4'} />;
}
