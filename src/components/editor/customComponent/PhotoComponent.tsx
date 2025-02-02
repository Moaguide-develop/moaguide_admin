import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";

type PhotoAttributes = {
  src: string;
  alt: string;
  width?: string;
  alignment?: string;
};

const PhotoComponent = ({ node }: NodeViewProps) => {
  const { src, alt, width, alignment } = node.attrs as PhotoAttributes;

  return (
    <NodeViewWrapper className={`w-full relative ${alignment}`}>
      <div className="relative se-module-image __se-unit">
        <div className="relative">
          <img
            src={src}
            alt={alt}
            width={width}
            className="block w-full relative h-auto"
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default PhotoComponent;
