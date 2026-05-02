const mockData = {
  "Today": {
    sales: [
      { month: "00", value: 1200 },
      { month: "04", value: 2500 },
      { month: "08", value: 3800 },
      { month: "12", value: 5200 },
      { month: "16", value: 6800 },
      { month: "20", value: 4500 },
    ],
    revenue: [
      { month: "00", value: 1500 },
      { month: "04", value: 2800 },
      { month: "08", value: 4200 },
      { month: "12", value: 5800 },
      { month: "16", value: 7200 },
      { month: "20", value: 4900 },
    ],
    stats: {
      totalRevenue: "8,450 EGP",
      orders: "24 Orders",
      lowStock: "12",
      productsSold: "86 Items",
    },
  },
  "This Week": {
    sales: [
      { month: "Mon", value: 32000 },
      { month: "Tue", value: 28000 },
      { month: "Wed", value: 35000 },
      { month: "Thu", value: 42000 },
      { month: "Fri", value: 38000 },
      { month: "Sat", value: 29000 },
    ],
    revenue: [
      { month: "Mon", value: 35000 },
      { month: "Tue", value: 30000 },
      { month: "Wed", value: 38000 },
      { month: "Thu", value: 45000 },
      { month: "Fri", value: 41000 },
      { month: "Sat", value: 32000 },
    ],
    stats: {
      totalRevenue: "27,450 EGP",
      orders: "128 Orders",
      lowStock: "7",
      productsSold: "342 Items",
    },
  },
  "This Month": {
    sales: [
      { month: "Week 1", value: 45000 },
      { month: "Week 2", value: 52000 },
      { month: "Week 3", value: 48000 },
      { month: "Week 4", value: 55000 },
    ],
    revenue: [
      { month: "Week 1", value: 47000 },
      { month: "Week 2", value: 62000 },
      { month: "Week 3", value: 55000 },
      { month: "Week 4", value: 65000 },
    ],
    stats: {
      totalRevenue: "98,200 EGP",
      orders: "520 Orders",
      lowStock: "7",
      productsSold: "1,280 Items",
    },
  },
  "This Year": {
    sales: [
      { month: "Jan", value: 45000 },
      { month: "Feb", value: 52000 },
      { month: "Mar", value: 48000 },
      { month: "Apr", value: 55000 },
      { month: "May", value: 60000 },
      { month: "Jun", value: 68000 },
      { month: "Jul", value: 75000 },
      { month: "Aug", value: 72000 },
      { month: "Sep", value: 80000 },
      { month: "Oct", value: 78000 },
      { month: "Nov", value: 85000 },
      { month: "Dec", value: 90000 },
    ],
    revenue: [
      { month: "Jan", value: 47000 },
      { month: "Feb", value: 62000 },
      { month: "Mar", value: 55000 },
      { month: "Apr", value: 65000 },
      { month: "May", value: 60000 },
      { month: "Jun", value: 74000 },
      { month: "Jul", value: 82000 },
      { month: "Aug", value: 79000 },
      { month: "Sep", value: 88000 },
      { month: "Oct", value: 85000 },
      { month: "Nov", value: 92000 },
      { month: "Dec", value: 98000 },
    ],
    stats: {
      totalRevenue: "890,000 EGP",
      orders: "4,850 Orders",
      lowStock: "7",
      productsSold: "12,450 Items",
    },
  },
};

const recentOrders = [
  { id: "#ORD-2045", product: "Hydration Serum", amount: "500EGP", time: "2 mins ago" },
  { id: "#ORD-1043", product: "Hydration Serum\nMatte Lipstick  x2", amount: "750EGP", time: "5 mins ago" },
  { id: "#ORD-2075", product: "Rose Gold Lipstick", amount: "189EGP", time: "5 mins ago" },
  { id: "#ORD-1050", product: "3D Mascara", amount: "279EGP", time: "10 mins ago" },
];

const lowStockAlerts = [
  { name: "Rose Gold Lipstick", sku: "SKU: LIP-001", left: 5 },
  { name: "Hydrating Serum", sku: "SKU: SER-023", left: 7 },
  { name: "Matte Foundation", sku: "SKU: FND-105", left: 3 },
  { name: "Eye Shadow Palette", sku: "SKU: EYE-042", left: 4 },
];

export const timePeriods = ["Today", "This Week", "This Month", "This Year"];

export const dashboardService = {
  getDashboardData: async (period) => {
    return mockData[period] || mockData["This Week"];
  },
  getRecentOrders: async () => {
    return [...recentOrders];
  },
  getLowStockAlerts: async () => {
    return [...lowStockAlerts];
  },
};