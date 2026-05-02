import { useState, useEffect, useRef } from "react";
import Toast from "../../components/Toast";
import { settingsService } from "../../services/settingsService";
import "./Settings.css";

const Toggle = ({ checked, onChange }) => (
  <div
    onClick={() => onChange(!checked)}
    className="settings-toggle"
    style={{ backgroundColor: checked ? "#FF2056" : "#ccc" }}
  >
    <div className="settings-toggle-knob" style={{ left: checked ? 25 : 3 }} />
  </div>
);

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("");
  const [storeId, setStoreId] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [lowStock, setLowStock] = useState(false);
  const [newOrders, setNewOrders] = useState(false);
  const [discountReq, setDiscountReq] = useState(false);
  const [purchaseReq, setPurchaseReq] = useState(false);

  const [taxRate, setTaxRate] = useState("");
  const [currency, setCurrency] = useState("EGP");

  const [toast, setToast] = useState(null);

  const originalRef = useRef(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const isDirty = () => {
    const orig = originalRef.current;
    if (!orig) return false;
    return (
      storeName !== orig.storeName ||
      storeId !== orig.storeId ||
      address !== orig.address ||
      phone !== orig.phone ||
      email !== orig.email ||
      lowStock !== orig.lowStockAlerts ||
      newOrders !== orig.newOrdersAlerts ||
      discountReq !== orig.discountRequestsAlerts ||
      purchaseReq !== orig.purchaseRequestsAlerts ||
      taxRate !== orig.taxRate ||
      currency !== orig.currency
    );
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.getSettings();
        setStoreName(data.storeName);
        setStoreId(data.storeId);
        setAddress(data.address);
        setPhone(data.phone);
        setEmail(data.email);
        setLowStock(data.lowStockAlerts);
        setNewOrders(data.newOrdersAlerts);
        setDiscountReq(data.discountRequestsAlerts);
        setPurchaseReq(data.purchaseRequestsAlerts);
        setTaxRate(data.taxRate);
        setCurrency(data.currency);
        originalRef.current = data;
      } catch (error) {
        showToast("Failed to load settings", "error");
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    try {
      await settingsService.updateSettings({
        storeName,
        storeId,
        address,
        phone,
        email,
        lowStockAlerts: lowStock,
        newOrdersAlerts: newOrders,
        discountRequestsAlerts: discountReq,
        purchaseRequestsAlerts: purchaseReq,
        taxRate,
        currency,
      });
      originalRef.current = {
        storeName,
        storeId,
        address,
        phone,
        email,
        lowStockAlerts: lowStock,
        newOrdersAlerts: newOrders,
        discountRequestsAlerts: discountReq,
        purchaseRequestsAlerts: purchaseReq,
        taxRate,
        currency,
      };
      showToast("Settings saved successfully!", "success");
    } catch (error) {
      showToast("Failed to save settings", "error");
    }
  };

  const dirty = isDirty();

  return (
    <div className="settings-page">
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}

      <div className="settings-container">
        {/* Store Information */}
        <div className="settings-card">
          <div className="settings-section-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="18" rx="2" stroke="#FF2056" strokeWidth="2"/>
              <path d="M16 3v4M8 3v4M2 11h20" stroke="#FF2056" strokeWidth="2"/>
            </svg>
            <span className="settings-section-title">Store Information</span>
          </div><div className="settings-grid-2">
            <div>
              <label className="settings-label">Store Name</label>
              <input
                className="settings-input"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
            <div>
              <label className="settings-label">Store ID</label>
              <input
                className="settings-input"
                value={storeId}
                onChange={(e) => setStoreId(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label className="settings-label">Address</label>
            <input
              className="settings-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="settings-grid-2-no-mb">
            <div>
              <label className="settings-label">Phone</label>
              <input
                className="settings-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="settings-label">Email</label>
              <input
                className="settings-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="settings-card">
          <div className="settings-section-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#FF2056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#FF2056" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            <span className="settings-section-title">Notifications</span>
          </div>

          {[
            { label: "Low Stock Alerts", desc: "Get notified when products are low in stock", value: lowStock, set: setLowStock },
            { label: "New Orders", desc: "Receive alerts for new customer orders", value: newOrders, set: setNewOrders },
            { label: "Discount Requests", desc: "Notification for approval requests", value: discountReq, set: setDiscountReq },
            { label: "Purchase Requests", desc: "Notification for approval requests", value: purchaseReq, set: setPurchaseReq },
          ].map((item, i, arr) => (
            <div
              key={item.label}
              className="settings-notification-item"
              style={{
                paddingTop: i === 0 ? 0 : 20,
                paddingBottom: i === arr.length - 1 ? 0 : 20,
                borderBottom: i < arr.length - 1 ? "1px solid #f3f4f6" : "none",
              }}
            >
              <div>
                <div className="settings-notification-title">{item.label}</div>
                <div className="settings-notification-desc">{item.desc}</div>
              </div>
              <Toggle checked={item.value} onChange={item.set} />
            </div>
          ))}
        </div>

        {/* Tax & Currency */}
        <div className="settings-card">
          <div className="settings-section-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="5" width="20" height="14" rx="2" stroke="#FF2056" strokeWidth="2"/>
              <path d="M2 10h20" stroke="#FF2056" strokeWidth="2"/>
            </svg>
            <span className="settings-section-title">Tax & Currency</span>
          </div><div className="settings-grid-2-no-mb">
            <div>
              <label className="settings-label">Default Tax Rate (%)</label>
              <input
                className="settings-input"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                type="number"
              />
            </div>
            <div>
              <label className="settings-label">Currency</label>
              <select
                className="settings-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="EGP">EGP</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="SAR">SAR</option>
                <option value="AED">AED</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="settings-save-wrapper">
          <button
            className="settings-save-btn"
            onClick={handleSave}
            disabled={!dirty}
            style={{
              opacity: dirty ? 1 : 0.5,
              cursor: dirty ? "pointer" : "not-allowed",
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}