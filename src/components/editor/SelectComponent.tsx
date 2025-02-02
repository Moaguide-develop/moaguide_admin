import React from 'react';

interface Option {
  label: string;
  value: string;
  icon?: string;
}

interface SelectComponentProps {
  data: {
    label: string;
    value: string;
    options: Option[];
  }[];
  values: { [key: string]: string };
  onChange: (key: string, value: string) => void;
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
          <label className="text-sm font-medium text-gray-700 w-32">
            {label}
          </label>
          <div className="flex-1">
            <select
              value={values[value]}
              onChange={(e) => onChange(value, e.target.value)}
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
