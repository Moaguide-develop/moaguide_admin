import React from 'react';
import { Paragraph } from './common/commonSection';

const Toolbar: React.FC<{
  onApplyStyle: (style: Partial<Paragraph['className']>) => void;
}> = ({ onApplyStyle}) => {
  
  return (
    <div className="flex justify-start gap-2 p-2 border-b bg-gray-100">
      <button
        onClick={() => onApplyStyle('text-left')}
        className="bg-gray-200 text-gray-800 px-4 py-2"
      >
        ← 왼쪽 정렬
      </button>
      <button
        onClick={() => onApplyStyle('text-center')}
        className="bg-gray-200 text-gray-800 px-4 py-2"
      >
        ↔ 가운데 정렬
      </button>
      <button
        onClick={() => onApplyStyle('text-right')}
        className="bg-gray-200 text-gray-800 px-4 py-2"
      >
        → 오른쪽 정렬
      </button>
    </div>
  );
};

export default Toolbar;
