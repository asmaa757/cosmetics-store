let MOCK_PRODUCTS = [
  {
    id: 1,
    name: "MAC Lipstick",
    sku: "SKU:LIP-001",
    sec: "SEC-A(S1)",
    price: "500EGP",
    stock: 45,
    category: "Makeup",
    img: "public/photo_2026-04-28_01-39-11.jpg",
  },
  {
    id: 2,
    name: "SHEGLAM Lip Gloss",
    sku: "SKU:LIP-202",
    sec: "SEC-B(S2)",
    price: "250EGP",
    stock: 20,
    category: "Makeup",
    img: "public/photo_2026-04-28_01-45-46.jpg",
  },
  {
    id: 3,
    name: "Eye Shadow Palette",
    sku: "SKU:EYE-042",
    sec: "SEC-A(S3)",
    price: "450EGP",
    stock: 15,
    category: "Makeup",
    img: "public/photo_2026-04-28_01-41-06.jpg",
  },
  {
    id: 4,
    name: "Colored Blusher",
    sku: "SKU:BLU-003",
    sec: "SEC-A(S3)",
    price: "70EGP",
    stock: 25,
    category: "Makeup",
    img: "public/photo_2026-04-28_01-47-43.jpg",
  },
  {
    id: 5,
    name: "Hydration Serum",
    sku: "SKU:SER-023",
    sec: "SEC-B(S4)",
    price: "300EGP",
    stock: 40,
    category: "Skincare",
    img: "public/photo_2026-04-28_01-43-35.jpg",
  },
  {
    id: 6,
    name: "GUCCI Lipstick",
    sku: "SKU:LIP-002",
    sec: "SEC-A(S1)",
    price: "450EGP",
    stock: 15,
    category: "Makeup",
    img: "public/photo_2026-04-28_01-49-30.jpg",
  },
  {
    id: 7,
    name: "LAURA GELLER Mascara",
    sku: "SKU:BLU-003",
    sec: "SEC-A(S2)",
    price: "389EGP",
    stock: 30,
    category: "Makeup",
    img: "public/photo_2026-04-28_01-42-00.jpg",
  },
  {
    id: 8,
    name: "Peripera Bluser",
    sku: "SKU:BLU-301",
    sec: "SEC-A(S3)",
    price: "470EGP",
    stock: 19,
    category: "Makeup",
    img: "public/photo_2026-04-28_01-51-44.jpg",
  },
    {
    id: 9,
    name: "Peripera Bluser",
    sku: "SKU:BLU-301",
    sec: "SEC-A(S3)",
    price: "470EGP",
    stock: 19,
    category: "Makeup",
    img: "public/photo_2026-04-28_01-47-43.jpg",
  },
    {
    id: 10,
    name: "Peripera Bluser",
    sku: "SKU:BLU-301",
    sec: "SEC-A(S3)",
    price: "470EGP",
    stock: 19,
    category: "Makeup",
    img: "public/photo_2026-04-28_01-51-44.jpg",
  },
];

let nextId = 9;

export const productsService = {
  // Get all products
  getAll: async () => {
    return [...MOCK_PRODUCTS];
  },

  // Get product by ID
  getById: async (id) => {
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    if (!product) throw new Error("Product not found");
    return { ...product };
  },

  // Create new product
  create: async (productData) => {
    const newProduct = {
      id: nextId++,
      name: productData.name,
      sku: productData.sku,
      sec: `SEC-${Math.floor(Math.random() * 4) + 1}`,
      price: productData.price,
      stock: parseInt(productData.stock) || 0,
      category: productData.category,
      img: productData.img || `https://placehold.co/300x220/fdf0f8/E91E8C?text=${encodeURIComponent(productData.name)}`,
    };
    MOCK_PRODUCTS.push(newProduct);
    return { ...newProduct };
  },

  // Update product
  update: async (id, productData) => {
    const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Product not found");
    MOCK_PRODUCTS[index] = { 
      ...MOCK_PRODUCTS[index], 
      ...productData, 
      stock: parseInt(productData.stock) || MOCK_PRODUCTS[index].stock 
    };
    return { ...MOCK_PRODUCTS[index] };
  },
};