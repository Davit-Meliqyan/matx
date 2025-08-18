import { useState } from "react";
import DynamicInput from "../../../components/DynamicComponents/DynamicInput/DynamicInput";
import DynamicSelect from "../../../components/DynamicComponents/DynamicSelect/DynamicSelect";
import { UserFormData } from "../../../types/user.interface";

type UserFormProps = {
  mode: boolean;
};

const roles = [
  { id: "1", name: "Admin" },
  { id: "2", name: "Manager" },
  { id: "3", name: "User" },
];

const initialForm: UserFormData = {
  name: "",
  surname: "",
  positionName: "",
  email: "",
  phoneNumber: "",
  roleIds: [],
};

const requiredFields: { key: keyof Omit<UserFormData, "roleIds">; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "surname", label: "Surname" },
  { key: "positionName", label: "Position Name" },
  { key: "phoneNumber", label: "Phone" },
  { key: "email", label: "E-mail" },
];

const UserForm = ({ mode }: UserFormProps) => {
  console.log(mode);

  const [formData, setFormData] = useState<UserFormData>(initialForm);

  const handleInputChange = (field: keyof Omit<UserFormData, "roleIds">, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectChange = (value: string[]) => {
    setFormData((prev) => ({ ...prev, roleIds: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form:", formData);
  };

  const handleReset = () => {
    setFormData(initialForm);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h3 className="text-2xl font-semibold">Member</h3>

      <form
        className="max-w-[620px] flex flex-col gap-5"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className="w-full flex flex-wrap gap-5">
          {requiredFields.map(({ key, label }) => (
            <DynamicInput
              key={key}
              label={`${label}*`}
              value={formData[key]}
              type="text"
              onChange={(e) => handleInputChange(key, e.target.value)}
            />
          ))}

          <DynamicSelect
            label="Choose roles*"
            value={formData.roleIds}
            onChange={handleSelectChange}
            isMulti={true}
            options={roles.map((role) => ({
              value: role.id,
              label: role.name,
            }))}
          />
        </div>

        <div className="w-full flex justify-end flex-wrap gap-3">
          <button
            type="submit"
            className="bg-[#3C85E5] min-w-[190px] p-3 text-base text-white rounded-md transition-all duration-300 hover:bg-[#336FCC] hover:shadow-lg"
          >
            Save
          </button>
          <button
            type="reset"
            className="bg-[#F2F3F7] min-w-[190px] p-3 text-base text-[#000] rounded-md transition-all duration-300 hover:bg-[#ececf0] hover:shadow-lg"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
