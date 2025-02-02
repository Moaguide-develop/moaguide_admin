import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';

type QuotationAttributes = {
  text: string;
  citation: string;
  alignment: string;
};

const QuotationComponent = ({ node, updateAttributes }: NodeViewProps) => {
  const { text, citation, alignment } = node.attrs as QuotationAttributes;

  return (
    <NodeViewWrapper className={`py-2 relative ${alignment}`}>
      <div className="px-5 py-0.5 relative m-auto box-border before:absolute before:top-0 before:bottom-0 before:left-0 before:border-l-[6px] before:border-[#515151] before:content-['']">
        <div className="se-module se-module-text __se-unit se-quote">
          <p
            className="se-text-paragraph se-text-paragraph-align-left"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) =>
              updateAttributes({ text: e.currentTarget.textContent })
            }
          >
            <b>{text}</b>
          </p>
        </div>

        {citation && (
          <div className="se-module se-module-text __se-unit se-cite">
            <p
              className="se-text-paragraph se-text-paragraph-align-left"
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => {
                const inputValue = e.currentTarget.textContent?.trim() || '';
                updateAttributes({
                  citation: inputValue === '출처 입력' ? '' : inputValue,
                });
              }}
            >
              {citation || '출처 입력'}
            </p>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default QuotationComponent;
