import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { useDynamicFetchStore } from "../../../store/useDynamicFetchStore";
import { UserFormData } from "../../../types/user.interface";
import { toast } from "react-toastify";

const initialForm: UserFormData = {
  name: "",
  sureName: "",
  position: "",
  email: "",
  phone: "",
  roles: [],
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

const UserAdd = () => {
  const createItem = useDynamicFetchStore((state) => state.createItem);
  const rawRoles = useDynamicFetchStore((state) => state.items["roles"]);
  const fetchItems = useDynamicFetchStore((state) => state.fetchItems);

  const [formData, setFormData] = useState<UserFormData>(initialForm);

  const roles = Array.isArray(rawRoles)
    ? rawRoles.map((r) => ({ value: r.id, label: r.name as string }))
    : [];

  useEffect(() => {
    fetchItems("roles");
  }, [fetchItems]);

  const handleChange = (
    field: keyof UserFormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    for (const field of requiredFields) {
      const value = formData[field.key];
      if (!value || (typeof value === "string" && !value.trim())) {
        toast.warn(`${field.label} field is empty`);
        return;
      }
    }

    if (!formData.roles || formData.roles.length === 0) {
      toast.warn("Roles must be selected");
      return;
    }

    try {
      await createItem("members", formData);
      toast.success("User created successfully");
      console.log("User created:", formData);
      setFormData(initialForm);
    } catch (err) {
      console.error("Error creating user:", err);
      toast.error("Failed to create user");
    }
  };

  const handleReset = () => {
    setFormData(initialForm);
  };

  return (
    <div className="w-full h-full flex flex-col items-start gap-5 p-5 rounded-2xl bg-[#FFFFFF]">
      <UserForm
        formData={formData}
        roles={roles}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
        mode={true}
      />
    </div>
  );
};

export default UserAdd;
