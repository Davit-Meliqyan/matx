import React from "react";
import { CiTrash } from "react-icons/ci";
import { getFileIcon } from "../../../../../../utils/getFileIcon";
const API_BASE_URL_IMG =
    import.meta.env.VITE_API_IMG || "http://62.169.23.81:9000";

interface LicenseFilesListProps {
  files: string[];
  onRemove: (fileName: string) => void;
}

const LicenseFilesList: React.FC<LicenseFilesListProps> = ({
  files,
  onRemove,
}) => {
  return (
    <div className="mt-4">
      <label className="font-semibold">Existing Files</label>
      <div className="flex flex-col gap-2 mt-2">
        {files.length ? (
          files.map((file) => (
            <div key={file} className="flex items-center gap-2">
              <span>{getFileIcon(file)}</span>
              <a
                href={`${API_BASE_URL_IMG}/files/${file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.split("/").pop()}
              </a>
              <CiTrash
                className="cursor-pointer text-red-500"
                onClick={() => onRemove(file)}
              />
            </div>
          ))
        ) : (
          <span>--</span>
        )}
      </div>
    </div>
  );
};

export default LicenseFilesList;
