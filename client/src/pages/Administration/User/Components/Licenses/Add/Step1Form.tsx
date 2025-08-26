import React from "react";
import { Form, Input, DatePicker, Select, Button, InputNumber } from "antd";
import { Step1FormValues, Step1Data } from "./types";

interface Step1FormProps {
  initialValues?: Step1Data | null;
  onFinish: (values: Step1FormValues) => void;
}

const Step1Form: React.FC<Step1FormProps> = ({ initialValues, onFinish }) => {
  return (
    <Form<Step1FormValues>
      layout="vertical"
      initialValues={
        initialValues
          ? {
              ...initialValues,
              date: initialValues.date
                ? new Date(initialValues.date)
                : undefined,
              dateOfExpiry: initialValues.dateOfExpiry
                ? new Date(initialValues.dateOfExpiry)
                : undefined,
            }
          : undefined
      }
      onFinish={onFinish}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Enter name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Enter description" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Organization issued"
          name="organizationIssued"
          rules={[{ required: true, message: "Enter organization" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
        >
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

      <div className="flex items-center justify-between mt-4">
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </div>
    </Form>
  );
};

export default Step1Form;
