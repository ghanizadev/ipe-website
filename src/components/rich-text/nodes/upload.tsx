'use server';

type VideoNodeProps = {
  url: string;
};

function VideoNode(props: VideoNodeProps) {
  return (
    <video controls className={'w-full object-cover'}>
      <source src={props.url} />
    </video>
  );
}

type UploadNodeProps = {
  node: LexicalUploadNode;
};

export default async function UploadNode(props: UploadNodeProps) {
  const { node } = props;

  switch (node.value.mimeType) {
    case 'video/mp4':
      return <VideoNode url={node.value.url} />;
    default:
      return <></>;
  }
}
