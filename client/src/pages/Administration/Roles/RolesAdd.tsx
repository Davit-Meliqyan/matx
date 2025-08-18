import { useState } from "react";
import RolesForm from "./RolesForm";

const RolesAdd = () => {

  const [formData, setFormData] = useState<{ name: string }>({
    name: "",
  });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const handleCheckboxChange = (code: string, checked: boolean) => {
    setSelectedPermissions((prev) =>
      checked ? [...prev, code] : prev.filter((itemId) => itemId !== code)
    );
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   alert(1111)
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
