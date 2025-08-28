import { memo, useEffect, useState } from "react";
import { Modal, message, Spin } from "antd";
import { useLicenseStore } from "../../../../../store/useLicensesFetchStore";
import LicensesTable from "./Table/LicensesTable";
import LicensesAddModal from "./Add/LicensesAddModal";
import LicensesEditModal from "./Edit/LicenseEditModal";

type UserLicensesProps = {
  id: string;
};

const UserLicenses = ({ id }: UserLicensesProps) => {
  const items = useLicenseStore((state) => state.items);
  const fetchItems = useLicenseStore((state) => state.fetchItems);
  const deleteItem = useLicenseStore((state) => state.deleteItem);

  const [editLicenseId, setEditLicenseId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchItems(`members/${id}`);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, fetchItems]);

  const handleEdit = (id: string) => {
    setEditLicenseId(id);
    setIsEditModalOpen(true);
  };

  const handleDelete = (licenseId: string, name: string) => {
    Modal.confirm({
      title: `Are you sure you want to delete this ${name}?`,
      content:
        "Deleted data is safely stored in the trash. You can restore it anytime.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        return deleteItem(`members/${id}`, licenseId).then(() => {
          message.success("Deleted successfully");
        });
      },
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-start gap-5 h-[50px]">
        <h3 className="text-2xl font-semibold">
          Licenses
        </h3>
        <LicensesAddModal userId={id} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-280px)]">
          <Spin size="large" />
        </div>
      ) : items[`members/${id}`]?.length > 0 ? (
        <LicensesTable
          licenses={items[`members/${id}`]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="text-center py-8 text-gray-500">No licenses found</div>
      )}

      {editLicenseId && (
        <LicensesEditModal
          licenseId={editLicenseId}
          userId={id}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default memo(UserLicenses);
