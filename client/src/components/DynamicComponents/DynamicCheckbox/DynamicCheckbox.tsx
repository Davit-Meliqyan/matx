import { FaCheck } from "react-icons/fa";

type item = {
  id: string;
  code?: string;
  description?: string;
  name: string;
  section?: string;
};

type DynamicCheckboxProps = {
  data: item;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const DynamicCheckbox: React.FC<DynamicCheckboxProps> = ({
  data,
  checked,
  onChange,
}) => {
  return (
    <label
      htmlFor={data.id}
      className="w-max flex items-center gap-2 cursor-pointer"
    >
      <div className="relative w-5 h-5 rounded flex items-center justify-center">
        <input
          type="checkbox"
          name={data.id}
          id={data.id}
          className="peer hidden"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-5 h-5 absolute top-0 left-0 rounded !border !border-solid !border-gray-400 peer-checked:bg-[#1A5370] peer-checked:border-[#1A5370]" />
        <FaCheck className="text-[14px] z-10 text-transparent peer-checked:text-[#ffffff]" />
      </div>
      <span className="text-sm font-medium">{data.name}</span>
    </label>
  );
};

export default DynamicCheckbox;
