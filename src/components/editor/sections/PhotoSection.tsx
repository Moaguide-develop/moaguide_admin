import React from 'react';
import { PhotoSection as PhotoSectionType } from '../common/sectionProps/PhotoSection';

interface PhotoSectionProps {
  id: string;
  compid: string;
  a11yTitle: string;
  content: PhotoSectionType['content'];
  onUpdate: (updatedContent: PhotoSectionType['content']) => void;
}

const PhotoSection: React.FC<PhotoSectionProps> = ({
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
      className="se-component se-image se-l-default"
      id={id}
      data-compid={compid}
      data-a11y-title={a11yTitle}
    >
      {/* 
    <div
      className="se-imageStrip2 se-component se-imageStrip se-l-default"
      id={id}
      data-compid={compid}
      data-a11y-title={a11yTitle}
    >
  */}
      <button
        className="se-component-edge-button se-component-edge-button-top __edge-area"
        type="button"
        tabIndex={-1}
        data-compid={compid}
        data-direction="top"
      ></button>
      <div className="se-component-content se-component-content-fit">
        {/* <div className="se-component-content se-component-content-extend"> */}
        <div
          className="se-drop-indicator"
          data-unitid=""
          data-compid={compid}
          data-direction="top"
        >
          <div className="se-section se-section-image se-l-default se-section-align-left">
            <div id={id} className="se-module se-module-image __se-unit">
              {/*
            <div
              class="__se-toolbar-slot __se-cursor-unrelated"
              style="display: none"
            ></div>
            <div class="se-imageStrip-container">
              <div
                id={id}
                class="se-module se-module-image __se-unit"
                style="width: 39.7582%"
              >
            */}
              <div
                className="se-drop-indicator"
                data-unitid=""
                data-compid={compid}
                data-direction="top"
              >
                <img
                  src={content.url}
                  alt={content.alt}
                  className=""
                  width={680}
                />
              </div>
            </div>
            {/*
            또 다른 사진 요소
            <div
              id={id}
              class="se-module se-module-image __se-unit"
              style="width: 60.2418%"
            >
              <div
                class="se-drop-indicator"
                data-unitid={id}
                data-compid=""
                data-direction="top"
              >
                <img
                  src={content.url}
                  alt={content.alt}
                  class="se-image-resource"
                  width="680"
                />
              </div>
              <button type="button" class="se-image-delete-button">
                <span class="se-blind">사진 삭제</span>
              </button>
              <div
                class="__se-toolbar-slot __se-cursor-unrelated"
                style="display: none"
              ></div>
            </div>
          */}
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
                  {content.caption.spans[0]?.content}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoSection;
