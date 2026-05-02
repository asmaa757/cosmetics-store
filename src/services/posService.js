const MOCK_PRODUCTS = [
  { id: 1, name: "Hydration Serum", price: 49.99, sku: "SKN-001" },
  { id: 2, name: "Matte Lipstick", price: 24.99, sku: "MKP-045" },
  { id: 3, name: "Anti-Aging Cream", price: 79.99, sku: "SKN-012" },
  { id: 4, name: "Volume Mascara", price: 29.99, sku: "MKP-078" },
  { id: 5, name: "Hair Conditioner", price: 18.99, sku: "HAR-023" },
  { id: 6, name: "Rose Perfume", price: 89.99, sku: "FRG-005" },
];

export const posService = {
  getProducts: () => {
    return [...MOCK_PRODUCTS];
  },
};