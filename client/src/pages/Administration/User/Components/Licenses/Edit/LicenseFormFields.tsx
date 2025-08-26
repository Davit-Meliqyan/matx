import React from "react";
import { Form, Input, DatePicker, Select, InputNumber } from "antd";

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

      <Form.Item label="Date" name="date" >
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item
        label="Date of Expiry"
        name="dateOfExpiry"
      >
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item
        label="Training Duration Value"
        name="trainingDurationValue"
        rules={[{ required: true, message: "Enter organization" }]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Training Duration Unit"
        name="trainingDurationUnit"
        rules={[{ required: true, message: "Select reminder" }]}
      >
        <Select>
          <Select.Option value="HOURS">Hours</Select.Option>
          <Select.Option value="DAYS">Days</Select.Option>
          <Select.Option value="MONTHS">Months</Select.Option>
        </Select>
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
