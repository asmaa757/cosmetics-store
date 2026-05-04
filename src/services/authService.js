import { storage } from "./storageHelper";

const USERS_KEY = "riza_users";

const DEFAULT_USERS = [
  { id: 1, name: "Ahmed Ali",   handle: "ahmed23//",  password: "admin123", role: "admin",    dashboard: "/dashboard", permissions: ["all"],                                                         status: "Active",   lastLogin: "2026-04-25" },
  { id: 2, name: "Emad Yehia",  handle: "emadf57$",   password: "cash456",  role: "cashier",  dashboard: "/dashboard", permissions: ["process_sales", "process_returns"],                            status: "Inactive", lastLogin: "2026-04-24" },
  { id: 3, name: "Ali Nabil",   handle: "ali567&",    password: "emp789",   role: "employee", dashboard: "/dashboard", permissions: ["search_products", "add_products", "stock_requests"],           status: "Inactive", lastLogin: "2026-04-24" },
  { id: 4, name: "Aya Adham",   handle: "aya4320/",   password: "aya321",   role: "employee", dashboard: "/dashboard", permissions: ["search_products", "add_products", "stock_requests"],           status: "Active",   lastLogin: "2026-04-25" },
  { id: 5, name: "Reda Yasser", handle: "reda2720/",  password: "mgr654",   role: "manager",  dashboard: "/dashboard", permissions: ["manage_prices", "view_reports", "approve_returns"],            status: "Active",   lastLogin: "2026-04-25" },
];

if (!localStorage.getItem(USERS_KEY)) {
  storage.set(USERS_KEY, DEFAULT_USERS);
}

const getUsers = () => storage.get(USERS_KEY, DEFAULT_USERS);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (username, password) => {
    await delay(800);

    const users = getUsers();
    const user = users.find(
      (u) => u.handle.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (user) {
      localStorage.setItem("auth_token", "mock_jwt_token_" + user.role);
      localStorage.setItem("user", JSON.stringify({ ...user, role: user.role.toLowerCase() }));
      return { success: true, user, message: `Welcome ${user.name}` };
    } else {
      throw { success: false, message: "Invalid username or password" };
    }
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    return { success: true, message: "Logged out successfully" };
  },

  checkAuth: () => {
    const token = localStorage.getItem("auth_token");
    const user = localStorage.getItem("user");
    if (token && user) {
      return { isAuthenticated: true, user: JSON.parse(user) };
    }
    return { isAuthenticated: false, user: null };
  },
};