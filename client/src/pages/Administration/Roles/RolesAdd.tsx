import { useState } from "react";
import RolesForm from "./RolesForm";
import { toast } from "react-toastify";
import { PermissionItem } from "../../../types/permissions.interface";
import { useDynamicFetchStore } from "../../../store/useDynamicFetchStore";

type RolePayload = {
  name: string;
} & {
  [K in PermissionItem["code"]]: boolean;
};

const RolesAdd = () => {
  const [formData, setFormData] = useState<{ name: string }>({ name: "" });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const createItem = useDynamicFetchStore((state) => state.createItem);

  const handleCheckboxChange = (newSelected: string[]) => {
    setSelectedPermissions(newSelected);
  };

  const handleSubmit = async (payload: RolePayload) => {
    try {
      if (!payload.name) {
        return toast.warn("Name field is empty");
      }

      await createItem("roles", payload);

      setFormData({ name: "" });
      setSelectedPermissions([]);
      toast.success("Role created");
    } catch (error) {
      toast.error(
        "Error: " + (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  return (
    <RolesForm
      mode={true}
      selectedPermissions={selectedPermissions}
      onPermissionChange={handleCheckboxChange}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
    />
  );
};

export default RolesAdd;
