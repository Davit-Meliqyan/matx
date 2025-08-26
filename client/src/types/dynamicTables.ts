export type LicenseCompany = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  organizationIssued: string;
  date: string | null;
  dateOfExpiry: string | null;
  expiryReminder?: string;
  active: boolean;
  fileURLs: string[];
};

export type LicenseUser = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  organizationIssued: string;
  date: string | null;
  dateOfExpiry: string | null;
  expiryReminder?: string;
  trainingDurationValue?: number;
  trainingDurationUnit?: string;
  active: boolean;
  fileURLs: string[];
};

