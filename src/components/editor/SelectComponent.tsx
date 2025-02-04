import React from 'react';

interface Option {
  name: string;
  value: string;
  icon?: string;
}

interface SelectComponentProps {
  data: {
    name: string;
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
    <div className="flex">
      {data.map(({ name, value, options }) => (
        <div key={value} className="flex px-6 items-center mb-4">
          <label className="text-sm font-medium text-gray-700 w-32">
            {name}
          </label>
          <select
            value={values[value]}
            onChange={(e) => onChange(value, e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default SelectComponent;
