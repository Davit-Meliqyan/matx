/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Select from "react-select";

interface OptionsProps {
  label: string;
  value: string;
}

interface CustomerSelectBooleanProps {
  label?: string;
  value: string | string[];
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
        <span className="text-gray-700 dark:text-gray-200 text-sm font-medium mb-1">
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
            onChange(selected);
          } else {
            if (selectedOption) {
              onChange((selectedOption as OptionsProps).value);
            }
          }
        }}
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: "inherit",
            borderColor: state.isFocused ? "#1A5370" : "#D1D5DB",
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 6,
            minHeight: 38,
            color: "inherit",
            boxShadow: state.isFocused ? "0 0 0 1px #1A5370" : "none",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "inherit",
            borderStyle: "solid",
            borderColor: "#D1D5DB",
            borderWidth: 1,
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused
              ? "rgba(26,83,112,0.1)"
              : state.isSelected
              ? "#1A5370"
              : "inherit",
            color: state.isSelected ? "#ffffff" : "inherit",
          }),
        }}
        classNamePrefix="react-select"
        className="!border !border-solid !border-gray-300 dark:!border-gray-600 bg-white dark:bg-[#111827] text-gray-900 dark:text-white rounded"
        menuPlacement="auto"
        menuPosition="absolute"
      />
    </label>
  );
};

export default DynamicSelect;
