import DynamicInput from "../../../../../components/DynamicComponents/DynamicInput/DynamicInput";
import { Company } from "../../../../../types/item.interface";

interface Props {
  requiredFields: { key: string; label: string }[];
  formData: Company;
  setFormData: React.Dispatch<React.SetStateAction<Company>>;
}

const CompanyInputs: React.FC<Props> = ({ requiredFields, formData, setFormData }) => {
  return (
    <div className="w-full flex flex-wrap gap-5">
      {requiredFields.map(({ key, label }) => (
        <DynamicInput
          key={key}
          label={`${label}*`}
          value={formData[key as keyof Company] || ""}
          type="text"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, [key]: e.target.value }))
          }
        />
      ))}
    </div>
  );
};

export default CompanyInputs;
