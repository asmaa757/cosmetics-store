let MOCK_RETURNS = [];

export const returnsService = {
  getAllReturns: async () => {
    return [...MOCK_RETURNS];
  },

  getReturnById: async (id) => {
    const returnItem = MOCK_RETURNS.find(r => r.id === id);
    if (!returnItem) throw new Error("Return not found");
    return { ...returnItem };
  },

  createReturn: async (returnData) => {
    const newReturn = {
      id: Date.now(),
      ...returnData,
      createdAt: new Date().toISOString(),
    };
    MOCK_RETURNS.push(newReturn);
    return { success: true, data: { ...newReturn } };
  },

  updateReturn: async (id, updateData) => {
    const index = MOCK_RETURNS.findIndex(r => r.id === id);
    if (index === -1) throw new Error("Return not found");
    MOCK_RETURNS[index] = { ...MOCK_RETURNS[index], ...updateData };
    return { success: true, data: { ...MOCK_RETURNS[index] } };
  },

  deleteReturn: async (id) => {
    const index = MOCK_RETURNS.findIndex(r => r.id === id);
    if (index === -1) throw new Error("Return not found");
    MOCK_RETURNS.splice(index, 1);
    return { success: true };
  },
};