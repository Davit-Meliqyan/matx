import { useRef } from "react";
import DynamicCheckbox from "../../../components/DynamicComponents/DynamicCheckbox/DynamicCheckbox";
import DynamicTopBar from "../../../components/DynamicComponents/DynamicTopBar/DynamicTopBar";
import DynamicInput from "../../../components/DynamicComponents/DynamicInput/DynamicInput";
import { PERMISSIONS, PermissionItem } from "../../../types/permissions.interface";

type FormData = { name: string };

type RolePayload = {
  name: string;
} & {
  [K in PermissionItem["code"]]: boolean;
};

type RolesFormProps = {
  mode: boolean;
  selectedPermissions: string[];
  onPermissionChange: (newSelected: string[]) => void;
  onSubmit: (payload: RolePayload) => void; 
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const RolesForm: React.FC<RolesFormProps> = ({
  mode,
  selectedPermissions,
  onPermissionChange,
  onSubmit,
  formData,
  setFormData,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSaveClick = () => formRef.current?.requestSubmit();

  const handleCheckboxChangeInternal = (code: string, checked: boolean) => {
    const item = PERMISSIONS.find((i) => i.code === code);
    if (!item) return;

    const groupItems = PERMISSIONS.filter((i) => i.group === item.group).map((i) => i.code);
    let newSelected = [...selectedPermissions];

    if (checked) {
      groupItems.forEach((c) => {
        if (!newSelected.includes(c)) newSelected.push(c);
      });
    } else {
      newSelected = newSelected.filter((c) => !groupItems.includes(c));
    }

    onPermissionChange(newSelected);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = PERMISSIONS.reduce((acc, item) => {
      acc[item.code] = selectedPermissions.includes(item.code);
      return acc;
    }, { name: formData.name } as RolePayload);
    onSubmit(payload);
  };

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <DynamicTopBar mode={mode} onSaveClick={handleSaveClick} />
      <div className="w-full h-full flex items-start justify-between flex-wrap gap-5 p-3 rounded-lg bg-white">
        <form ref={formRef} onSubmit={handleSubmit} className="w-[280px] flex flex-col gap-6">
          <DynamicInput
            label="Name*"
            value={formData.name}
            type="text"
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          />
          <div className="flex flex-col gap-4">
            {PERMISSIONS.map((item) => (
              <DynamicCheckbox
                key={item.id}
                data={item}
                checked={selectedPermissions.includes(item.code)}
                onChange={(checked) => handleCheckboxChangeInternal(item.code, checked)}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RolesForm;
