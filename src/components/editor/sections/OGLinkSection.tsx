import React from 'react';
import { OGLinkSection as OGLinkSectionType } from '../common/sectionProps/LinkSection';

interface OembedSectionProps {
  id: string;
  compid: string;
  a11yTitle: string;
  content: OGLinkSectionType['content'];
  onUpdate: (updatedContent: OGLinkSectionType['content']) => void;
}

const OGLinkSection: React.FC<OembedSectionProps> = ({
  id,
  compid,
  a11yTitle,
  content,
  onUpdate,
}) => {
  const handleChange = (field: keyof typeof content, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  return (
    <div
      className="se-component se-oglink se-l-large_image"
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
          className="se-drop-indicator"
          data-unitid=""
          data-compid={compid}
          data-direction="top"
        >
          <div
            draggable="true"
            className="se-section se-section-oglink se-l-large_image se-section-align-center"
            id={`${id}-section`}
          >
            <div
              className="se-module se-module-oglink __se-unit"
              id={`${id}-module`}
            >
              <div
                className="se-oglink-thumbnail"
                id={`${id}-thumbnail-container`}
              >
                <img
                  src={content.thumbnail}
                  // 예 content.thumbnail) "https://imgnews.pstatic.net/image/277/2024/12/27/0005523953_001_20241227081011699.jpg?type=w800"
                  // https://dthumb-phinf.pstatic.net/?src="{content.thumbnail}"&type=ff500_300
                  className="se-oglink-thumbnail-resource"
                  alt={content.title}
                  style={{ width: '500px', height: 'auto' }}
                  id={`${id}-thumbnail`}
                />
                <button
                  type="button"
                  data-log="ogkct.x"
                  className="se-oglink-thumbnail-delete"
                  onClick={() => handleChange('thumbnail', '')}
                  id={`${id}-thumbnail-delete`}
                >
                  <span className="se-blind">이미지 썸네일 삭제</span>
                </button>
                <div
                  className="se-oglink-thumbnail-frame"
                  id={`${id}-thumbnail-frame`}
                ></div>
              </div>
              <div className="se-oglink-info" id={`${id}-info`}>
                <div
                  className="se-oglink-info-container"
                  id={`${id}-info-container`}
                >
                  <strong className="se-oglink-title" id={`${id}-title`}>
                    {content.title}
                  </strong>
                  <p className="se-oglink-summary" id={`${id}-summary`}>
                    {content.summary}
                  </p>
                  <p className="se-oglink-url" id={`${id}-url`}>
                    {content.url}
                  </p>
                </div>
              </div>
              <div className="se-oglink-frame" id={`${id}-frame`}></div>
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

export default OGLinkSection;
