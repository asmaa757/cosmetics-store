let MOCK_PENDING = [
  {
    id: "discount",
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
    id: "purchase",
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

let MOCK_ACTIVITY = [
  { id: 1, type: "Discount Request", product: "Hydration Serum", by: "Youssef Khaled", status: "approved", date: "2026-04-22  04:45 PM" },
  { id: 2, type: "Discount Request", product: "Hydration Serum", by: "Youssef Khaled", status: "rejected", date: "2026-04-22  04:45 PM" },
];

let nextActivityId = 3;

export const approvalsService = {
  getPendingRequests: async () => {
    return [...MOCK_PENDING];
  },

  getActivity: async () => {
    return [...MOCK_ACTIVITY];
  },

  approveRequest: async (id, type) => {
    const index = MOCK_PENDING.findIndex(r => r.id === id);
    if (index === -1) throw new Error("Request not found");
    const approvedRequest = MOCK_PENDING[index];
    MOCK_PENDING.splice(index, 1);
    
    MOCK_ACTIVITY.unshift({
      id: nextActivityId++,
      type: type === "discount" ? "Discount Request" : "Purchase Request",
      product: approvedRequest.productName || approvedRequest.productName,
      by: approvedRequest.requestedBy,
      status: "approved",
      date: new Date().toLocaleString(),
    });
    
    return { success: true };
  },

  rejectRequest: async (id, type) => {
    const index = MOCK_PENDING.findIndex(r => r.id === id);
    if (index === -1) throw new Error("Request not found");
    const rejectedRequest = MOCK_PENDING[index];
    MOCK_PENDING.splice(index, 1);
    
    MOCK_ACTIVITY.unshift({
      id: nextActivityId++,
      type: type === "discount" ? "Discount Request" : "Purchase Request",
      product: rejectedRequest.productName || rejectedRequest.productName,
      by: rejectedRequest.requestedBy,
      status: "rejected",
      date: new Date().toLocaleString(),
    });
    
    return { success: true };
  },
};