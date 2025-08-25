import { FaRegTrashAlt } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { FiSave } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRouteSection } from "../../../hooks/useRouteSection";
import { toast } from "react-toastify";
import { memo } from "react";
import { MdPublishedWithChanges } from "react-icons/md";
import { useDynamicFetchStore } from "../../../store/useDynamicFetchStore";

type DepartmentProps = {
  mode: boolean;
  onSaveClick?: () => void;
};

const DynamicTopBar: React.FC<DepartmentProps> = ({ mode, onSaveClick }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { section, buildPath } = useRouteSection();
  const deleteItem = useDynamicFetchStore((state) => state.deleteItem);

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(section, id);
      navigate(buildPath(""));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error("Error deleting item: " + e.message);
    }
  };

  return (
    <div className="w-full p-3 flex items-center justify-between gap-2 rounded-lg bg-[#FFFFFF]">
      <h2 className="text-lg font-semibold">
        {mode ? `Add ${section}` : `Edit ${section}`}
      </h2>

      <div className="flex items-center gap-2">
        <button
          onClick={onSaveClick}
          className="p-2 rounded-md bg-gray-700 text-white transition-all duration-300 hover:bg-green-700"
          title={mode ? "save" : "update"}
        >
          {mode ? (
            <FiSave className="text-[24px]" />
          ) : (
            <MdPublishedWithChanges className="text-[24px]" />
          )}
        </button>

        {!mode && (
          <button
            onClick={() => {
              if (id) {
                handleDelete(id);
              } else {
                toast.error("ID not set");
              }
            }}
            className="p-2 rounded-md bg-gray-700 text-[#FFFFFF] transition-all duration-300 hover:bg-red-500"
            title="Remove"
          >
            <FaRegTrashAlt className="text-[24px]" />
          </button>
        )}
        <Link
          to={buildPath("")}
          className="p-2 rounded-md bg-gray-700 text-[#FFFFFF] transition-all duration-300 hover:bg-blue-800"
          title="Close"
        >
          <RiCloseLargeFill className="text-[24px]" />
        </Link>
      </div>
    </div>
  );
};

export default memo(DynamicTopBar);
