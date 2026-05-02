let MOCK_USERS = [
  { id: 1, name: "Ahmed Ali", handle: "ahmed23//", role: "Admin", status: "Active", lastLogin: "2026-04-25", password: "admin123" },
  { id: 2, name: "Emad Yehia", handle: "emadf57$", role: "Cashier", status: "Inactive", lastLogin: "2026-04-24", password: "cash456" },
  { id: 3, name: "Ali Nabil", handle: "ali567&", role: "Employee", status: "Inactive", lastLogin: "2026-04-24", password: "emp789" },
  { id: 4, name: "Aya Adham", handle: "aya4320/", role: "Employee", status: "Active", lastLogin: "2026-04-25", password: "aya321" },
  { id: 5, name: "Reda Yasser", handle: "reda2720/", role: "Manager", status: "Active", lastLogin: "2026-04-25", password: "mgr654" },
];

let nextId = 6;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, 500));

export const usersService = {
  getAll: async () => {
    return [...MOCK_USERS];
  },

  getById: async (id) => {
    const user = MOCK_USERS.find(u => u.id === id);
    if (!user) throw new Error("User not found");
    return { ...user };
  },

  create: async (userData) => {
    const newUser = {
      id: nextId++,
      ...userData,
      lastLogin: new Date().toISOString().split("T")[0],
    };
    MOCK_USERS.push(newUser);
    return { ...newUser };
  },

  update: async (id, userData) => {
    const index = MOCK_USERS.findIndex(u => u.id === id);
    if (index === -1) throw new Error("User not found");
    MOCK_USERS[index] = { ...MOCK_USERS[index], ...userData };
    return { ...MOCK_USERS[index] };
  },

  delete: async (id) => {
    const index = MOCK_USERS.findIndex(u => u.id === id);
    if (index === -1) throw new Error("User not found");
    MOCK_USERS.splice(index, 1);
    return { success: true };
  },
};