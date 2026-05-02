import { useState, useEffect } from "react";
import { usersService } from "../../services/usersService";
import Toast from "../../components/Toast";
import "./Users.css";

// =============================================
// HELPERS
// =============================================
function getInitials(name) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function Badge({ role }) {
  const badgeClass = {
    Admin: "users-badge-admin",
    Employee: "users-badge-employee",
    Manager: "users-badge-manager",
    Cashier: "users-badge-cashier",
  };
  return <span className={`users-badge ${badgeClass[role]}`}>{role}</span>;
}

function StatusBadge({ status }) {
  return (
    <span className={`users-status ${status === "Active" ? "users-status-active" : "users-status-inactive"}`}>
      {status}
    </span>
  );
}

// =============================================
// EDIT MODAL
// =============================================
function EditModal({ user, onSave, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ 
    name: user.name, 
    handle: user.handle, 
    role: user.role, 
    status: user.status,
    password: user.password
  });

  const hasChanged = 
    form.name !== user.name ||
    form.handle !== user.handle ||
    form.role !== user.role ||
    form.status !== user.status ||
    form.password !== user.password;

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const avatarClass = {
    Admin: "users-avatar-admin",
    Employee: "users-avatar-employee",
    Manager: "users-avatar-manager",
    Cashier: "users-avatar-cashier",
  };

  return (
    <div className="users-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="users-modal users-modal-edit">
        <div className="users-modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className={`users-edit-avatar ${avatarClass[form.role] || "users-avatar-default"}`}>
              {getInitials(form.name)}
            </div>
            <div>
              <div className="users-modal-title">Edit User</div>
              <div style={{ fontSize: 11, color: "#888" }}>{user.handle}</div>
            </div>
          </div>
        </div>

        <div className="users-form">
          <div>
            <label className="users-label">Full Name</label>
            <input className="users-input" value={form.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div>
            <label className="users-label">Username / Handle</label>
            <input className="users-input" value={form.handle} onChange={(e) => set("handle", e.target.value)} />
          </div>
          <div className="users-form-row">
            <div>
              <label className="users-label">Role</label>
              <select className="users-select" value={form.role} onChange={(e) => set("role", e.target.value)}>
                {["Admin", "Manager", "Employee", "Cashier"].map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="users-label">Status</label>
              <select className="users-select" value={form.status} onChange={(e) => set("status", e.target.value)}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="users-label">Password</label>
            <div style={{ position: "relative" }}>
              <input
                className="users-input"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                style={{ paddingRight: "36px" }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="users-modal-actions">
          <button className="users-cancel-btn" onClick={onClose}>Cancel</button>
          <button 
            className="users-save-btn" 
            onClick={() => onSave(form)}
            disabled={!hasChanged}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================
// DELETE CONFIRM MODAL
// =============================================
function DeleteModal({ user, onConfirm, onClose }) {
  return (
    <div className="users-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="users-modal users-modal-delete">
        <div className="users-delete-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" width="24" height="24">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </div>
        <div className="users-delete-title">Delete User</div>
        <div className="users-delete-msg">
          Are you sure you want to delete <strong style={{ color: "#1a1a2e" }}>{user.name}</strong>?<br />
          This action cannot be undone.
        </div>
        <div className="users-delete-actions">
          <button className="users-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="users-save-btn" onClick={onConfirm}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
}

// =============================================
// ADD USER MODAL
// =============================================
function AddUserModal({ onSave, onClose }) {
  const [form, setForm] = useState({ name: "", handle: "", role: "Employee", status: "Active" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="users-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="users-modal users-modal-add">
        <div className="users-modal-header">
          <div className="users-modal-title">Add New User</div>
        </div>
        <div className="users-form">
          <div>
            <label className="users-label">Full Name</label>
            <input className="users-input" placeholder="e.g. Sara Ahmed" value={form.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div>
            <label className="users-label">Username</label>
            <input className="users-input" placeholder="e.g. sara123" value={form.handle} onChange={(e) => set("handle", e.target.value)} />
          </div>
          <div className="users-form-row">
            <div>
              <label className="users-label">Role</label>
              <select className="users-select" value={form.role} onChange={(e) => set("role", e.target.value)}>
                {["Admin", "Manager", "Employee", "Cashier"].map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="users-label">Status</label>
              <select className="users-select" value={form.status} onChange={(e) => set("status", e.target.value)}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <div className="users-modal-actions">
          <button className="users-cancel-btn" onClick={onClose}>Cancel</button>
          <button 
            className="users-save-btn" 
            onClick={() => form.name && form.handle && onSave(form)} 
            disabled={!form.name || !form.handle}
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================
//  USERS PAGE - MAIN COMPONENT
// =============================================
function UsersPage() {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await usersService.getAll();
      setUsersList(data);
    } catch (error) {
      showToast("Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const total = usersList.length;
  const active = usersList.filter((u) => u.status === "Active").length;
  const admins = usersList.filter((u) => u.role === "Admin").length;

  const handleSaveEdit = async (form) => {
    try {
      const updated = await usersService.update(editingUser.id, form);
      setUsersList(usersList.map((u) => (u.id === editingUser.id ? updated : u)));
      setEditingUser(null);
      showToast("User updated successfully");
    } catch (error) {
      showToast("Failed to update user", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await usersService.delete(deletingUser.id);
      setUsersList(usersList.filter((u) => u.id !== deletingUser.id));
      showToast(`${deletingUser.name} has been deleted`, "error");
      setDeletingUser(null);
    } catch (error) {
      showToast("Failed to delete user", "error");
    }
  };

  const handleAddUser = async (form) => {
    try {
      const newUser = await usersService.create(form);
      setUsersList([...usersList, newUser]);
      setShowAdd(false);
      showToast("New user added successfully");
    } catch (error) {
      showToast("Failed to add user", "error");
    }
  };

  if (loading) {
    return (
      <div className="users-loading">
        <div className="users-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="users-page">
      {editingUser && <EditModal user={editingUser} onSave={handleSaveEdit} onClose={() => setEditingUser(null)} />}
      {deletingUser && <DeleteModal user={deletingUser} onConfirm={handleDelete} onClose={() => setDeletingUser(null)} />}
      {showAdd && <AddUserModal onSave={handleAddUser} onClose={() => setShowAdd(false)} />}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onDone={() => setToast(null)} 
        />
      )}

      {/* Stats */}
      <div className="users-stats">
        <div className="users-stat-card total">
          <div className="users-stat-label">Total Users</div>
          <div className="users-stat-value">{total}</div>
        </div>
        <div className="users-stat-card active">
          <div className="users-stat-label">Active Users</div>
          <div className="users-stat-value">{active}</div>
        </div>
        <div className="users-stat-card admins">
          <div className="users-stat-label">Admins</div>
          <div className="users-stat-value">{admins}</div>
        </div>
      </div>

      {/* Table */}
      <div className="users-table-card">
        <div className="users-table-header">
          <span className="users-table-title">All Users</span>
          <button className="users-add-btn" onClick={() => setShowAdd(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>Add User
          </button>
        </div>
        <table className="users-table">
          <thead>
            <tr className="users-tr">
              {["User", "Role", "Status", "Last Login", "Actions"].map((h) => (
                <th key={h} className="users-th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersList.map((u) => (
              <tr key={u.id} className="users-tr">
                <td className="users-td">
                  <div className="users-info">
                    <div className={`users-avatar users-avatar-${u.role.toLowerCase()}`}>
                      {getInitials(u.name)}
                    </div>
                    <div>
                      <div className="users-name">{u.name}</div>
                      <div className="users-handle">{u.handle}</div>
                    </div>
                  </div>
                </td>
                <td className="users-td"><Badge role={u.role} /></td>
                <td className="users-td"><StatusBadge status={u.status} /></td>
                <td className="users-td"><span style={{ fontSize: 12, color: "#888" }}>{u.lastLogin}</span></td>
                <td className="users-td">
                  <div className="users-actions">
                    <button className="users-edit-btn" onClick={() => setEditingUser(u)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button className="users-delete-btn" onClick={() => setDeletingUser(u)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permissions */}
      <div className="users-perms">
        <h3 className="users-perms-title">Roles & Permissions</h3>
        <div className="users-perms-grid">
          <div className="users-perm-card users-perm-card-admin">
            <div className="users-perm-title users-perm-title-admin">Admin (Manager)</div>
            {["Full system access", "Approvals", "View reports", "Manage users", "Set time & date"].map((p) => (
              <div key={p} className="users-perm-item"><span style={{ color: "#7C3AED" }}>•</span> {p}</div>
            ))}
          </div>
          <div className="users-perm-card users-perm-card-employee">
            <div className="users-perm-title users-perm-title-employee">Employee</div>
            {["Manage products", "Update inventory", "Request discounts", "Search products"].map((p) => (
              <div key={p} className="users-perm-item"><span style={{ color: "#155DFC" }}>•</span> {p}</div>
            ))}
          </div>
          <div className="users-perm-card users-perm-card-cashier">
            <div className="users-perm-title users-perm-title-cashier">Cashier</div>
            {["Process sales (POS)", "Search Products", "View product info", "Limited access"].map((p) => (
              <div key={p} className="users-perm-item"><span style={{ color: "#1B9166" }}>•</span> {p}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;