import { BiImport } from "react-icons/bi";
import { AiOutlineDownload, AiOutlineFileJpg } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import {
  FaRegFilePdf,
  FaRegFileWord,
  FaRegFileExcel,
  FaRegFileImage,
} from "react-icons/fa";
import { BsFiletypeDocx, BsFiletypeDoc } from "react-icons/bs";

const licensesData = [
  {
    licenseName: { name: "narek.pdf", url: "/files/narek.pdf" },
    description: "Safe use of isotopes",
    organization: "XYZ",
    date: "01/01/2024",
    expiryDate: "01/01/2025",
    remind: "One month / two months",
    durationOfTraining: { time: "4", mount: "Hours / Days / Months" },
    status: "Active",
  },
];

const headers = [
  "License Name",
  "Description",
  "Organization issued",
  "Date",
  "Date of Expiry",
  "Remind about Expiry date",
  "Duration of training",
  "Status",
  "Action",
];

const getFileIcon = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "pdf":
      return (
        <FaRegFilePdf className="inline-block mr-2 text-red-600 text-lg" />
      );
    case "word":
      return (
        <FaRegFileWord className="inline-block mr-2 text-blue-600 text-lg" />
      );
    case "doc":
      return (
        <BsFiletypeDoc className="inline-block mr-2 text-blue-600 text-lg" />
      );
    case "docx":
      return (
        <BsFiletypeDocx className="inline-block mr-2 text-blue-600 text-lg" />
      );
    case "xls":
    case "xlsx":
      return (
        <FaRegFileExcel className="inline-block mr-2 text-green-600 text-lg" />
      );
    case "jpg":
    case "jpeg":
      return (
        <AiOutlineFileJpg className="inline-block mr-2 text-yellow-600 text-lg" />
      );
    case "png":
      return (
        <FaRegFileImage className="inline-block mr-2 text-yellow-600 text-lg" />
      );
    default:
      return null;
  }
};

const UserLicenses = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-start gap-5">
        <h3 className="text-2xl font-semibold">Licenses</h3>
        <button className="p-3 flex gap-2 items-center rounded-md text-[#B4B9C1] bg-[#F2F4F8] transition-all duration-300 ease-in-out delay-100 hover:text-[#253AA6] hover:bg-[#D6E0FF] hover:shadow-md">
          <BiImport className="text-xl text-black" />
          Import
        </button>
      </div>
      <div className="overflow-auto max-h-[100%] max-w-full">
        <table className="w-full border-collapse !border !border-[#E3EBF1] text-sm text-gray-700">
          <thead>
            <tr className="bg-[#F9FAFB] sticky top-0">
              {headers.map((header) => (
                <th
                  key={header}
                  className="!border !border-solid !border-[#E3EBF1] px-4 py-3 text-left font-medium text-gray-900 whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {licensesData.map((license, i) => (
              <tr key={i}>
                <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 flex items-center whitespace-nowrap">
                  {getFileIcon(license.licenseName.name)}
                  <a
                    href={license.licenseName.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {license.licenseName.name}
                  </a>
                </td>
                <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 whitespace-nowrap">
                  {license.description}
                </td>
                <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 whitespace-nowrap">
                  {license.organization}
                </td>
                <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 whitespace-nowrap">
                  {license.date}
                </td>
                <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 whitespace-nowrap">
                  {license.expiryDate}
                </td>
                <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 whitespace-nowrap">
                  {license.remind}
                </td>
                <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 whitespace-nowrap">
                  <span className="p-2 !border-r !border-solid !border-[#E3EBF1]">{license.durationOfTraining.time}</span>
                  <span className="p-2">{license.durationOfTraining.mount}</span>
                </td>
                <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 whitespace-nowrap">
                  {license.status}
                </td>
                <td className="!border !border-solid !border-[#E3EBF1] px-4 py-3 whitespace-nowrap">
                  <div className="flex gap-2">
                    <a href={license.licenseName.url} download>
                      <AiOutlineDownload className="text-[24px] cursor-pointer transition-all duration-300 hover:text-green-700" />
                    </a>
                    <CiTrash
                      className="text-[24px] cursor-pointer transition-all duration-300 hover:text-red-500"
                      onClick={() =>
                        alert(`Delete license: ${license.licenseName.name}`)
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserLicenses;
