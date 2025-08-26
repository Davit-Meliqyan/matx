import DynamicInput from "../../../components/DynamicComponents/DynamicInput/DynamicInput";
import DynamicSelect from "../../../components/DynamicComponents/DynamicSelect/DynamicSelect";
import { UserFormData } from "../../../types/user.interface";

type UserFormProps = {
  formData: UserFormData;
  roles: { value: string; label: string }[];
  onChange: (field: keyof UserFormData, value: string | string[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  mode: boolean;
  onDelete?: () => void;
};

const requiredFields: {
  key: keyof Omit<UserFormData, "roles">;
  label: string;
}[] = [
  { key: "name", label: "Name" },
  { key: "sureName", label: "Surname" },
  { key: "position", label: "Position Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "E-mail" },
];

const UserForm = ({
  formData,
  roles,
  onChange,
  onSubmit,
  onReset,
  mode,
  onDelete,
}: UserFormProps) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <h3 className="text-2xl font-semibold">
        You view: (
        {[formData.name, formData.sureName].filter(Boolean).join(" ")})
      </h3>
      <form
        className="max-w-[620px] flex flex-col gap-5"
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <div className="w-full flex flex-wrap gap-5">
          {requiredFields.map(({ key, label }) => (
            <DynamicInput
              key={key}
              label={`${label}*`}
              value={formData[key] as string}
              type="text"
              onChange={(e) => onChange(key, e.target.value)}
            />
          ))}

          <DynamicSelect
            label="Choose roles*"
            value={formData.roles}
            onChange={(val) => onChange("roles", val)}
            isMulti={true}
            options={roles}
          />
        </div>

        <div className="w-full flex justify-end flex-wrap gap-3">
          <button
            type="submit"
            className="bg-[#3C85E5] min-w-[190px] p-3 text-base text-white rounded-md transition-all duration-300 hover:bg-[#336FCC] hover:shadow-lg"
          >
            Save
          </button>
          {mode === false && onDelete && (
            <button
              type="button"
              className="bg-[#ff0000] min-w-[190px] p-3 text-base text-[#fff] rounded-md transition-all duration-300 hover:bg-[#ff2626] hover:shadow-lg"
              onClick={onDelete}
            >
              Remove
            </button>
          )}
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
