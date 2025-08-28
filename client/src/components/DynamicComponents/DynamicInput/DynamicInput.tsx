import React from "react";

interface DynamicInputProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number" | "date" | "email";
  disabled?: boolean;
}

const DynamicInput: React.FC<DynamicInputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  disabled,
}) => {
  return (
    <label className="w-full sm:max-w-[300px] flex flex-col gap-1">
      <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full h-[45px] p-2 rounded-md
          bg-white dark:bg-[#111827] text-gray-900 dark:text-white
          !border !border-solid !border-gray-300 dark:!border-gray-600
          disabled:!bg-gray-100 disabled:!text-gray-400
          dark:disabled:!bg-[#2a2a3d] dark:disabled:!text-gray-500
          disabled:!cursor-not-allowed
        `}
      />
    </label>
  );
};

export default DynamicInput;
