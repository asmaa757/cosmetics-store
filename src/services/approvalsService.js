import { storage } from "./storageHelper";

const PENDING_KEY  = "riza_pending_requests";
const ACTIVITY_KEY = "riza_activity_log";

const DEFAULT_PENDING = [
  {
    id: "discount-seed",
    type: "discount",
    productName: "Matte Lipstick - Shade Rose 03",
    requestedBy: "Youssef Khaled (cashier)",
    originalPrice: "240EGP",
    discountPercent: "15",
    finalPrice: "204EGP",
    reason: "Customer asked for discount / loyal customer",
    dateTime: "28 Apr 2026 - 02:15 PM",
  },
  {
    id: "purchase-seed",
    type: "purchase",
    productName: "Foundation Fit Me - Shade 220",
    requestedBy: "Ahmed Soliman (Employee)",
    currentStock: "3 items left",
    suggestedQuantity: "20 units",
    lastOrderDate: "10 Apr 2026",
    reason: "Out of Stock Soon",
    dateTime: "28 Apr 2026 - 07:15 PM",
  },
];

const DEFAULT_ACTIVITY = [
  { id: 1, type: "Discount Request", product: "Hydration Serum", by: "Youssef Khaled", status: "approved", date: "2026-04-22 04:45 PM" },
  { id: 2, type: "Discount Request", product: "Hydration Serum", by: "Youssef Khaled", status: "rejected", date: "2026-04-22 04:45 PM" },
];

if (!localStorage.getItem(PENDING_KEY))  storage.set(PENDING_KEY,  DEFAULT_PENDING);
if (!localStorage.getItem(ACTIVITY_KEY)) storage.set(ACTIVITY_KEY, DEFAULT_ACTIVITY);

const getPending  = () => storage.get(PENDING_KEY,  DEFAULT_PENDING);
const getActivity = () => storage.get(ACTIVITY_KEY, DEFAULT_ACTIVITY);
const savePending  = (d) => storage.set(PENDING_KEY,  d);
const saveActivity = (d) => storage.set(ACTIVITY_KEY, d);
const getNextId = (arr) => arr.length ? Math.max(...arr.map(a => a.id)) + 1 : 1;

export const approvalsService = {
  getPendingRequests: async () => getPending(),
  getActivity: async () => getActivity(),

  // ── من POS ──────────────────────────────────────────────
  addDiscountRequest: async ({ productName, originalPrice, discountPercent, finalPrice, reason, requestedBy }) => {
    const pending = getPending();
    pending.unshift({
      id: `discount-${Date.now()}`,
      type: "discount",
      productName, requestedBy, originalPrice, discountPercent, finalPrice, reason,
      dateTime: new Date().toLocaleString("en-EG"),
    });
    savePending(pending);
    return { success: true };
  },

  // ── من Inventory ─────────────────────────────────────────
  addPurchaseRequest: async ({ productName, sku, quantity, currentStock, category, requestedBy }) => {
    const pending = getPending();
    pending.unshift({
      id: `purchase-${Date.now()}`,
      type: "purchase",
      productName, requestedBy, sku, category,
      currentStock: `${currentStock} items left`,
      suggestedQuantity: quantity,
      lastOrderDate: new Date().toLocaleDateString("en-EG"),
      reason: "Purchase Request",
      dateTime: new Date().toLocaleString("en-EG"),
    });
    savePending(pending);
    return { success: true };
  },

  approveRequest: async (id, type) => {
    const pending  = getPending();
    const activity = getActivity();
    const index = pending.findIndex(r => r.id === id);
    if (index === -1) throw new Error("Request not found");
    const req = pending.splice(index, 1)[0];
    savePending(pending);
    activity.unshift({
      id: getNextId(activity),
      type: type === "discount" ? "Discount Request" : "Purchase Request",
      product: req.productName,
      by: req.requestedBy,
      status: "approved",
      date: new Date().toLocaleString("en-EG"),
    });
    saveActivity(activity);
    return { success: true };
  },

  rejectRequest: async (id, type) => {
    const pending  = getPending();
    const activity = getActivity();
    const index = pending.findIndex(r => r.id === id);
    if (index === -1) throw new Error("Request not found");
    const req = pending.splice(index, 1)[0];savePending(pending);
    activity.unshift({
      id: getNextId(activity),
      type: type === "discount" ? "Discount Request" : "Purchase Request",
      product: req.productName,
      by: req.requestedBy,
      status: "rejected",
      date: new Date().toLocaleString("en-EG"),
    });
    saveActivity(activity);
    return { success: true };
  },
};