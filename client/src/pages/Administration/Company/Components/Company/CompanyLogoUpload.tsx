import { IoIosRemoveCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { useDynamicFetchStore } from "../../../../../store/useDynamicFetchStore";

interface Props {
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}

const CompanyLogoUpload: React.FC<Props> = ({ fileName, setFileName }) => {
  const uploadFile = useDynamicFetchStore((state) => state.uploadFile);
  const removeFile = useDynamicFetchStore((state) => state.removeFile);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      await uploadFile("company/logo", file);
    }
  };

  const handleRemoveLogo = async () => {
    if (fileName !== "") {
      const data = await removeFile("company/logo");
      if (data) {
        toast.success(data);
        setFileName("");
      }
    }
  };

  return (
    <div className="w-full flex gap-3">
      <label className="cursor-pointer inline-flex items-center gap-3 p-2 bg-violet-200 text-violet-700 font-semibold rounded-full hover:bg-violet-100">
        Choose file
        <input type="file" className="hidden" onChange={handleFileChange} />
        {fileName && (
          <span className="text-sm text-gray-700 truncate max-w-[200px]">
            {fileName}
          </span>
        )}
      </label>
      {fileName && (
        <button type="button" onClick={handleRemoveLogo}>
          <IoIosRemoveCircle className="text-2xl text-[#f00]" />
        </button>
      )}
    </div>
  );
};

export default CompanyLogoUpload;
