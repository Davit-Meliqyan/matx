import { useRef } from "react";
import DynamicTopBar from "../../../components/DynamicComponents/DynamicTopBar/DynamicTopBar";

import { PERMISSIONS, PermissionItem } from "../../../types/permissions.interface";
import RoleNameInput from "./Components/Form/RoleNameInput";
import PermissionsList from "./Components/Form/PermissionsList";

type FormData = { name: string };

type RolePayload = { name: string } & { [K in PermissionItem["code"]]: boolean };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = PERMISSIONS.reduce(
      (acc, item) => {
        acc[item.code] = selectedPermissions.includes(item.code);
        return acc;
      },
      { name: formData.name } as RolePayload
    );
    onSubmit(payload);
  };

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <DynamicTopBar mode={mode} onSaveClick={handleSaveClick} />
      <div className="w-full h-full flex items-start justify-between flex-wrap gap-5 p-3 rounded-lg bg-[#FFFFFF] dark:bg-[#111827]">
        <form ref={formRef} onSubmit={handleSubmit} className="w-[280px] flex flex-col gap-6">
          <RoleNameInput formData={formData} setFormData={setFormData} />
          <PermissionsList
            selectedPermissions={selectedPermissions}
            onChange={onPermissionChange}
          />
        </form>
      </div>
    </div>
  );
};

export default RolesForm;
