import React from 'react';
import { PhotoSection as PhotoSectionType } from '../common/sectionProps/PhotoSection';

interface PhotoSectionProps {
  id: string;
  compid: string;
  a11yTitle: string;
  content: PhotoSectionType['content'];
  onUpdate: (updatedContent: PhotoSectionType['content']) => void;
}

const PhotoStripSection: React.FC<PhotoSectionProps> = ({
  id,
  compid,
  a11yTitle,
  content,
  onUpdate,
}) => {
  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCaption = {
      ...content.caption,
      spans: [
        {
          ...content.caption.spans[0],
          content: e.target.value,
        },
      ],
    };
    onUpdate({
      ...content,
      caption: updatedCaption,
    });
  };

  return (
    <div
      className="se-imageStrip2 se-component se-imageStrip se-l-default"
      id={id}
      data-compid={compid}
      data-a11y-title={a11yTitle}
    >
      {/* 
    <div
      className="se-component se-image se-l-default"
      id={id}
      data-compid={compid}
      data-a11y-title={a11yTitle}
    >
  */}
      <button
        className="se-component-edge-button se-component-edge-button-top __edge-area"
        type="button"
        tab-index="-1"
        data-compid={compid}
        data-direction="top"
      ></button>
      <div className="se-component-content se-component-content-extend">
        {/* <div className="se-component-content se-component-content-fit"> */}
        <div
          className="se-drop-indicator"
          data-unitid=""
          data-compid={compid}
          data-direction="top"
        >
          <div className="se-section se-section-image se-l-default se-section-align-left">
            <div
              className="__se-toolbar-slot __se-cursor-unrelated"
              style={{ display: 'none' }}
            ></div>
            <div className="se-imageStrip-container">
              <div
                id={id}
                className="se-module se-module-image __se-unit"
                style={{ width: '39.7582%' }}
              >
                {/* <div id={id} className="se-module se-module-image __se-unit"> */}
                <div
                  className="se-drop-indicator"
                  data-unitid={id}
                  data-compid=""
                  data-direction="top"
                >
                  <img
                    src={content.url}
                    alt={content.alt}
                    className="se-image-resource"
                    width={680}
                  />
                </div>
                <button type="button" className="se-image-delete-button">
                  <span className="se-blind">사진 삭제</span>
                </button>
                {/* // 기본 사진은 대표 버튼 있음
                <button type="button" className="se-set-rep-image-button">
                  <span className="se-set-rep-image-button-text">"대표"</span>
                </button>
                <button type="button" className="se-image-delete-button">
                  <span className="se-blind">사진 삭제</span>
                </button>
                */}
                <div
                  className="__se-toolbar-slot __se-cursor-unrelated"
                  style={{ display: 'none' }}
                ></div>
              </div>
              {/* 또 다른 사진 요소 */}
              <div
                id={id}
                className="se-module se-module-image __se-unit"
                style={{ width: '60.2418%' }}
              >
                <div
                  className="se-drop-indicator"
                  data-unitid={id}
                  data-compid=""
                  data-direction="top"
                >
                  <img
                    src={content.url}
                    alt={content.alt}
                    className="se-image-resource"
                    width="680"
                  />
                </div>
                <button type="button" className="se-image-delete-button">
                  <span className="se-blind">사진 삭제</span>
                </button>
                <div
                  className="__se-toolbar-slot __se-cursor-unrelated"
                  style={{ display: 'none' }}
                ></div>
              </div>
            </div>
            <div
              id={id}
              className="se-module se-module-text __se-unit se-caption se-is-on"
            >
              <p
                id={content.caption.id}
                className="se-text-paragraph se-text-paragraph-align-center"
                style={{ lineHeight: '1.5' }}
              >
                <span
                  id={content.caption.spans[0]?.id}
                  className="se-ff-nanumgothic se-fs13 __se-node"
                  style={{ color: 'rgb(85, 85, 85)' }}
                >
                  <input
                    type="text"
                    id={`${id}-caption-input`}
                    value={content.caption.spans[0]?.content || ''}
                    onChange={handleCaptionChange}
                    placeholder="사진 설명을 입력하세요."
                  />
                </span>
              </p>
              <div
                className="__se-toolbar-slot __se-cursor-unrelated"
                style={{ display: 'none' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoStripSection;
