export interface CustomUserCompany {
  id: string;
  userId: string;
  companyId: string;
  roleId: string;
  positionId: string;
  createdAt: string;
  updatedAt: string;

  Company: {
    id: string;
    name: string;
    legalAddress: string;
    factualAddress: string;
    email: string;
    phone: string;
    region: string;
    createdAt: string;
    updatedAt: string;
  };
}
