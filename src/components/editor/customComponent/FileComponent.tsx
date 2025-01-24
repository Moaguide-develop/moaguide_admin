import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';

// 기본적으로 Node.attrs는 Record<string, any> 타입
type FileAttributes = {
  src: string;
  title: string;
};

const FileComponent = ({ node }: NodeViewProps) => {
  const { title } = node.attrs as FileAttributes;

  return (
    <NodeViewWrapper className="flex items-center justify-between p-3 border border-gray-300 rounded-lg shadow-sm bg-white max-w-md">
      <div className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z" />
        </svg>
        <span className="text-sm font-medium text-gray-800 truncate">
          {title}
        </span>
      </div>
      <span className="flex items-center justify-center w-8 h-8 text-yellow-800 rounded-full transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
      </span>
    </NodeViewWrapper>
  );
};

export default FileComponent;
