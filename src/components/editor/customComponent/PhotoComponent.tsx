import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';

// 기본적으로 Node.attrs는 Record<string, any> 타입
type PhotoAttributes = {
  src: string;
  alt: string;
};

const PhotoComponent = ({ node }: NodeViewProps) => {
  const { src, alt } = node.attrs as PhotoAttributes;

  return (
    <NodeViewWrapper className="relative flex flex-col items-center">
      <img src={src} alt={alt} className="rounded-lg shadow-md" />
    </NodeViewWrapper>
  );
};

export default PhotoComponent;
