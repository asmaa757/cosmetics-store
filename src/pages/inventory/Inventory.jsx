import { useState } from "react";
import Toast from "../../components/Toast";
import { inventoryService } from "../../services/inventoryService";
import "./Inventory.css";

const StatusBadge = ({ status }) => {
  const getClass = () => {
    switch(status) {
      case "GOOD": return "inventory-status-good";
      case "LOW": return "inventory-status-low";
      case "CRITICAL": return "inventory-status-critical";
      default: return "";
    }
  };
  
  return (
    <span className={`inventory-status-badge ${getClass()}`}>
      {status}
    </span>
  );
};

const UpdateModal = ({ product, onClose, onSave }) => {
  const [stock, setStock] = useState(product.currentStock);
  const [minStock, setMinStock] = useState(product.minStock);

  const hasChanged =
    Number(stock) !== product.currentStock ||
    Number(minStock) !== product.minStock;

  const handleSave = () => {
    const newStatus =
      stock >= minStock ? "GOOD" : stock >= minStock * 0.6 ? "LOW" : "CRITICAL";
    onSave({ ...product, currentStock: Number(stock), minStock: Number(minStock), status: newStatus, lastRestocked: new Date().toISOString().split("T")[0] });
    onClose();
  };

  return (
    <div className="inventory-modal-overlay" onClick={onClose}>
      <div className="inventory-modal" style={{ width: "340px" }} onClick={e => e.stopPropagation()}>
        <h3 className="inventory-modal-title">Update Stock</h3>
        <p className="inventory-modal-subtitle">{product.name} — {product.sku}</p>

        <label className="inventory-modal-label">Current Stock</label>
        <input
          type="number"
          value={stock}
          onChange={e => setStock(e.target.value)}
          className="inventory-modal-input"
          style={{ marginBottom: "16px" }}
        />

        <label className="inventory-modal-label">Min Stock</label>
        <input
          type="number"
          value={minStock}
          onChange={e => setMinStock(e.target.value)}
          className="inventory-modal-input"
          style={{ marginBottom: "24px" }}
        />
        
        <div className="inventory-modal-actions">
          <button className="inventory-modal-cancel" onClick={onClose}>Cancel</button>
          <button 
            className="inventory-modal-save" 
            onClick={handleSave}
            disabled={!hasChanged}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const PurchaseRequestModal = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    productName: "Rose Gold Lipstick",
    sku: "LIP-001",
    quantity: "20 Units",
    currentStock: "10",
    category: "Makeup",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="inventory-modal-overlay" onClick={onClose}>
      <div className="inventory-modal" style={{ width: "420px" }} onClick={e => e.stopPropagation()}>
        <h3 className="inventory-modal-title" style={{ marginBottom: "20px" }}>Purchase Request</h3>

        <label className="inventory-modal-label">Product Name</label>
        <input
          className="inventory-modal-input"
          style={{ marginBottom: "16px" }}
          name="productName"
          value={form.productName}
          onChange={handleChange}
          placeholder="Enter product name"
        />

        <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
          <div style={{ flex: 1 }}>
            <label className="inventory-modal-label">SKU</label>
            <input
              className="inventory-modal-input"
              name="sku"value={form.sku}
              onChange={handleChange}
              placeholder="SKU"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label className="inventory-modal-label">Quantity</label>
            <input
              className="inventory-modal-input"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="e.g. 20 Units"
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          <div style={{ flex: 1 }}>
            <label className="inventory-modal-label">Current Stock</label>
            <input
              className="inventory-modal-input"
              name="currentStock"
              value={form.currentStock}
              onChange={handleChange}
              placeholder="0"
              type="number"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label className="inventory-modal-label">Category</label>
            <select
              className="inventory-modal-input"
              style={{ cursor: "pointer" }}
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {["Makeup", "Skincare", "Haircare"].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="inventory-modal-actions">
          <button className="inventory-modal-cancel" onClick={onClose}>Cancel</button>
          <button className="inventory-modal-save" onClick={handleSubmit}>Send to manager</button>
        </div>
      </div>
    </div>
  );
};

export default function InventoryDashboard() {
  const [products, setProducts] = useState(inventoryService.getInitialProducts());
  const [showAll, setShowAll] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [hoverRequest, setHoverRequest] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => setToast({ message, type });

  const totalProducts = 700;
  const lowStock = products.filter(p => p.status === "LOW").length;
  const criticalStock = products.filter(p => p.status === "CRITICAL").length;

  const displayed = showAll ? products : products.slice(0, 8);

  const handleSave = (updated) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    showToast("Stock updated successfully");
  };

  const handlePurchaseRequest = () => {
    showToast("Purchase request sent to manager");
  };

  return (
    <div className="inventory-container">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}

      {/* Stat Cards */}
      <div className="inventory-stats-container">
        <div className="inventory-stat-card inventory-stat-card-total">
          <div>
            <div className="inventory-stat-label inventory-stat-label-total">Total Products</div>
            <div className="inventory-stat-value">{totalProducts}</div>
          </div>
          <div className="inventory-stat-icon inventory-stat-icon-total">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="22.08" x2="12" y2="12" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div><div className="inventory-stat-card inventory-stat-card-low">
          <div>
            <div className="inventory-stat-label inventory-stat-label-low">Low Stock Alert</div>
            <div className="inventory-stat-value inventory-stat-value-low">{lowStock}</div>
          </div>
          <div className="inventory-stat-icon inventory-stat-icon-low">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="17 18 23 18 23 12" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="inventory-stat-card inventory-stat-card-critical">
          <div>
            <div className="inventory-stat-label inventory-stat-label-critical">Critical Stock</div>
            <div className="inventory-stat-value inventory-stat-value-critical">{criticalStock}</div>
          </div>
          <div className="inventory-stat-icon inventory-stat-icon-critical">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="#FF2056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="9" x2="12" y2="13" stroke="#FF2056" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="17" x2="12.01" y2="17" stroke="#FF2056" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Create Request Button */}
      <div className="inventory-request-btn-wrapper">
        <button
          onClick={() => setShowRequestModal(true)}
          onMouseEnter={() => setHoverRequest(true)}
          onMouseLeave={() => setHoverRequest(false)}
          className="inventory-request-btn"
          style={{ backgroundColor: hoverRequest ? "#fff1f4" : "#ffffff" }}
        >
          <span className="inventory-request-btn-plus">+</span>
          Create Purchase Request
        </button>
      </div>

      {/* Inventory Table */}
      <div className="inventory-table-wrapper">
        <div className="inventory-table-header">
          <h2 className="inventory-table-title">Inventory List</h2>
        </div>

        <table className="inventory-table">
          <thead>
            <tr>
              {["Product", "SKU", "Current Stock", "Min Stock", "Status", "Last Restocked", "Action"].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayed.map((product, i) => (
              <tr key={product.id} className="inventory-table-row">
                <td className="inventory-table-product">{product.name}</td>
                <td className="inventory-table-sku">{product.sku}</td>
                <td className="inventory-table-stock">{product.currentStock} units</td>
                <td className="inventory-table-min-stock">{product.minStock} units</td>
                <td><StatusBadge status={product.status} /></td>
                <td className="inventory-table-last">{product.lastRestocked}</td>
                <td>
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="inventory-update-btn"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!showAll && products.length > 8 && (
          <div className="inventory-see-more-wrapper">
            <button className="inventory-see-more-btn" onClick={() => setShowAll(true)}>See More...</button>
          </div>
        )}
        {showAll && (
          <div className="inventory-see-more-wrapper">
            <button className="inventory-see-more-btn" onClick={() => setShowAll(false)}>Show Less</button>
          </div>
        )}
      </div>

      {editingProduct && (
        <UpdateModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSave}
        />
      )}

      <PurchaseRequestModal
        open={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        onSubmit={handlePurchaseRequest}
      />
    </div>
  );
}