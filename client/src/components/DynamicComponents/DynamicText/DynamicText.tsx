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
      <span className="text-[#474B57] dark:text-[#FFFFFF] text-sm font-medium">
        {label}
      </span>
      <textarea
        placeholder={`${label} text...`}
        value={value}
        onChange={onChange}
        className="w-full h-[130px] p-2 rounded-md !bg-white dark:!bg-[#2B2B2B] !text-[#1B1B1B] dark:!text-white !border !border-solid !border-[#E6E7E8] dark:!border-[#4b4b4b] resize-none"
      />
    </label>
  );
};

export default DynamicText;
