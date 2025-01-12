import { NodeViewWrapper } from '@tiptap/react';

// 기본적으로 Node.attrs는 Record<string, any> 타입
type PaywallAttributes = {
  title?: string;
  description?: string;
  buttonText?: string;
  info?: string;
  brInfo?: string;
};

const PaywallComponent = ({ node }: { node: { attrs: PaywallAttributes } }) => {
  const { title, description, buttonText, info, brInfo } = node.attrs;

  return (
    <NodeViewWrapper className="border border-gray-300 rounded-lg p-6 bg-white shadow-md max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="text-center mb-6">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium text-sm px-6 py-3 rounded transition">
          {buttonText}
        </button>
      </div>
      <div className="text-center text-xs text-gray-500 border-t pt-4">
        <p>
            {info}
          <br />
            {brInfo}
        </p>
      </div>
    </NodeViewWrapper>
  );
};

export default PaywallComponent;
