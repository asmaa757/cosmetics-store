import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const style = document.createElement('style');
style.textContent = `
/* ─── SIDEBAR ─── */
.sidebar {
  width: var(--sidebar-w);
  background: var(--sidebar-bg);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0; left: 0; bottom: 0;
  z-index: 10;
  box-shadow: 2px 0 18px rgba(180,100,130,0.06);
}

/* Logo */
.big {
    display: flex;
    align-items: center;
    height: 105px;
    justify-content: center;
    background: #FFFFFF;
    border-style: solid;
    border-width: 0 0 2px 0;
    border-color: #00000014;
    margin-bottom: 16px;
}

.logoo {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
}

.logoo-icon {
  width: 65px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logoo-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logoo-text {
  font-family: 'Libertinus Serif Display', serif;
  font-weight: 400;
  font-size: 29px;
  line-height: 100%;
  letter-spacing: 0;
  width: 134px;
  height: 36px;
  opacity: 1;
  background: linear-gradient(90deg, #FF2056 0%, #BF3657 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

nav 
{ 
  flex: 1; 
  padding: 0 8px;

  }
.nav-item {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  display: inline-flex;
  align-items: center;
  gap: 13px;
  padding: 13px 28px;
  width: 240px;
  font-size: 15px;
  font-weight: 550;
  color: #4C4949;
  border-radius: 15px;
  text-decoration: none;
}

.nav-item:not(.active):hover {
  background: #FDF1F6;
  color: #FF2056;
}

.nav-item.active {
  background: #FDF1F6;
  color: #FF2056;
}

nav:hover .nav-item.active:not(:hover) {
  background: transparent;
  color: #4C4949;
}

.nav-item.active:hover {
  background: #FDF1F6;
  color: #FF2056;
}

/* icons */
.nav-item svg {
  flex-shrink: 0;
  opacity: .7;
}

.nav-item.active:hover svg,
.nav-item:hover svg {
  opacity: 1;
}

.sidebar-logout {
  padding: 0 28px;
  margin-top: 12px;
  border-top: 1px solid #BCBCBC; 
}
.logout-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4C4949;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 20px 20px;
  background: none;
  border: none;
  width: 100%;
  transition: color .18s;
}
.logout-btn:hover { color: #FF2056; }`
;
document.head.appendChild(style);

const dashboardIcon = (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const productsIcon = (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
    <path d="M12 2l9 4.5v9L12 22l-9-6.5v-9L12 2z" />
    <path d="M12 2v9.5" />
    <path d="M21 6.5l-9 5-9-5" />
  </svg>
);

const posIcon = (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const inventoryIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="9" y1="21" x2="9" y2="9" />
    <line x1="15" y1="21" x2="15" y2="9" />
  </svg>
);
const usersIcon = (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const reportsIcon = (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const approvalsIcon = (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const returnsIcon = (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
    <path d="M3 21v-5h5"/>
  </svg>
);

const settingsIcon = (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

function Sidebar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getNavItems = () => {
    const allItems = [
      { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: dashboardIcon, roles: ['admin', 'manager', 'employee'] },
      { id: 'products', label: 'Products', path: '/products', icon: productsIcon, roles: ['admin', 'manager', 'employee'] },
      { id: 'pos', label: 'POS', path: '/pos', icon: posIcon, roles: ['admin', 'cashier'] },
      { id: 'inventory', label: 'Inventory', path: '/inventory', icon: inventoryIcon, roles: ['admin', 'manager', 'employee'] },
      { id: 'users', label: 'Users', path: '/users', icon: usersIcon, roles: ['admin'] },
      { id: 'reports', label: 'Reports', path: '/reports', icon: reportsIcon, roles: ['admin', 'manager'] },
      { id: 'approvals', label: 'Approvals', path: '/approvals', icon: approvalsIcon, roles: ['admin', 'manager', 'employee'] },
      { id: 'returns', label: 'Returns', path: '/returns', icon: returnsIcon, roles: ['admin', 'cashier', 'manager'] },
      { id: 'settings', label: 'Settings', path: '/settings', icon: settingsIcon, roles: ['admin', 'manager'] },
    ];
    
    return allItems.filter(item => item.roles.includes(user?.role));
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading || !user) {
    return (
      <aside className="sidebar">
        <div className="big">
          <div className="logoo">
            <div className="logoo-icon">
              <img src="/logo.jpg" alt="logo" />
            </div>
            <span className="logoo-text">Riza Store</span>
          </div>
        </div>
        <nav>
          <div className="nav-item">Loading..</div>
        </nav>
      </aside>
    );
  }

  const navItems = getNavItems();

  return (
    <aside className="sidebar">
      <div className="big">
        <div className="logoo">
          <div className="logoo-icon">
            <img src="/logo.jpg" alt="logo" />
          </div>
          <span className="logoo-text">Riza Store</span>
        </div>
      </div>

      <nav>
        {navItems.map(item => (
          <div 
            key={item.id} 
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </nav>

      <div className="sidebar-logout">
        <button className="logout-btn" onClick={handleLogout}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

