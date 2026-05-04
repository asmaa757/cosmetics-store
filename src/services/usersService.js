import { storage } from "./storageHelper";

const USERS_KEY = "riza_users";

const DEFAULT_USERS = [
  { id: 1, name: "Ahmed Ali",   handle: "ahmed23//",  password: "admin123", role: "admin",    status: "Active",   lastLogin: "2026-04-25", dashboard: "/dashboard", permissions: ["all"] },
  { id: 2, name: "Emad Yehia",  handle: "emadf57$",   password: "cash456",  role: "cashier",  status: "Inactive", lastLogin: "2026-04-24", dashboard: "/dashboard", permissions: ["process_sales", "process_returns"] },
  { id: 3, name: "Ali Nabil",   handle: "ali567&",    password: "emp789",   role: "employee", status: "Inactive", lastLogin: "2026-04-24", dashboard: "/dashboard", permissions: ["search_products", "add_products", "stock_requests"] },
  { id: 4, name: "Aya Adham",   handle: "aya4320/",   password: "aya321",   role: "employee", status: "Active",   lastLogin: "2026-04-25", dashboard: "/dashboard", permissions: ["search_products", "add_products", "stock_requests"] },
  { id: 5, name: "Reda Yasser", handle: "reda2720/",  password: "mgr654",   role: "manager",  status: "Active",   lastLogin: "2026-04-25", dashboard: "/dashboard", permissions: ["manage_prices", "view_reports", "approve_returns"] },
];

if (!localStorage.getItem(USERS_KEY)) {
  storage.set(USERS_KEY, DEFAULT_USERS);
}

const getUsers = () => storage.get(USERS_KEY, DEFAULT_USERS);
const saveUsers = (users) => storage.set(USERS_KEY, users);
const getNextId = (users) => (users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1);

export const usersService = {
  getAll: async () => getUsers(),

  getById: async (id) => {
    const user = getUsers().find((u) => u.id === id);
    if (!user) throw new Error("User not found");
    return { ...user };
  },

create: async (userData) => {
    const users = getUsers();
    const roleLC = userData.role.toLowerCase();
    const permissionsMap = {
      admin:    ["all"],
      manager:  ["manage_prices", "view_reports", "approve_returns"],
      cashier:  ["process_sales", "process_returns"],
      employee: ["search_products", "add_products", "stock_requests"],
    };
    const newUser = {
      ...userData,
      id: getNextId(users),
      lastLogin: new Date().toISOString().split("T")[0],
      role: roleLC,
      dashboard: "/dashboard",
      permissions: permissionsMap[roleLC] || [],
    };
    users.push(newUser);
    saveUsers(users);
    return { ...newUser };
  },

update: async (id, userData) => {
    const users = getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error("User not found");
    const roleLC = userData.role ? userData.role.toLowerCase() : users[index].role;
    const permissionsMap = {
      admin:    ["all"],
      manager:  ["manage_prices", "view_reports", "approve_returns"],
      cashier:  ["process_sales", "process_returns"],
      employee: ["search_products", "add_products", "stock_requests"],
    };
    users[index] = { 
      ...users[index], 
      ...userData,
      role: roleLC,
      permissions: permissionsMap[roleLC] || users[index].permissions,
    };
    saveUsers(users);
    return { ...users[index] };
  },

  delete: async (id) => {
    const users = getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error("User not found");
    users.splice(index, 1);
    saveUsers(users);
    return { success: true };
  },
};