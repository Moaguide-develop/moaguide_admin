import React from 'react';
import { Paragraph } from '../common/commonSection';

interface TextSectionProps {
  id: string;
  compid: string;
  a11yTitle: string;
  content: Paragraph[];
  onUpdate: (content: Paragraph[]) => void;
  onEnter: (spanId: string) => void; // 새 단락 추가 핸들러
}

const TextSection: React.FC<TextSectionProps> = ({
  id,
  compid,
  a11yTitle,
  content,
  onUpdate,
  onEnter,
}) => {
  const handleInput = (e: React.FormEvent<HTMLSpanElement>, spanId: string) => {
    const newContent = e.currentTarget.textContent || '';
    const updatedContent = content.map((item) => ({
      ...item,
      spans: item.spans.map((span) =>
        span.id === spanId ? { ...span, content: newContent } : span,
      ),
    }));
    onUpdate(updatedContent);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLSpanElement>,
    spanId: string,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnter(spanId); // Enter 키로 새 단락 추가
    }
  };
  return (
    <div
      className="relative w-full p-4 bg-white border-gray-300 rounded-lg"
      id={id}
      data-compid={compid}
      data-a11y-title={a11yTitle}
    >
      <div className="relative">
        <div className="relative">
          <div key={id} id={id} className="space-y-4">
          {content.map((paragraph) => {
              const Wrapper = paragraph.isList ? 'ul' : 'p'; // 목록이면 ul, 아니면 p
              return (
                <Wrapper
                  key={paragraph.id}
                  id={paragraph.id}
                  className={`relative text-base leading-relaxed mb-4 ${paragraph.className}`}
                  style={paragraph.style}
                >
                  {paragraph.spans.map((span) => {
                    const SpanWrapper = span.isBold ? 'b' : 'span'; // 굵으면 b, 아니면 span
                    return (
                      <SpanWrapper
                        key={span.id}
                        id={span.id}
                        className="inline-block"
                        style={{
                          ...span.style,
                          minHeight: '1em',
                        }}
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onInput={(e) => handleInput(e, span.id)}
                        onKeyDown={(e) => handleKeyDown(e, span.id)}
                      >
                        {span.content}
                      </SpanWrapper>
                    );
                  })}
                  {!paragraph.spans.some((span) => span.content.trim()) && (
                    <span className="absolute top-0 left-0 text-gray-400 pointer-events-none">
                      내용을 입력하세요.
                    </span>
                  )}
                </Wrapper>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSection;
