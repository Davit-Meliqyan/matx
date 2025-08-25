import DynamicInput from "../../../../../components/DynamicComponents/DynamicInput/DynamicInput";

type RoleNameInputProps = {
  formData: { name: string };
  setFormData: React.Dispatch<React.SetStateAction<{ name: string }>>;
};

const RoleNameInput: React.FC<RoleNameInputProps> = ({ formData, setFormData }) => {
  return (
    <DynamicInput
      label="Name*"
      value={formData.name}
      type="text"
      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
    />
  );
};

export default RoleNameInput;
