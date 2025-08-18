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
