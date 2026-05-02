let MOCK_SETTINGS = {
  storeName: "Riza Store",
  storeId: "RS-2026-001",
  address: "Tanta, Saeed Street",
  phone: "+1(555) 123-4567",
  email: "info@rizastore.com",
  lowStockAlerts: true,
  newOrdersAlerts: true,
  discountRequestsAlerts: true,
  purchaseRequestsAlerts: true,
  taxRate: "10",
  currency: "EGP",
};

export const settingsService = {
  getSettings: async () => {
    return { ...MOCK_SETTINGS };
  },

  updateSettings: async (updatedSettings) => {
    MOCK_SETTINGS = { ...MOCK_SETTINGS, ...updatedSettings };
    return { success: true, data: { ...MOCK_SETTINGS } };
  },
};