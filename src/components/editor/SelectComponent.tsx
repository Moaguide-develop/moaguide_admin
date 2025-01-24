import React from 'react';

interface Option {
  label: string;
  value: string;
  icon?: string; // 아이콘(이모지) 지원
}

interface SelectComponentProps {
  data: {
    label: string;
    value: string;
    options: Option[];
  }[];
  values: { [key: string]: string }; // 현재 선택된 값들
  onChange: (key: string, value: string) => void; // 변경 핸들러
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  data,
  values,
  onChange,
}) => {
  return (
    <div>
      {data.map(({ label, value, options }) => (
        <div key={value} className="flex items-center mb-4">
          {/* Label */}
          <label className="text-sm font-medium text-gray-700 w-32">
            {label}
          </label>
          {/* Select Box */}
          <div className="flex-1">
            <select
              value={values[value]} // 상태에서 해당 드롭다운의 값을 가져옴
              onChange={(e) => onChange(value, e.target.value)} // 드롭다운 변경 시 상태 업데이트
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectComponent;
