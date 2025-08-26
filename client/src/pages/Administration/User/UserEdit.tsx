/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import DynamicTabs from "../../../components/DynamicComponents/DynamicTabs/DynamicTabs";
import { useTabsStore } from "../../../store/tabsStore";
import { useNavigate, useParams } from "react-router-dom";
import { useDynamicFetchStore } from "../../../store/useDynamicFetchStore";
import { UserFormData } from "../../../types/user.interface";
import { toast } from "react-toastify";
import { useRouteSection } from "../../../hooks/useRouteSection";
import UserLicenses from "./Components/Licenses/UserLicenses";

const tabs = [
  { id: "info", label: "Member Info" },
  { id: "licenses", label: "Licenses" },
];

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
  { key: "position", label: "Position" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "E-mail" },
];

const UserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const updateItem = useDynamicFetchStore((state) => state.updateItem);
  const fetchItemById = useDynamicFetchStore((state) => state.fetchItemById);
  const rawRoles = useDynamicFetchStore((state) => state.items["roles"]);
  const fetchItems = useDynamicFetchStore((state) => state.fetchItems);
  const { buildPath } = useRouteSection();
  const deleteItem = useDynamicFetchStore((state) => state.deleteItem);

  const { activeTab } = useTabsStore();

  const [formData, setFormData] = useState<UserFormData>(initialForm);

  const roles = Array.isArray(rawRoles)
    ? rawRoles.map((r) => ({ value: r.id, label: r.name as string }))
    : [];

  useEffect(() => {
    fetchItems("roles");
    if (id) {
      fetchItemById("members", id).then((res: any) => {
        if (res) {
          setFormData({
            name: res.name || "",
            sureName: res.sureName || "",
            position: res.position || "",
            email: res.email || "",
            phone: res.phone || "",
            roles: res.roles?.map((r: any) => r.id) || [],
          });
        }
      });
    }
  }, [id, fetchItems, fetchItemById]);

  const handleChange = (
    field: keyof UserFormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // проверка обязательных текстовых полей
    for (const field of requiredFields) {
      const value = formData[field.key];
      if (!value || (typeof value === "string" && !value.trim())) {
        toast.warn(`${field.label} field is empty`);
        return;
      }
    }

    // проверка select (roles)
    if (!formData.roles || formData.roles.length === 0) {
      toast.warn("Roles must be selected");
      return;
    }

    try {
      if (!id) {
        toast.error("User ID not found");
        return;
      }

      await updateItem("members", id, formData);
      toast.success("User updated successfully");
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Failed to update user");
    }
  };

  const handleReset = () => {
    setFormData(initialForm);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem('members', id);
      navigate(buildPath(""));
    } catch (e: any) {
      toast.error("Error deleting item: " + e.message);
    }
  };

  return (
    <div className="w-[calc(100%-416px)] h-full flex flex-col items-start gap-5 p-5 rounded-2xl bg-[#FFFFFF]">
      <DynamicTabs tabs={tabs} />
      {activeTab === "info" ? (
        <UserForm
          formData={formData}
          roles={roles}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onReset={handleReset}
          mode={false}
          onDelete={() => handleDelete(id!)}
        />
      ) : (
        <UserLicenses id={id ?? ""} name={formData.name} surname={formData.sureName}/>
      )}
    </div>
  );
};

export default React.memo(UserEdit);
