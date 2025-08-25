export type PermissionItem = {
  id: string;
  code: string;
  name: string;
  group: string;
  level: number; // добавляем уровень для иерархии
};

export const PERMISSIONS: PermissionItem[] = [
  { id: "1", code: "viewUsers", name: "View Users", group: "Users", level: 1 },
  { id: "2", code: "editUsers", name: "Edit Users", group: "Users", level: 2 },
  { id: "3", code: "createUsers", name: "Create Users", group: "Users", level: 3 },
  { id: "4", code: "deleteUsers", name: "Delete Users", group: "Users", level: 4 },

  { id: "5", code: "viewRoles", name: "View Roles", group: "Roles", level: 1 },
  { id: "6", code: "editRoles", name: "Edit Roles", group: "Roles", level: 2 },
  { id: "7", code: "createRoles", name: "Create Roles", group: "Roles", level: 3 },
  { id: "8", code: "deleteRoles", name: "Delete Roles", group: "Roles", level: 4 },

  { id: "9", code: "viewCompany", name: "View Company", group: "Company", level: 1 },
  { id: "10", code: "editCompany", name: "Edit Company", group: "Company", level: 2 },
  { id: "11", code: "createCompany", name: "Create Company", group: "Company", level: 3 },
  { id: "12", code: "deleteCompany", name: "Delete Company", group: "Company", level: 4 },
];
