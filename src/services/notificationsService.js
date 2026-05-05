const STORAGE_KEY = "notifications";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "order",
    title: "New Order",
    description: "Order #ORD-2045 received - 245EGP",
    time: "5 mins ago",
    dotColor: "#3B82F6",
    bgColor: "#DBEAFE",
    link: "/orders/2045",
  },
  {
    id: 2,
    type: "stock",
    title: "Low Stock Alert",
    description: "Eye Shadow Palette is running low (4 units left)",
    time: "15 mins ago",
    dotColor: "#F97316",
    bgColor: "#FFEDD4",
    link: "/inventory",
  },
  {
    id: 3,
    type: "discount",
    title: "Discount Approved",
    description: "Your discount request for Hydration Serum was approved",
    time: "1 hour ago",
    dotColor: "#2AA973",
    bgColor: "#DBFCE7",
    link: "/approvals",
  },
  {
    id: 4,
    type: "order",
    title: "Order Completed",
    description: "Order #ORD-2042 delivered successfully",
    time: "Yesterday",
    dotColor: "#3B82F6",
    bgColor: "#DBEAFE",
    link: "/orders/2042",
  },
  {
    id: 5,
    type: "stock",
    title: "Stock Updated",
    description: "Hydration Serum restocked (50 units)",
    time: "Yesterday",
    dotColor: "#F97316",
    bgColor: "#FFEDD4",
    link: "/inventory",
  },
  {
    id: 6,
    type: "discount",
    title: "New Discount Request",
    description: "Customer requested 15% off on Matte Lipstick",
    time: "2 hours ago",
    dotColor: "#2AA973",
    bgColor: "#DBFCE7",
    link: "/approvals",
  },
];

// Helper: load from localStorage, seed with initial data if empty
const loadNotifications = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // First time: seed localStorage with initial data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
    return [...INITIAL_NOTIFICATIONS];
  } catch {
    return [...INITIAL_NOTIFICATIONS];
  }
};

// Helper: save to localStorage
const saveNotifications = (notifications) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
};

export const notificationsService = {
  getAllNotifications: async () => {
    return loadNotifications();
  },

  removeNotification: async (id) => {
    const notifications = loadNotifications();
    const updated = notifications.filter((n) => n.id !== id);
    saveNotifications(updated);
    return { success: true };
  },

  // Optional: add a new notification
  addNotification: async (notification) => {
    const notifications = loadNotifications();
    const newNotification = {
      ...notification,
      id: Date.now(), // unique id
    };
    const updated = [newNotification, ...notifications];
    saveNotifications(updated);
    return newNotification;
  },

  // Optional: reset to initial data (useful for testing)
  resetNotifications: async () => {
    saveNotifications(INITIAL_NOTIFICATIONS);
    return [...INITIAL_NOTIFICATIONS];
  },
};