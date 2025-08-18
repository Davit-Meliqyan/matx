import { useRef } from "react";
import DynamicCheckbox from "../../../components/DynamicComponents/DynamicCheckbox/DynamicCheckbox";
import DynamicTopBar from "../../../components/DynamicComponents/DynamicTopBar/DynamicTopBar";
import DynamicInput from "../../../components/DynamicComponents/DynamicInput/DynamicInput";

type FormData = {
  name: string;
};

type RolesFormProps = {
  mode: boolean;
  selectedPermissions: string[];
  onPermissionChange: (id: string, checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const items = [
  { id: "1", code: "user:view", name: "View Users" },
  { id: "2", code: "user:edit", name: "Edit Users" },
  { id: "3", code: "role:view", name: "View Roles" },
  { id: "4", code: "role:edit", name: "Edit Roles" },
];


const RolesForm: React.FC<RolesFormProps> = ({
  mode,
  selectedPermissions,
  onPermissionChange,
  onSubmit,
  formData,
  setFormData,
}) => {

  const formRef = useRef<HTMLFormElement>(null);
  const handleSaveClick = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <DynamicTopBar mode={mode} onSaveClick={handleSaveClick} />
      <div className="w-full h-full flex items-start justify-between flex-wrap gap-5 p-3 rounded-lg bg-[#FFFFFF]">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="w-[280px] flex flex-col gap-6"
        >
          <DynamicInput
            label="Name*"
            value={formData.name}
            type="text"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <div className="flex flex-col gap-4">
            {items.map((item) =>
              item.code ? (
                <DynamicCheckbox
                  key={item.id}
                  data={item}
                  checked={selectedPermissions.includes(item.code)}
                  onChange={(checked) =>
                    onPermissionChange(item.code!, checked)
                  }
                />
              ) : null
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RolesForm;
