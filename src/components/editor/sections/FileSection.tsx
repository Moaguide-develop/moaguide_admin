// src/components/editor/sections/FileSection.tsx
import React from 'react';
import { FileSection as FileSectionType } from '../common/sectionProps/FileSection';

interface FileSectionProps extends FileSectionType {
  id: string;
  compid: string;
  a11yTitle: string;
  content: FileSectionType['content'];
  onUpdate: (updatedContent: FileSectionType['content']) => void;
}

const FileSection: React.FC<FileSectionProps> = ({
  id,
  compid,
  a11yTitle,
  content,
}) => {
  return (
    <div
      className="se-component se-file se-l-default"
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
            className="se-section se-section-file se-l-default se-section-align-left"
            draggable="true"
            id={`${id}-file-section`}
          >
            <div
              className="se-module se-module-file __se-unit"
              id={`${id}-file-module`}
            >
              <span className="se-file-icon" id={`${id}-file-icon`}>
                <strong className="se-blind" id={`${id}-file-icon-label`}>
                  파일 첨부
                </strong>
              </span>
              <span className="se-file-name" id={`${id}-file-name`}>
                {content.fileName}
              </span>
              <span
                className="se-file-status-icon"
                id={`${id}-file-status-icon`}
              ></span>
              <div
                className="__se-toolbar-slot __se-cursor-unrelated"
                style={{ display: 'none' }}
                id={`${id}-toolbar`}
              >
                <div id={`${id}-toolbar-content`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileSection;
