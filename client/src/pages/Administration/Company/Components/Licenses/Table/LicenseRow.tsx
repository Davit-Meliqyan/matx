import React, { memo } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { CiEdit, CiTrash } from "react-icons/ci";
import { getFileIcon } from "../../../../../../utils/getFileIcon";
import { LicenseCompany } from "../../../../../../types/dynamicTables";
import dayjs from "dayjs";

interface LicenseRowProps {
  license: LicenseCompany;
  onDelete: (id: string, name: string) => void;
  onEdit: (id: string) => void;
}

const LicenseRow: React.FC<LicenseRowProps> = ({
  license,
  onDelete,
  onEdit,
}) => {
  return (
    <tr>
      {/* Icons */}
      <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 whitespace-nowrap">
        <div className="flex gap-1">
          {license.fileURLs && license.fileURLs.length > 0 ? (
            license.fileURLs.map((file) => (
              <a
                key={file}
                href={`/images/files/${file}`}
                target="_blank"
                rel="noopener noreferrer"
                title={file.split("/").pop()}
              >
                {getFileIcon(file)}
              </a>
            ))
          ) : (
            <span>--</span>
          )}
        </div>
      </td>

      {/* Downloads */}
      <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 whitespace-nowrap">
        <div className="flex gap-1">
          {license.fileURLs && license.fileURLs.length > 0 ? (
            license.fileURLs.map((file) => (
              <a key={file} href={`/images/files/${file}`} download>
                <AiOutlineDownload
                  title="Download"
                  className="text-[24px] cursor-pointer transition-all duration-300 hover:text-green-700"
                />
              </a>
            ))
          ) : (
            <span>--</span>
          )}
        </div>
      </td>

      {/* License Name */}
      <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 whitespace-nowrap">
        <span>{license.name}</span>
      </td>

      {/* Description */}
      <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 whitespace-nowrap">
        {license.description}
      </td>

      {/* Organization issued */}
      <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 whitespace-nowrap">
        {license.organizationIssued}
      </td>

      {/* Date */}
      <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 whitespace-nowrap">
        {license.date ? dayjs(license.date).format("YYYY-MM-DD") : "--"}
      </td>

      {/* Date of Expiry */}
      <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 whitespace-nowrap">
        {license.date ? dayjs(license.dateOfExpiry).format("YYYY-MM-DD") : "--"}
      </td>

      {/* Remind about Expiry date */}
      <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 whitespace-nowrap">
        {license.expiryReminder
          ? license.expiryReminder
              .toLowerCase()
              .split("_")
              .map((word) => word[0].toUpperCase() + word.slice(1))
              .join(" ")
          : "--"}
      </td>

      {/* Status */}
      <td className={`!border !border-solid !border-[#E3EBF1] px-4 py-3`}>
        <span
          className={`px-2 py-2 rounded-md whitespace-nowrap text-white text-center ${
            license.active ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {license.active ? "Active" : "Inactive"}
        </span>
      </td>

      {/* Actions */}
      <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 whitespace-nowrap">
        <div className="flex gap-2">
          <CiTrash
            title="Remove"
            className="text-[24px] cursor-pointer transition-all duration-300 hover:text-red-500"
            onClick={() => onDelete(license.id, license.name)}
          />
          <CiEdit
            title="Edit"
            className="text-[24px] cursor-pointer transition-all duration-300 hover:text-blue-500"
            onClick={() => onEdit(license.id)}
          />
        </div>
      </td>
    </tr>
  );
};

export default memo(LicenseRow);
