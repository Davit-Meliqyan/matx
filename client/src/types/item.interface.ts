export interface Company {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  shortName: string;
  email: string;
  phoneNumber: string;
  address: string;
  website: string;
  logoURL?: string;
}

export interface Item {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  shortName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  website?: string;
  logoURL?: string;
}
