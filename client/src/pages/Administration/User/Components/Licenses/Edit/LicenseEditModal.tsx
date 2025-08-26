import React, { useEffect, useState } from "react";
import { Modal, Form, Button, message, Skeleton } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import dayjs, { Dayjs } from "dayjs";

import LicenseFormFields from "./LicenseFormFields";
import LicenseFilesList from "./LicenseFilesList";
import LicenseFileUpload from "./LicenseFileUpload";
import { useLicenseStore } from "../../../../../../store/useLicensesFetchStore";
import { LicenseUser } from "../../../../../../types/dynamicTables";

interface LicensesEditModalProps {
  licenseId: string;
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface LicenseFormValues
  extends Omit<LicenseUser, "date" | "dateOfExpiry"> {
  date?: Dayjs;
  dateOfExpiry?: Dayjs;
}

const LicensesEditModal: React.FC<LicensesEditModalProps> = ({
  licenseId,
  userId,
  isOpen,
  onClose,
}) => {
  const fetchItemById = useLicenseStore((state) => state.fetchItemById);
  const uploadFile = useLicenseStore((state) => state.uploadFile);
  const removeFile = useLicenseStore((state) => state.removeFile);
  const updateItem = useLicenseStore((state) => state.updateItem);

  const [license, setLicense] = useState<LicenseUser | null>(null);
  const [form] = Form.useForm<LicenseFormValues>();
  const [uploadList, setUploadList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFetching(true);
      fetchItemById(`members/${userId}`, licenseId)
        .then((data) => {
          setLicense(data);
          form.setFieldsValue({
            ...data,
            date: data.date ? dayjs(data.date) : undefined,
            dateOfExpiry: data.dateOfExpiry
              ? dayjs(data.dateOfExpiry)
              : undefined,
          });
        })
        .catch((err: unknown) => {
          if (err instanceof Error) message.error(err.message);
          else message.error("Failed to fetch license");
        })
        .finally(() => setFetching(false));
    } else {
      setLicense(null);
      setUploadList([]);
      form.resetFields();
    }
  }, [isOpen, licenseId, userId, fetchItemById, form]);

  const handleRemoveFile = async (fileName: string) => {
    if (!license) return;
    try {
      await removeFile(`members/${userId}`, license.id, fileName);
      setLicense((prev) =>
        prev
          ? {
              ...prev,
              fileURLs: prev.fileURLs?.filter((f) => f !== fileName) ?? [],
            }
          : null
      );
      message.success("File removed successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) message.error(err.message);
      else message.error("Failed to remove file");
    }
  };

  const handleFinish = async (values: LicenseFormValues) => {
    if (!license) return;
    setLoading(true);
    try {
      const payload: LicenseUser = {
        ...license,
        ...values,
        date: values.date ? values.date.toISOString() : "",
        dateOfExpiry: values.dateOfExpiry
          ? values.dateOfExpiry.toISOString()
          : "",
        fileURLs: license.fileURLs ?? [],
      };

      await updateItem(`members/${userId}`, payload);

      if (uploadList.length) {
        await uploadFile(
          `members/${userId}`,
          license.id,
          uploadList.map((f) => f.originFileObj!)
        );
      }

      message.success("License updated successfully!");
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) message.error(err.message);
      else message.error("Failed to update license");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit License"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {fetching || !license ? (
        <div className="space-y-4">
          <Skeleton active paragraph={{ rows: 4 }} />
          <Skeleton active title={false} paragraph={{ rows: 2 }} />
          <Skeleton.Button active block />
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="space-y-6"
        >
          <LicenseFormFields />

          <LicenseFilesList
            files={license.fileURLs ?? []}
            onRemove={handleRemoveFile}
          />

          <LicenseFileUpload
            uploadList={uploadList}
            setUploadList={setUploadList}
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default LicensesEditModal;
