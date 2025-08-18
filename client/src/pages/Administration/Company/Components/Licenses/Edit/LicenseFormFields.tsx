import React from "react";
import { Form, Input, DatePicker, Select } from "antd";

const LicenseFormFields: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Organization issued"
        name="organizationIssued"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Date" name="date" rules={[{ required: true }]}>
        <DatePicker className="w-full" />
      </Form.Item>
      <Form.Item
        label="Date of Expiry"
        name="dateOfExpiry"
        rules={[{ required: true }]}
      >
        <DatePicker className="w-full" />
      </Form.Item>
      <Form.Item
        label="Remind about Expiry date"
        name="expiryReminder"
        rules={[{ required: true, message: "Select reminder" }]}
      >
        <Select>
          <Select.Option value="ONE_MONTH">One month</Select.Option>
          <Select.Option value="TWO_MONTHS">Two months</Select.Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default LicenseFormFields;
