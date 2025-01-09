import React from 'react';
import { Paragraph } from '../common/commonSection';
// import { TitleActions } from '../common/sectionProps/TitleSection';

interface TitleSectionProps {
  id: string;
  compid: string;
  a11yTitle: string;
  content: Paragraph[];
  // actions: TitleActions;
  onUpdate: (content: TitleSectionProps['content']) => void;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  id,
  compid,
  a11yTitle,
  content,
  // actions,
  onUpdate,
}) => {
  // 입력 이벤트 처리
  const handleInput = (e: React.FormEvent<HTMLSpanElement>, spanId: string) => {
    const newContent = e.currentTarget.textContent || '';
    const updatedContent = content.map((p) => ({
      ...p,
      spans: p.spans.map((span) =>
        span.id === spanId ? { ...span, content: newContent } : span,
      ),
    }));
    onUpdate(updatedContent);
  };

  return (
    <div
      className="relative w-full p-4 bg-white border-gray-300 rounded-lg"
      id={id}
      data-compid={compid}
      data-a11y-title={a11yTitle}
    >
      <div className="relative pb-6 w-full border-b-2 border-gray-300">
        <div draggable="false" className="relative">
          {content.map((item) => (
            <div key={item.id} id={item.id} className="relative w-full">
              <p
                id={item.id}
                className={`text-4xl font-medium leading-snug text-gray-800 mb-4`}
                style={{ textAlign: item.style?.textAlign || 'left' }}
              >
                <span
                  key={item.spans[0].id}
                  id={item.spans[0].id}
                  contentEditable={true}
                  className="inline-block"
                  suppressContentEditableWarning={true} // ContentEditable 경고 방지
                  style={{
                    ...item.spans[0].style,
                    minHeight: '1em',
                  }}
                  onInput={(e) => handleInput(e, item.spans[0].id)}
                >
                  {item.spans[0].content}
                </span>
                {item.spans[0].content.trim() === '' && (
                  <span className="absolute top-0 left-0 text-gray-400 pointer-events-none">
                    제목
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* {actions && (
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            {actions.coverButtons.map((button) => (
              <span
                key={button.id}
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                title={button.title}
              ></span>
            ))}
          </div>
          <div className="flex space-x-2">
            {actions.editButtons.map((button) => (
              <span
                key={button.id}
                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                title={button.title}
              >
                {button.label}
              </span>
            ))}
          </div>
          <div className="flex space-x-2">
            {actions.movingButtons.map((button) => (
              <span
                key={button.id}
                className="px-4 py-2 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600"
                title={button.title}
              >
                {button.label}
              </span>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default TitleSection;
