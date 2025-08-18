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
      <span className="text-[#474B57] dark:text-[#FFFFFF] text-sm font-medium">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full h-[45px] p-2 rounded-md
          !bg-white dark:!bg-[#2B2B2B] !text-[#1B1B1B] dark:!text-white
          !border !border-solid !border-[#E6E7E8] dark:!border-[#4b4b4b]
          disabled:!bg-[#f5f5f5] dark:disabled:!bg-[#3a3a3a]
          disabled:!text-[#A0A0A0] dark:disabled:!text-[#777]
          disabled:cursor-not-allowed
        `}
      />
    </label>
  );
};

export default DynamicInput;
