import React from 'react';
import { QuoteContent } from '../common/sectionProps/QuoteSection';

interface QuoteSectionProps {
  id: string;
  compid: string;
  a11yTitle: string;
  content: QuoteContent;
  onUpdate: (content: QuoteContent) => void;
}

const QuoteSection: React.FC<QuoteSectionProps> = ({
  id,
  compid,
  a11yTitle,
  content,
  onUpdate,
}) => {
  const handleInput = (
    e: React.FormEvent<HTMLSpanElement>,
    type: 'quote' | 'cite',
    spanId: string,
  ) => {
    const newValue = e.currentTarget.textContent || '';
    const updatedContent = content[type].map((p) => ({
      ...p,
      spans: p.spans.map((span) =>
        span.id === spanId ? { ...span, content: newValue } : span,
      ),
    }));
    onUpdate({ ...content, [type]: updatedContent });
  };

  return (
    <div
      className="se-component se-quotation se-l-quotation_line"
      id={id}
      data-compid={compid}
      data-a11y-title={a11yTitle}
    >
      <button
        className="se-component-edge-button se-component-edge-button-top __edge-area"
        type="button"
        tabIndex={-1}
        data-compid={compid}
        data-direction="top"
      ></button>
      <div className="se-component-content">
        <div
          className="__se-toolbar-slot __se-cursor-unrelated"
          style={{ display: 'none' }}
        ></div>
        <div
          className="se-drop-indicator"
          data-unitid=""
          data-compid={compid}
          data-direction="top"
        >
          <div className="se-section se-section-quotation se-l-quotation_line se-section-align-left __se-unit">
            <div className="se-quotation-container">
              {/* Quote Section */}
              <div
                id={`${id}-module`}
                className="se-module se-module-text __se-unit se-quote"
                contentEditable
              >
                {content.quote.map((p) => (
                  <p
                    key={p.id}
                    id={p.id}
                    className={p.className}
                    style={p.style}
                  >
                    {p.spans.map((span) => (
                      <span
                        key={span.id}
                        id={span.id}
                        className={`${span.className} ${
                          !span.content.trim() ? 'se-placeholder' : ''
                        }`}
                        style={span.style}
                        suppressContentEditableWarning={true}
                        onInput={(e) => handleInput(e, 'quote', span.id)}
                      >
                        {span.content || '내용을 입력하세요.'}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
              {/* Cite Section */}
              <div
                id={`${id}-module`}
                className="se-module se-module-text __se-unit se-cite"
                contentEditable
              >
                {content.cite.map((p) => (
                  <p
                    key={p.id}
                    id={p.id}
                    className="{p.className}"
                    style={p.style}
                  >
                    {p.spans.map((span) => (
                      <span
                        key={span.id}
                        id={span.id}
                        className={`${span.className} ${
                          !span.content.trim() ? 'se-placeholder' : ''
                        }`}
                        style={span.style}
                        suppressContentEditableWarning={true}
                        onInput={(e) => handleInput(e, 'cite', span.id)}
                      >
                        {span.content || ''}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteSection;
