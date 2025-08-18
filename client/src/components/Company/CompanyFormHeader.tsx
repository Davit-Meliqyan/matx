// CompanyFormHeader.tsx
import { FiSave } from "react-icons/fi";
import { MdPublishedWithChanges } from "react-icons/md";

type Props = {
  mode: boolean;
};

const CompanyFormHeader = ({ mode }: Props) => {
  return (
    <div className="w-full p-3 flex items-center justify-between gap-2 rounded-lg bg-[#FFFFFF]">
      <h2 className="text-lg font-semibold">Company</h2>

      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="p-2 rounded-md bg-gray-700 text-white transition-all duration-300 hover:bg-green-700"
          title={mode ? "save" : "update"}
        >
          {mode ? (
            <MdPublishedWithChanges className="text-[24px]" />
          ) : (
            <FiSave className="text-[24px]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CompanyFormHeader;
