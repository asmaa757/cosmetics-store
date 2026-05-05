import { storage } from "./storageHelper";

const PRODUCTS_KEY = "riza_products";

const DEFAULT_PRODUCTS = [
  // ── Makeup (5) ──────────────────────────────────────────────────────────────
  { id: 1,  name: "MAC Lipstick",         sku: "SKU:LIP-001", sec: "SEC-A(S1)", price: "500EGP",  stock: 45, category: "Makeup",   img: "/photo_2026-04-28_01-39-11.jpg" },
  { id: 2,  name: "SHEGLAM Lip Gloss",    sku: "SKU:LIP-202", sec: "SEC-B(S2)", price: "250EGP",  stock: 20, category: "Makeup",   img: "/photo_2026-04-28_01-45-46.jpg" },
  { id: 3,  name: "Eye Shadow Palette",   sku: "SKU:EYE-042", sec: "SEC-A(S3)", price: "450EGP",  stock: 15, category: "Makeup",   img: "/photo_2026-04-28_01-41-06.jpg" },
  { id: 4,  name: "Colored Blusher",      sku: "SKU:BLU-003", sec: "SEC-A(S3)", price: "70EGP",   stock: 25, category: "Makeup",   img: "/photo_2026-04-28_01-47-43.jpg" },
  { id: 5,  name: "GUCCI Lipstick",       sku: "SKU:LIP-002", sec: "SEC-A(S1)", price: "450EGP",  stock: 15, category: "Makeup",   img: "/photo_2026-04-28_01-49-30.jpg" },

  // ── Skincare (5) ────────────────────────────────────────────────────────────
  { id: 6,  name: "Hydration Serum",      sku: "SKU:SER-023", sec: "SEC-B(S4)", price: "300EGP",  stock: 40, category: "Skincare", img: "/photo_2026-05-05_17-38-16.jpg" },
  { id: 7,  name: "Vitamin C Moisturizer",sku: "SKU:MOI-011", sec: "SEC-B(S1)", price: "350EGP",  stock: 30, category: "Skincare", img: "/photo_2026-05-05_17-47-34.jpg" },
  { id: 8,  name: "Retinol Night Cream",  sku: "SKU:CRM-007", sec: "SEC-B(S2)", price: "420EGP",  stock: 18, category: "Skincare", img: "/photo_2026-05-05_18-11-45.jpg" },
  { id: 9,  name: "SPF 50 Sunscreen",     sku: "SKU:SUN-015", sec: "SEC-B(S3)", price: "180EGP",  stock: 55, category: "Skincare", img: "/photo_2026-05-05_18-15-38.jpg" },
  { id: 10, name: "Micellar Water",       sku: "SKU:CLN-009", sec: "SEC-B(S4)", price: "120EGP",  stock: 60, category: "Skincare", img: "/photo_2026-05-05_18-17-35.jpg" },

  // ── Haircare (5) ────────────────────────────────────────────────────────────
  { id: 11, name: "Argan Oil Shampoo",    sku: "SKU:SHA-031", sec: "SEC-C(S1)", price: "200EGP",  stock: 35, category: "Haircare", img: "/photo_2026-05-05_18-19-30.jpg" },
  { id: 12, name: "Deep Repair Mask",     sku: "SKU:MSK-014", sec: "SEC-C(S2)", price: "275EGP",  stock: 22, category: "Haircare", img: "/photo_2026-05-05_18-21-06.jpg" },
  { id: 13, name: "Leave-In Conditioner", sku: "SKU:CON-008", sec: "SEC-C(S3)", price: "160EGP",  stock: 28, category: "Haircare", img: "/photo_2026-05-05_18-22-32.jpg" },
  { id: 14, name: "Hair Growth Serum",    sku: "SKU:SER-044", sec: "SEC-C(S4)", price: "320EGP",  stock: 12, category: "Haircare", img: "/photo_2026-05-05_18-24-37.jpg" },
  { id: 15, name: "Keratin Heat Spray",   sku: "SKU:SPR-022", sec: "SEC-C(S5)", price: "190EGP",  stock: 40, category: "Haircare", img: "/photo_2026-05-05_18-26-42.jpg" },
];

const PRODUCTS_VERSION = 2; // زوّد الرقم كل ما تغير DEFAULT_PRODUCTS
const PRODUCTS_VERSION_KEY = "riza_products_version";

const storedVersion = parseInt(localStorage.getItem(PRODUCTS_VERSION_KEY));

if (!localStorage.getItem(PRODUCTS_KEY) || storedVersion !== PRODUCTS_VERSION) {
  storage.set(PRODUCTS_KEY, DEFAULT_PRODUCTS);
  localStorage.setItem(PRODUCTS_VERSION_KEY, PRODUCTS_VERSION);
}

const getProducts = () => storage.get(PRODUCTS_KEY, DEFAULT_PRODUCTS);
const saveProducts = (p) => storage.set(PRODUCTS_KEY, p);
const getNextId = (products) => products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;

export const productsService = {
  getAll: async () => getProducts(),

  getById: async (id) => {
    const product = getProducts().find(p => p.id === id);
    if (!product) throw new Error("Product not found");
    return { ...product };
  },

  create: async (productData) => {
    const products = getProducts();
    const newProduct = {
      id: getNextId(products),
      name: productData.name,
      sku: productData.sku,
      sec: `SEC-${Math.floor(Math.random() * 4) + 1}`,
      price: productData.price,
      stock: parseInt(productData.stock) || 0,
      category: productData.category,
      img: productData.img || `https://placehold.co/300x220/fdf0f8/E91E8C?text=${encodeURIComponent(productData.name)}`,
    };
    products.push(newProduct);
    saveProducts(products);
    return { ...newProduct };
  },

  update: async (id, productData) => {
    const products = getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Product not found");
    products[index] = {
      ...products[index],
      ...productData,
      stock: parseInt(productData.stock) || products[index].stock,
    };
    saveProducts(products);
    return { ...products[index] };
  },
};