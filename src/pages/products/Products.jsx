import { useState, useEffect } from "react";
import { productsService } from "../../services/productsService";
import Filter from "../../components/Filter";
import Toast from "../../components/Toast";
import "./Products.css";

const PINK = "#FF2056";
const PINK_LIGHT = "#FDF1F6";
const CATEGORIES = ["All Categories", "Makeup", "Skincare", "Haircare"];

function stockInfo(stock) {
  if (stock >= 30)
    return { label: `${stock} in stock`, bg: "#e8f7ee", color: "#27a55a" };
  if (stock >= 15)
    return { label: `${stock} in stock`, bg: "#fff4e5", color: "#e08a00" };
  return { label: `${stock} in stock`, bg: "#fdecea", color: "#FF2056" };
}

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
    <circle cx="10.5" cy="10.5" r="7.5" />
    <line x1="16" y1="16" x2="22" y2="22" />
  </svg>
);

const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconView = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEdit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

function ViewProductModal({ product, onClose }) {
  const { label, bg, color } = stockInfo(product.stock);
  
  return (
    <div className="products-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="products-modal">
        <div className="products-modal-header">
          <div className="products-modal-title">Product Details</div>
        </div>
        <div className="products-modal-image">
          <img src={product.img} alt={product.name} />
        </div>
        <div className="products-modal-grid">
          <div className="products-modal-field">
            <div className="products-modal-field-label">Product Name</div>
            <div className="products-modal-field-value">{product.name}</div>
          </div>
          <div className="products-modal-field">
            <div className="products-modal-field-label">SKU</div>
            <div className="products-modal-field-value">{product.sku}</div>
          </div>
          <div className="products-modal-field">
            <div className="products-modal-field-label">Category</div>
            <div className="products-modal-field-value">{product.category}</div>
          </div>
          <div className="products-modal-field">
            <div className="products-modal-field-label">Section</div>
            <div className="products-modal-field-value">{product.sec || "SEC-A"}</div>
          </div>
          <div className="products-modal-field">
            <div className="products-modal-field-label">Price</div>
            <div className="products-modal-field-value products-modal-price">{product.price}</div></div>
          <div className="products-modal-field">
            <div className="products-modal-field-label">Stock Status</div>
            <div><span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: bg, color: color }}>{label}</span></div>
          </div>
        </div>
        <button className="products-modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function AddProductModal({ onSave, onClose }) {
  const [form, setForm] = useState({ name: "", sku: "", price: "", stock: "", category: "Makeup", img: "" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  
  const isFormValid = form.name && form.sku;

  return (
    <div className="products-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="products-form-modal">
        <div className="products-form-header">
          <div className="products-form-title">Add New Product</div>
        </div>
        <div>
          <div className="products-form-group">
            <label className="products-form-label">Product Name</label>
            <input className="products-form-input" placeholder="e.g. MAC Lipstick" value={form.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div className="products-form-row">
            <div className="products-form-group">
              <label className="products-form-label">SKU</label>
              <input className="products-form-input" placeholder="SKU:LIP-001" value={form.sku} onChange={(e) => set("sku", e.target.value)} />
            </div>
            <div className="products-form-group">
              <label className="products-form-label">Price</label>
              <input className="products-form-input" placeholder="500EGP" value={form.price} onChange={(e) => set("price", e.target.value)} />
            </div>
          </div>
          <div className="products-form-row">
            <div className="products-form-group">
              <label className="products-form-label">Stock</label>
              <input className="products-form-input" type="number" placeholder="45" value={form.stock} onChange={(e) => set("stock", e.target.value)} />
            </div>
            <div className="products-form-group">
              <label className="products-form-label">Category</label>
              <select className="products-form-select" value={form.category} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.filter(c => c !== "All Categories").map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="products-form-group">
            <label className="products-form-label">Image URL</label>
            <input className="products-form-input" placeholder="https://placehold.co/300x220/..." value={form.img} onChange={(e) => set("img", e.target.value)} />
          </div>
        </div>
        <div className="products-form-actions">
          <button className="products-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="products-submit-btn" onClick={() => onSave(form)} disabled={!isFormValid}>Add Product</button>
        </div>
      </div>
    </div>
  );
}

function EditProductModal({ product, onSave, onClose }) {const [form, setForm] = useState({ 
    name: product.name, 
    sku: product.sku, 
    price: product.price, 
    stock: product.stock, 
    category: product.category, 
    img: product.img 
  });
  const [hasChanges, setHasChanges] = useState(false);
  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setHasChanges(true);
  };

  return (
    <div className="products-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="products-form-modal">
        <div className="products-form-header">
          <div className="products-form-title">Edit Product</div>
        </div>
        <div>
          <div className="products-form-group">
            <label className="products-form-label">Product Name</label>
            <input className="products-form-input" value={form.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div className="products-form-row">
            <div className="products-form-group">
              <label className="products-form-label">SKU</label>
              <input className="products-form-input" value={form.sku} onChange={(e) => set("sku", e.target.value)} />
            </div>
            <div className="products-form-group">
              <label className="products-form-label">Price</label>
              <input className="products-form-input" value={form.price} onChange={(e) => set("price", e.target.value)} />
            </div>
          </div>
          <div className="products-form-row">
            <div className="products-form-group">
              <label className="products-form-label">Stock</label>
              <input className="products-form-input" type="number" value={form.stock} onChange={(e) => set("stock", Number(e.target.value))} />
            </div>
            <div className="products-form-group">
              <label className="products-form-label">Category</label>
              <select className="products-form-select" value={form.category} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.filter(c => c !== "All Categories").map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="products-form-group">
            <label className="products-form-label">Image URL</label>
            <input className="products-form-input" value={form.img} onChange={(e) => set("img", e.target.value)} />
          </div>
        </div>
        <div className="products-form-actions">
          <button className="products-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="products-submit-btn" onClick={() => onSave(form)} disabled={!hasChanges}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onView, onEdit }) {
  const { label, bg, color } = stockInfo(product.stock);
  const [hovered, setHovered] = useState(false);
  
  return (
    <div className="product-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="product-card-image">
        <img src={product.img || "https://placehold.co/300x220/fdf0f8/E91E8C?text=Product"} alt={product.name} />
      </div>
      <div className="product-card-content">
        <div className="product-card-category">{product.category}</div>
        <div className="product-card-name">{product.name}</div><div className="product-card-sku">{product.sku}</div>
        <div className="product-card-section">{product.sec || "SEC-A"}</div>
        <div className="product-card-price-row">
          <span className="product-card-price">{product.price}</span>
          <span className="product-card-stock" style={{ background: bg, color: color }}>{label}</span>
        </div>
        <div className="product-card-buttons">
          <button className="product-card-view-btn" onClick={() => onView(product)}><IconView /> View</button>
          <button className="product-card-edit-btn" onClick={() => onEdit(product)}><IconEdit /> Edit</button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const loadProducts = async () => {
    try {
      const data = await productsService.getAll();
      setProducts(data);
    } catch (error) {
      showToast("Failed to load products", "error");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = selectedCategory === "All Categories" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddProduct = async (form) => {
    try {
      const newProduct = await productsService.create(form);
      setProducts([...products, newProduct]);
      setShowAdd(false);
      showToast("Product added successfully");
    } catch (error) {
      showToast("Failed to add product", "error");
    }
  };

  const handleEditProduct = async (form) => {
    try {
      const updated = await productsService.update(editingProduct.id, form);
      setProducts(products.map(p => p.id === editingProduct.id ? updated : p));
      setEditingProduct(null);
      showToast("Product updated successfully!", "success");
    } catch (error) {
      showToast("Failed to update product", "error");
    }
  };

  return (
    <div>
      {showAdd && <AddProductModal onSave={handleAddProduct} onClose={() => setShowAdd(false)} />}
      {viewingProduct && <ViewProductModal product={viewingProduct} onClose={() => setViewingProduct(null)} />}
      {editingProduct && <EditProductModal product={editingProduct} onSave={handleEditProduct} onClose={() => setEditingProduct(null)} />}
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}

      {/* Toolbar */}
      <div className="products-toolbar">
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
          {/* Search Box */}
          <div className={`products-search-wrapper ${searchFocused ? "focused" : ""}`}>
            <IconSearch />
            <input 
              className="products-search-input" 
              placeholder="Search products by name or SKU..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          {/* Category Filter */}
          <Filter
            value={selectedCategory}
            options={CATEGORIES}
            onChange={setSelectedCategory}
            align="left"
          />
        </div>{/* Add Product Button */}
        <button className="products-add-btn" onClick={() => setShowAdd(true)}>
          <IconPlus /> Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} onView={setViewingProduct} onEdit={setEditingProduct} />
        ))}
      </div>
    </div>
  );
}