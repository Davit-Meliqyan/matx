import { License } from "../../../../../../store/useLicensesFetchStore";
import LicenseRow from "./LicenseRow";

interface LicensesTableProps {
  licenses: License[];
  onEdit: (id: string) => void;
  onDelete: (id: string, name: string) => void;
}

const headers = [
  "Icons",
  "License Name",
  "Description",
  "Organization issued",
  "Date",
  "Date of Expiry",
  "Remind about Expiry date",
  "Status",
  "Action",
];

const LicensesTable: React.FC<LicensesTableProps> = ({ licenses, onEdit, onDelete }) => {
  return (
    <div className="overflow-auto custom-global-scroll max-h-[calc(100vh-280px)] max-w-full">
      <table className="w-full border-collapse !border !border-solid !border-[#E3EBF1] dark:!border-[#333] text-sm text-gray-700 dark:text-gray-300">
        <thead>
          <tr className="bg-[#F9FAFB] dark:bg-[#141e35] sticky top-[-1px]">
            {headers.map((header) => (
              <th
                key={header}
                className="!border !border-solid !border-[#E3EBF1] dark:!border-[#444] px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-200 whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {licenses.map((license) => (
            <LicenseRow
              key={license.id}
              license={license}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LicensesTable;
