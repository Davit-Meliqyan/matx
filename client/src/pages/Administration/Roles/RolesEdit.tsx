import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RolesForm from "./RolesForm";
import {
  PermissionItem,
  PERMISSIONS,
} from "../../../types/permissions.interface";
import { useDynamicFetchStore } from "../../../store/useDynamicFetchStore";
import { toast } from "react-toastify";
import { Spin } from "antd";

type RolePayload = {
  name: string;
} & {
  [K in PermissionItem["code"]]: boolean;
};

const RolesEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<{ name: string }>({ name: "" });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const updateItem = useDynamicFetchStore((state) => state.updateItem);
  const fetchItemById = useDynamicFetchStore((state) => state.fetchItemById);

  const handleCheckboxChange = (newSelected: string[]) => {
    setSelectedPermissions(newSelected);
  };

  useEffect(() => {
    if (!id) return;

    const fetchRole = async () => {
      setLoading(true);

      try {
        const data = await fetchItemById("roles", id);

        setFormData({ name: data.name || "" });

        const roleData = data as unknown as RolePayload;
        setSelectedPermissions(
          PERMISSIONS.filter((p) => roleData[p.code]).map((p) => p.code)
        );
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error(
          "Error: " + (error instanceof Error ? error.message : "Unknown error")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [id, fetchItemById]);

  const handleSubmit = async (payload: RolePayload) => {
    try {
      if (!id) {
        toast.error("Role ID not specified for update");
        return;
      }

      if (!payload.name) {
        return toast.warn("Name field is empty");
      }

      await updateItem("roles", id, {...payload });

      toast.success("Role updated successfully");
    } catch (error) {
      toast.error(
        "Error: " + (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <RolesForm
          mode={false}
          selectedPermissions={selectedPermissions}
          onPermissionChange={handleCheckboxChange}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default RolesEdit;
