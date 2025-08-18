import React, { useRef } from "react";
import DynamicTopBar from "../../../components/DynamicComponents/DynamicTopBar/DynamicTopBar";
import DynamicInput from "../../../components/DynamicComponents/DynamicInput/DynamicInput";
import DynamicSelect from "../../../components/DynamicComponents/DynamicSelect/DynamicSelect";
type FormData = {
  name: string;
  roleIds: string[];
};

type PositionFormProps = {
  mode: boolean;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (e: React.FormEvent) => void;
};

const roles = [
  { id: "1", name: "Admin" },
  { id: "2", name: "Manager" },
  { id: "3", name: "User" },
];

const PositionForm: React.FC<PositionFormProps> = ({
  mode,
  formData,
  setFormData,
  onSubmit,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSaveClick = () => formRef.current?.requestSubmit();

  const handleChange =
    (field: keyof typeof formData) => (value: string | string[]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <DynamicTopBar mode={mode} onSaveClick={handleSaveClick} />
      <div className="w-full h-full flex items-start justify-between flex-wrap gap-5 p-3 rounded-lg bg-[#FFFFFF]">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="w-[280px] flex flex-col gap-2"
        >
          <DynamicInput
            label="Full Name*"
            value={formData.name}
            type="text"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <DynamicSelect
            label="Choose roles*"
            value={formData.roleIds}
            onChange={handleChange("roleIds")}
            isMulti={true}
            options={roles.map((role) => ({
              value: role.id,
              label: role.name,
            }))}
          />
        </form>
      </div>
    </div>
  );
};

export default PositionForm;
