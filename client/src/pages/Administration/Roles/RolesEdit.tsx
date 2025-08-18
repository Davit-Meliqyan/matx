import { useState } from "react";
import RolesForm from "./RolesForm";
import { useParams } from "react-router-dom";

const RolesEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<{ name: string }>({
    name: "",
  });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedPermissions((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    alert('22', )
  };

  console.log(id);
  

  return (
    <RolesForm
      mode={false}
      selectedPermissions={selectedPermissions}
      onPermissionChange={handleCheckboxChange}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
    />
  );
};

export default RolesEdit;
