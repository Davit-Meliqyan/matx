import { useState } from "react";
import PositionForm from "./PositionForm";

type PositionFormData = {
  name: string;
  roleIds: string[];
  createByUserId?: string;
};

const PositionAdd = () => {

  const [formData, setFormData] = useState<PositionFormData>({
    name: "",
    roleIds: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    alert(111);
  };

  return (
    <PositionForm
      mode={true}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
    />
  );
};

export default PositionAdd;
