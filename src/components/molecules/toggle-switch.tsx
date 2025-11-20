import React from 'react';

type ToggleProps = {
  label?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

const ToggleSwitch: React.FC<ToggleProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex cursor-pointer items-center gap-2 select-none">
      <div
        className={`flex h-5 w-10 items-center rounded-full p-1 transition-all duration-300 ${checked ? 'bg-blue-500' : 'bg-gray-300'
        }`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>

      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
};

export default ToggleSwitch;
