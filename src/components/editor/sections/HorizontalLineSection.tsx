// components/sections/HorizontalLineSection.tsx
import React from 'react';
import { LineType } from '../common/sectionProps/HorizontalLineSection';

interface HorizontalLineSectionProps {
  id: string;
  compid: string;
  a11yTitle: string;
  styleType: LineType;
}

const HorizontalLineSection: React.FC<HorizontalLineSectionProps> = ({
  id,
  compid,
  a11yTitle,
  styleType,
}) => {
  const lineClass = styleType === 'line1' ? 'se-l-line1' : 'se-l-default';

  return (
    <div
      className={`se-component se-horizontalLine ${lineClass}`}
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
          data-unitid
          data-compid={compid}
          data-direction="top"
        >
          <div
            draggable="true"
            className="se-section se-section-horizontalLine se-l-line1 se-section-align-left se-is-selected se-is-activated"
          >
            <div className="se-module se-module-horizontalLine __se-unit">
              <span className="se-hr-invisible"></span>
              <hr className="se-hr" />
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

export default HorizontalLineSection;
