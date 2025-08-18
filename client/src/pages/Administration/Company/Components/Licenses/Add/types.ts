import type { UploadFile } from "antd/es/upload/interface";

export interface Step1FormValues {
  name: string;
  email: string;
  description: string;
  organizationIssued: string;
  date?: Date;
  dateOfExpiry?: Date;
  expiryReminder: string;
  active: boolean;
}

export interface Step1Data {
  name: string;
  email: string;
  description: string;
  organizationIssued: string;
  date: string;
  dateOfExpiry: string;
  expiryReminder: string;
  active: boolean;
}

export interface Step2Data {
  fileURLs: UploadFile[];
}
