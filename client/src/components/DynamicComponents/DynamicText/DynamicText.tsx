import React from "react";

interface DynamicTextProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DynamicText: React.FC<DynamicTextProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <label className="w-full sm:max-w-[300px] flex flex-col gap-1">
      <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">
        {label}
      </span>
      <textarea
        placeholder={`${label} text...`}
        value={value}
        onChange={onChange}
        className="
          w-full h-[130px] p-2 rounded-md
          bg-white dark:bg-[#111827] text-gray-900 dark:text-white
          !border !border-solid !border-gray-300 dark:!border-gray-700
          resize-none
        "
      />
    </label>
  );
};

export default DynamicText;
