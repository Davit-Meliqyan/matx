export interface user {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
  isVerified?: boolean;
  avatar?: string;
  isSuperAdmin?: boolean;
}

export interface UserFormData {
  name: string;
  surname: string;
  positionName: string;
  email: string;
  phoneNumber: string;
  roleIds: string[];
}
