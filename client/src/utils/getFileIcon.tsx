import { AiOutlineFileJpg } from "react-icons/ai";
import { FaRegFilePdf, FaRegFileWord, FaRegFileExcel, FaRegFileImage } from "react-icons/fa";
import { BsFiletypeDoc, BsFiletypeDocx } from "react-icons/bs";

export const getFileIcon = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "pdf":
      return <FaRegFilePdf className="inline-block mr-2 text-red-600 text-2xl" />;
    case "word":
      return <FaRegFileWord className="inline-block mr-2 text-blue-600 text-2xl" />;
    case "doc":
      return <BsFiletypeDoc className="inline-block mr-2 text-blue-600 text-2xl" />;
    case "docx":
      return <BsFiletypeDocx className="inline-block mr-2 text-blue-600 text-2xl" />;
    case "xls":
    case "xlsx":
      return <FaRegFileExcel className="inline-block mr-2 text-green-600 text-2xl" />;
    case "jpg":
    case "jpeg":
      return <AiOutlineFileJpg className="inline-block mr-2 text-yellow-600 text-2xl" />;
    case "png":
      return <FaRegFileImage className="inline-block mr-2 text-yellow-600 text-2xl" />;
    default:
      return null;
  }
};
