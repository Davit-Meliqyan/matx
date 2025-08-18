import { useState } from "react";
import PositionForm from "./PositionForm";

type PositionFormData = {
  name: string;
  roleIds: string[];
};

const PositionEdit = () => {
  const [formData, setFormData] = useState<PositionFormData>({
    name: "",
    roleIds: [],
  });



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    alert(555)
  };

  return (
    <PositionForm
      mode={false}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
    />
  );
};

export default PositionEdit;
