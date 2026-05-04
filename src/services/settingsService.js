import { storage } from "./storageHelper";

const SETTINGS_KEY = "riza_settings";

const DEFAULT_SETTINGS = {
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

if (!localStorage.getItem(SETTINGS_KEY)) {
  storage.set(SETTINGS_KEY, DEFAULT_SETTINGS);
}

export const settingsService = {
  getSettings: async () => {
    return storage.get(SETTINGS_KEY, DEFAULT_SETTINGS);
  },

  updateSettings: async (updatedSettings) => {
    const current = storage.get(SETTINGS_KEY, DEFAULT_SETTINGS);
    const merged = { ...current, ...updatedSettings };
    storage.set(SETTINGS_KEY, merged);
    return { success: true, data: merged };
  },
};