import React from 'react';
import { OembedSection as OembedSectionType } from '../common/sectionProps/LinkSection';

interface OembedSectionProps {
  id: string;
  compid: string;
  a11yTitle: string;
  content: OembedSectionType['content'];
  onUpdate: (updatedContent: OembedSectionType['content']) => void;
}

const OembedSection: React.FC<OembedSectionProps> = ({
  id,
  compid,
  a11yTitle,
  content,
  onUpdate,
}) => {
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...content, url: e.target.value });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...content, title: e.target.value });
  };

  return (
    <div
      className="se-component se-oembed se-l-default"
      id={id}
      data-compid={compid}
      data-a11y-title={a11yTitle}
    >
      <div className="se-component-content se-component-content-fit">
        <div
          className="se-drop-indicator"
          data-unitid=""
          data-compid={compid}
          data-direction="top"
        >
          <div
            className="se-section se-section-oembed se-l-default se-section-align-left"
            id={`${id}-section`}
          >
            <div
              className="se-module se-module-oembed __se-unit"
              id={`${id}-module`}
            >
              <div style={{ paddingTop: '75%' }} id={`${id}-iframe-container`}>
                <iframe
                  id={`${id}-iframe`}
                  width="400"
                  height="300"
                  src={`${content.url}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  title={content.title}
                ></iframe>
              </div>
              <input
                type="text"
                id={`${id}-url-input`}
                placeholder="Embed URL"
                value={content.url}
                onChange={handleUrlChange}
                className="embed-url-input"
              />
              <input
                type="text"
                id={`${id}-title-input`}
                placeholder="Title"
                value={content.title}
                onChange={handleTitleChange}
                className="embed-title-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OembedSection;
