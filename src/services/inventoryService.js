import { storage } from "./storageHelper";

const INVENTORY_KEY = "riza_inventory";

const DEFAULT_PRODUCTS = [
  { id: 1, name: "Rose Gold Lipstick",   sku: "LIP-001", currentStock: 45, minStock: 20, status: "GOOD",     lastRestocked: "2026-04-20" },
  { id: 2, name: "Hydration Serum",      sku: "SER-023", currentStock:  8, minStock: 15, status: "LOW",      lastRestocked: "2026-04-18" },
  { id: 3, name: "Matte Foundation",     sku: "FND-105", currentStock: 12, minStock: 20, status: "LOW",      lastRestocked: "2026-04-22" },
  { id: 4, name: "Eye Shadow Palette",   sku: "EYE-042", currentStock:  3, minStock: 10, status: "CRITICAL", lastRestocked: "2026-04-15" },
  { id: 5, name: "Moisturizing Cream",   sku: "CRM-089", currentStock: 56, minStock: 25, status: "GOOD",     lastRestocked: "2026-04-21" },
  { id: 6, name: "Face Mask Set",        sku: "MSK-014", currentStock: 41, minStock: 30, status: "GOOD",     lastRestocked: "2026-04-19" },
  { id: 7, name: "Anti-Aging Serum",     sku: "SER-156", currentStock: 22, minStock: 20, status: "GOOD",     lastRestocked: "2026-04-23" },
  { id: 8, name: "Lip Gloss Collection", sku: "LIP-202", currentStock:  7, minStock: 15, status: "CRITICAL", lastRestocked: "2026-04-16" },
];

if (!localStorage.getItem(INVENTORY_KEY)) {
  storage.set(INVENTORY_KEY, DEFAULT_PRODUCTS);
}

const getProducts = () => storage.get(INVENTORY_KEY, DEFAULT_PRODUCTS);
const saveProducts = (p) => storage.set(INVENTORY_KEY, p);

export const inventoryService = {
  getInitialProducts: () => getProducts(),

  updateProduct: (updatedProduct) => {
    const products = getProducts();
    const index = products.findIndex((p) => p.id === updatedProduct.id);
    if (index === -1) throw new Error("Product not found");
    products[index] = { ...products[index], ...updatedProduct };
    saveProducts(products);
    return products[index];
  },
};