import { useState, useEffect } from "react";
import Toast from "../../components/Toast";
import { approvalsService } from "../../services/approvalsService";
import "./Approvals.css";

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function XCircleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function ActionBtn({ label, variant, onClick }) {
  const map = {
    approve: { base: "#22c55e", hover: "#16a34a", Icon: CheckIcon },
    edit:    { base: "#2563eb", hover: "#1d4ed8", Icon: EditIcon  },
    reject:  { base: "#ef4444", hover: "#dc2626", Icon: XCircleIcon },
  };
  const { base, hover, Icon } = map[variant];

  return (
    <button
      onClick={onClick}
      onMouseOver={e => (e.currentTarget.style.background = hover)}
      onMouseOut={e  => (e.currentTarget.style.background = base)}
      onMouseDown={e => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={e   => (e.currentTarget.style.transform = "scale(1)")}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
        width: 234, height: 44,
        padding: "10px 20px",
        borderRadius: 8, border: "none",
        boxSizing: "border-box",
        background: base, color: "#fff",
        fontSize: 14, fontWeight: 600,
        cursor: "pointer",
        transition: "background 0.15s, transform 0.1s",
        fontFamily: "inherit",
        flexShrink: 0,
      }}
    >
      <Icon />
      {label}
    </button>
  );
}

function Field({ label, value }) {
  return (
    <div className="approvals-field">
      <span className="approvals-field-label">{label} : </span>
      <span className="approvals-field-value">{value}</span>
    </div>
  );
}

function StatusBadge({ label, type }) {
  let statusClass = "approvals-status-badge";
  if (type === "approved") statusClass += " approvals-status-approved";
  else if (type === "rejected") statusClass += " approvals-status-rejected";
  else statusClass += " approvals-status-discount";
  
  return <span className={statusClass}>{label}</span>;
}

function DiscountCard({ req, onApprove, onEdit, onReject }) {
  return (
    <div className="approvals-discount-card">
      <div className="approvals-card-header">
        <div className="approvals-card-type">Request Type : Discount Request</div>
        <div className="approvals-card-price-section">
          <div className="approvals-old-price">{req.originalPrice}</div>
          <div className="approvals-new-price">{req.finalPrice}</div>
          <StatusBadge label={`-${req.discountPercent}% OFF`} type="discount" />
        </div>
      </div>
      <div className="approvals-fields-grid">
        <Field label="Product Name" value={req.productName} />
        <Field label="Requested By" value={req.requestedBy} />
        <Field label="Original Price" value={req.originalPrice} />
        <Field label="Requested Discount" value={`${req.discountPercent}%`} />
        <Field label="Final Price After Discount" value={req.finalPrice} />
        <Field label="Reason" value={req.reason} />
        <Field label="Date & Time" value={req.dateTime} />
      </div>
      <div className="approvals-actions">
        <ActionBtn label="Approve" variant="approve" onClick={onApprove} />
        <ActionBtn label="Edit Discount" variant="edit" onClick={onEdit} />
        <ActionBtn label="Reject" variant="reject" onClick={onReject} />
      </div>
    </div>
  );
}

function PurchaseCard({ req, onApprove, onEdit, onReject }) {
  return (
    <div className="approvals-purchase-card">
      <div className="approvals-card-type" style={{ marginBottom: 14 }}>Request Type : Purchase Request</div>
      <div className="approvals-fields-grid-2cols">
        <Field label="Product Name" value={req.productName} />
        <Field label="Suggested Reorder Quantity" value={req.suggestedQuantity} />
        <Field label="Requested By" value={req.requestedBy} />
        <Field label="Last Order Date" value={req.lastOrderDate} />
        <Field label="Current Stock" value={req.currentStock} />
        <Field label="Reason" value={req.reason} />
        <Field label="Date & Time" value={req.dateTime} />
      </div>
      <div className="approvals-actions">
        <ActionBtn label="Approve" variant="approve" onClick={onApprove} />
        <ActionBtn label="Edit Quantity" variant="edit" onClick={onEdit} />
        <ActionBtn label="Reject" variant="reject" onClick={onReject} />
      </div>
    </div>
  );
}

function ActivityRow({ item, last }) {
  return (
    <div className={`approvals-activity-row ${last ? 'approvals-activity-row-last' : ''}`}>
      <div>
        <div className="approvals-activity-type">{item.type}</div>
        <div className="approvals-activity-product">{item.product}</div>
        <div className="approvals-activity-by">By {item.by}</div>
      </div>
      <div className="approvals-activity-right">
        <StatusBadge label={item.status === "approved" ? "Approved" : "Rejected"} type={item.status} />
        <div className="approvals-activity-date">{item.date}</div>
      </div>
    </div>
  );
}

export default function ApprovalsPage() {
  const [pending, setPending] = useState([]);
  const [activity, setActivity] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2400);
  };

  useEffect(() => {
    const loadData = async () => {
      const pendingData = await approvalsService.getPendingRequests();
      const activityData = await approvalsService.getActivity();
      setPending(pendingData);
      setActivity(activityData);
    };
    loadData();
  }, []);

  const handleApprove = async (id, type) => {
    try {
      await approvalsService.approveRequest(id, type);
      const newPending = await approvalsService.getPendingRequests();
      const newActivity = await approvalsService.getActivity();
      setPending(newPending);
      setActivity(newActivity);
      showToast(`${type} request approved successfully!`, "success");
    } catch (error) {
      showToast(`Failed to approve ${type} request`, "error");
    }
  };

  const handleReject = async (id, type) => {
    try {
      await approvalsService.rejectRequest(id, type);
      const newPending = await approvalsService.getPendingRequests();
      const newActivity = await approvalsService.getActivity();
      setPending(newPending);
      setActivity(newActivity);
      showToast(`${type} request rejected`, "success");
    } catch (error) {
      showToast(`Failed to reject ${type} request`, "error");
    }
  };

  const handleEdit = (type) => {
    showToast(`Editing ${type === "discount" ? "discount" : "quantity"}...`, "info");
  };

  return (
    <div className="approvals-page">
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}

      <div className="approvals-header">
        <span className="approvals-title">Pending Requests</span>
        <span className="approvals-count-badge">{pending.length}</span>
      </div><div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
        {pending.map((req) => {
          if (req.type === "discount") {
            return (
              <DiscountCard
                key={req.id}
                req={req}
                onApprove={() => handleApprove(req.id, "discount")}
                onEdit={() => handleEdit("discount")}
                onReject={() => handleReject(req.id, "discount")}
              />
            );
          } else if (req.type === "purchase") {
            return (
              <PurchaseCard
                key={req.id}
                req={req}
                onApprove={() => handleApprove(req.id, "purchase")}
                onEdit={() => handleEdit("purchase")}
                onReject={() => handleReject(req.id, "purchase")}
              />
            );
          }
          return null;
        })}

        {pending.length === 0 && (
          <div className="approvals-empty-state">
            <svg className="approvals-empty-svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="1.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div>No pending requests</div>
          </div>
        )}
        
      </div>

      <div className="approvals-activity-card">
        <div className="approvals-activity-title">Recent Activity</div>
        <div className="approvals-activity-divider">
          {activity.map((item, i) => (
            <ActivityRow key={item.id} item={item} last={i === activity.length - 1} />
          ))}
        </div>
      </div>
    </div>
  );
}