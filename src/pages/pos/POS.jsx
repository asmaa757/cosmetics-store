import { useState } from "react";
import Toast from "../../components/Toast";
import { posService } from "../../services/posService";
import "./POS.css";

function DiscountRequestModal({ onClose, onSubmit, total }) {
  const [form, setForm] = useState({
    reason: "",
    discountType: "percentage",
    discountValue: "",
    notes: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <div className="pos-modal-overlay" onClick={onClose}>
      <div className="pos-modal" onClick={e => e.stopPropagation()}>
        <h3 className="pos-modal-title">Request Discount</h3>
        <p className="pos-modal-subtitle">
          Current Total: <strong style={{ color: "#FF2056" }}>${total.toFixed(2)}</strong>
        </p>

        <label className="pos-modal-label">Discount Type</label>
        <select
          name="discountType"
          value={form.discountType}
          onChange={handleChange}
          className="pos-modal-input"
          style={{ marginBottom: "14px" }}
        >
          <option value="percentage">Percentage (%)</option>
          <option value="fixed">Fixed Amount ($)</option>
        </select>

        <label className="pos-modal-label">Discount Value</label>
        <input
          name="discountValue"
          type="number"
          value={form.discountValue}
          onChange={handleChange}
          placeholder={form.discountType === "percentage" ? "e.g. 10" : "e.g. 20"}
          className="pos-modal-input"
          style={{ marginBottom: "14px" }}
        />

        <label className="pos-modal-label">Reason</label>
        <input
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="e.g. Loyal customer"
          className="pos-modal-input"
          style={{ marginBottom: "14px" }}
        />

        <label className="pos-modal-label">Additional Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Any extra details..."
          rows={3}
          className="pos-modal-textarea"
        />

        <div className="pos-modal-actions">
          <button className="pos-modal-cancel" onClick={onClose}>Cancel</button>
          <button
            className="pos-modal-submit"
            onClick={handleSubmit}
            disabled={!form.discountValue || !form.reason}
          >
            Send to Manager
          </button>
        </div>
      </div>
    </div>
  );
}

export default function POSSystem() {
  const [scanInput, setScanInput] = useState("");
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [showDiscount, setShowDiscount] = useState(false);

  const showToastMsg = (message, type = "success") => setToast({ message, type });

  const products = posService.getProducts();

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleProductClick = (product) => addToCart(product);

  const handleAdd = () => {
    if (!scanInput.trim()) {
      showToastMsg("Please fill in the field first", "warning");
      return;
    }
    const found = products.find(
      (p) =>
        p.sku.toLowerCase() === scanInput.toLowerCase() ||
        p.name.toLowerCase() === scanInput.toLowerCase()
    );
    if (found) {
      addToCart(found);
      setScanInput("");
    } else {
      showToastMsg("Product not found", "error");
      setScanInput("");
    }
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    showToastMsg(`Checkout successful! Total: $${total.toFixed(2)}`);
    setCart([]);
  };

  const handleDiscountSubmit = (form) => {
    showToastMsg("Discount request sent to manager");
    setShowDiscount(false);
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}

      {showDiscount && (
        <DiscountRequestModal
          total={total}
          onClose={() => setShowDiscount(false)}
          onSubmit={handleDiscountSubmit}
        />
      )}

      <div className="pos-page">
        {/* Left Section */}
        <div className="pos-left">
          <div className="pos-card">
            <div className="pos-scan-row">
              <div className="pos-scan-wrapper">
                <div className="pos-scan-icon">⛶</div>
                <input
                  className="pos-scan-input"
                  placeholder="Scan barcode or enter SKU..."
                  value={scanInput}
                  onChange={(e) => setScanInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                />
              </div>
              <button className="pos-add-btn" onClick={handleAdd}>Add</button>
            </div>
          </div>

          <div className="pos-card">
            <h2 className="pos-section-title">Quick Add</h2>
            <div className="pos-products-grid">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="pos-product-card"
                  onClick={() => handleProductClick(product)}
                >
                  <p className="pos-product-name">{product.name}</p>
                  <p className="pos-product-price">${product.price.toFixed(2)}</p>
                  <p className="pos-product-sku">{product.sku}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="pos-right">
          <div className="pos-card">
            <h2 className="pos-section-title">Current Sale</h2>
            <div className="pos-divider" />
            {cart.length === 0 ? (
              <div className="pos-empty-cart">
                <p className="pos-empty-text">Cart is empty</p>
                <p className="pos-empty-subtext">Scan or add products to begin</p>
              </div>
            ) : (
              <>
                <div className="pos-cart-items">
                  {cart.map((item) => (
                    <div key={item.id} className="pos-cart-item">
                      <div className="pos-cart-item-info">
                        <p className="pos-cart-item-name">{item.name}</p>
                        <p className="pos-cart-item-sku">{item.sku}</p>
                      </div>
                      <div className="pos-cart-item-controls">
                        <button className="pos-qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                        <span className="pos-qty-num">{item.qty}</span>
                        <button className="pos-qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                      </div>
                      <div className="pos-cart-item-price">
                        <p className="pos-cart-item-total">${(item.price * item.qty).toFixed(2)}</p>
                        <button className="pos-remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                      </div>
                    </div>
                  ))}
                </div><div className="pos-divider" />
                <div className="pos-summary">
                  <div className="pos-summary-row">
                    <span className="pos-summary-label">Subtotal</span>
                    <span className="pos-summary-value">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="pos-summary-row">
                    <span className="pos-summary-label">Tax (10%)</span>
                    <span className="pos-summary-value">${tax.toFixed(2)}</span>
                  </div>
                  <div className="pos-summary-row" style={{ marginTop: 8 }}>
                    <span className="pos-total-label">Total</span>
                    <span className="pos-total-value">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="pos-discount-btn" onClick={() => setShowDiscount(true)}>
                  <span style={{ fontSize: 16 }}>+</span> Apply a discount
                </button>

                <button className="pos-checkout-btn" onClick={handleCheckout}>Checkout</button>
                <button className="pos-clear-btn" onClick={clearCart}>Clear Cart</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}