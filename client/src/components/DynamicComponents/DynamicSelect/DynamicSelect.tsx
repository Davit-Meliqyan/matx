import React from "react";
import Select from "react-select";

interface OptionsProps {
  label: string;
  value: string;
}

interface CustomerSelectBooleanProps {
  label?: string;
  value: string | string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...args: any[]) => void;
  options: OptionsProps[];
  isMulti?: boolean;
}

const DynamicSelect: React.FC<CustomerSelectBooleanProps> = ({
  label,
  value,
  options,
  onChange,
  isMulti = false,
}) => {
  const selectedValue = isMulti
    ? options.filter((opt) => (value as string[]).includes(opt.value))
    : options.find((opt) => opt.value === value);

  return (
    <label className="w-full sm:max-w-[300px] flex flex-col gap-1">
      {label && (
        <span className="text-[#474B57] dark:text-[#FFFFFF] text-sm font-medium mb-1">
          {label}
        </span>
      )}
      <Select
        options={options}
        value={selectedValue}
        isMulti={isMulti}
        onChange={(selectedOption) => {
          if (isMulti) {
            const selected = Array.isArray(selectedOption)
              ? selectedOption.map((opt) => opt.value)
              : [];
            onChange(selected); // string[]
          } else {
            if (selectedOption) {
              onChange((selectedOption as OptionsProps).value); // string
            }
          }
        }}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "white",
            borderColor: "#E6E7E8",
            borderRadius: "6px",
            minHeight: "38px",
          }),
        }}
        classNamePrefix="react-select"
        menuPlacement="auto"
        menuPosition="absolute"
      />
    </label>
  );
};

export default DynamicSelect;
