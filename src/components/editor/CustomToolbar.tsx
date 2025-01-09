import React from 'react';
import { SectionType, toolbarSections } from './common/commonSection';

interface ToolbarProps {
  onAction: (action: string, type?: SectionType) => void;
}

const CustomToolbar: React.FC<ToolbarProps> = ({ onAction }) => {
  return (
      <div className="toolbar_section flex gap-2 p-2 bg-gray-100 border-b">
        {toolbarSections.map((button) => (
          <button
            key={button.name}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => onAction(button.action, button.type)}
          >
            {button.icon} {button.label}
          </button>
        ))}
      </div>
  );
};

export default CustomToolbar;
