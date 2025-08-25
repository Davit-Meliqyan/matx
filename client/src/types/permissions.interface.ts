export type PermissionItem = {
  id: string;
  code: string;
  name: string;
  group: string;
};

export const PERMISSIONS: PermissionItem[] = [
  { id: "1", code: "viewUsers", name: "View Users", group: "Users" },
  { id: "2", code: "editUsers", name: "Edit Users", group: "Users" },
  { id: "3", code: "createUsers", name: "Create Users", group: "Users" },
  { id: "4", code: "deleteUsers", name: "Delete Users", group: "Users" },

  { id: "5", code: "viewRoles", name: "View Roles", group: "Roles" },
  { id: "6", code: "editRoles", name: "Edit Roles", group: "Roles" },
  { id: "7", code: "createRoles", name: "Create Roles", group: "Roles" },
  { id: "8", code: "deleteRoles", name: "Delete Roles", group: "Roles" },

  { id: "9", code: "viewCompany", name: "View Company", group: "Company" },
  { id: "10", code: "editCompany", name: "Edit Company", group: "Company" },
  { id: "11", code: "createCompany", name: "Create Company", group: "Company" },
  { id: "12", code: "deleteCompany", name: "Delete Company", group: "Company" },
];
