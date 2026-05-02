let MOCK_NOTIFICATIONS = [
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

export const notificationsService = {
  getAllNotifications: async () => {
    return [...MOCK_NOTIFICATIONS];
  },

  removeNotification: async (id) => {
    const index = MOCK_NOTIFICATIONS.findIndex(n => n.id === id);
    if (index !== -1) {
      MOCK_NOTIFICATIONS.splice(index, 1);
    }
    return { success: true };
  },
};