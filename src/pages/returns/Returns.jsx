import { useState } from "react";
import { returnsService } from "../../services/returnsService";
import Toast from "../../components/Toast";
import "./Returns.css";

const ReturnsIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 14l-4-4 4-4" />
    <path d="M5 10h11a4 4 0 010 8h-1" />
  </svg>
);

const availableProducts = [
  "Mac Lipstick",
  "SHEGLAM Lip Gloss",
  "Eye Shadow Palette",
  "Colored Blusher",
  "Hydration Serum",
  "GUCCI Lipstick",
  "LAURA GELLER Mascara",
  "Peripera Blusher"
];

export default function ReturnsPage() {
  const [products, setProducts] = useState(["Mac Lipstick"]);
  const [returnQty, setReturnQty] = useState(1);
  const [sku, setSku] = useState("LIP-001");
  const [invoiceNum, setInvoiceNum] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const removeProduct = (idx) =>
    setProducts((prev) => prev.filter((_, i) => i !== idx));

  const addProduct = (productName) => {
    if (!products.includes(productName)) {
      setProducts((prev) => [...prev, productName]);
    }
    setShowProductDropdown(false);
  };

  const handleRecord = async () => {
    if (products.length === 0) {
      showToast("Please select at least one product", "error");
      return;
    }
    if (!returnQty || returnQty < 1) {
      showToast("Please enter a valid return quantity", "error");
      return;
    }
    if (!sku.trim()) {
      showToast("Please enter a SKU", "error");
      return;
    }
    if (!invoiceNum.trim()) {
      showToast("Please enter an invoice number", "error");
      return;
    }
    if (!returnDate.trim() || returnDate.length < 10) {
      showToast("Please enter a valid return date (YYYY-MM-DD)", "error");
      return;
    }

    const returnData = {
      products,
      returnQty,
      sku,
      invoiceNum,
      returnDate,
    };

    try {
      await returnsService.createReturn(returnData);
      showToast("Return recorded successfully!", "success");
    } catch (error) {
      showToast("Failed to record return", "error");
    }
  };

  const handleDateChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9-]/g, '');
    if (value.length > 10) return;
    if (value.length === 4 && !value.includes('-')) {
      value = value + '-';
    }
    if (value.length === 7 && value.split('-').length === 2) {
      value = value + '-';
    }
    setReturnDate(value);
  };

  const isFormValid =
    products.length > 0 &&
    returnQty >= 1 &&
    sku.trim() !== "" &&
    invoiceNum.trim() !== "" &&
    returnDate.length === 10;

  return (
    <div className="returns-root">
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
      
      <div className="returns-card">
        <div className="returns-card-header">
          <span style={{ color: "#e8195a" }}>
            <ReturnsIcon size={18} />
          </span>
          <span className="returns-card-title">Process Return</span>
        </div>
        <div className="returns-divider" />

        <div className="returns-field">
          <label className="returns-label">Product Name</label>
          <div className="returns-tag-box">
            <div className="returns-tags-row">
              {products.map((p, i) => (
                <span key={i} className="returns-tag">
                  {p}
                  <button onClick={() => removeProduct(i)} className="returns-tag-remove">
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div style={{ position: "relative" }}>
              <button
                className="returns-add-btn"
                onClick={() => setShowProductDropdown(!showProductDropdown)}
              >
                +
              </button>
              {showProductDropdown && (
                <div className="returns-dropdown">
                  {availableProducts
                    .filter(p => !products.includes(p))
                    .map((product, idx) => (
                      <div
                        key={idx}
                        className="returns-dropdown-item"onClick={() => addProduct(product)}
                      >
                        {product}
                      </div>
                    ))}
                  {availableProducts.filter(p => !products.includes(p)).length === 0 && (
                    <div className="returns-dropdown-item disabled">All products added</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="returns-row">
          <div className="returns-field" style={{ flex: 1 }}>
            <label className="returns-label">Return Quantity</label>
            <input
              type="number"
              value={returnQty}
              min={1}
              onChange={(e) => setReturnQty(e.target.value)}
              className="returns-input"
            />
          </div>
          <div className="returns-field" style={{ flex: 1 }}>
            <label className="returns-label">SKU</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="returns-input"
            />
          </div>
        </div>

        <div className="returns-field">
          <label className="returns-label">Original Invoice Number</label>
          <input
            type="text"
            placeholder="e.g. 1042 (optional)"
            value={invoiceNum}
            onChange={(e) => setInvoiceNum(e.target.value.replace(/[^0-9]/g, ''))}
            className="returns-input"
          />
        </div>

        <div className="returns-field">
          <label className="returns-label">Return Date</label>
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            maxLength={10}
            value={returnDate}
            onChange={handleDateChange}
            className="returns-input"
          />
        </div>
        
        <div className="returns-actions">
          <button onClick={handleRecord} className="returns-record-btn">
            <ReturnsIcon size={16} />
            Record Return
          </button>
        </div>
      </div>
    </div>
  );
}