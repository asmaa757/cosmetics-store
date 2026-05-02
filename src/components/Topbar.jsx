import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { notificationsService } from "../services/notificationsService";
import { useNotifications } from '../context/NotificationsContext';

const style = document.createElement('style');
style.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --pink: #e0305a;
    --pink-light: #fce8ed;
    --pink-mid: #f7c0ce;
    --teal: #2ec4b6;
    --teal-light: #e0f7f5;
    --gold: #f4a261;
    --gold-light: #fef3e8;
    --blue: #4a90d9;
    --blue-light: #eaf2fb;
    --purple: #9b59b6;
    --purple-light: #f3eaf9;
    --bg: #f8f5f7;
    --sidebar-bg: #ffffff;
    --card-bg: #ffffff;
    --text: #2d2235;
    --muted: #9a8fa0;
    --border: #ede8f0;
    --shadow: 0 2px 16px rgba(180,120,150,0.10);
    --radius: 14px;
    --sidebar-w: 260px;
  }



  /* MAIN */
  .main {
    margin-left: var(--sidebar-w);
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* TOPBAR */
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 36px;
    background: #fff;
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 5;
    margin-left: 260px;
  }

  .topbar-title {
    color: #262626;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 1;
    letter-spacing: 0;
  }

  .topbar-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .topbar-datetime {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0px;
    text-align: right;
    font-size: 13px;
    margin-right: 15px;
  }

  .topbar-time {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 15px;
    color: #262626;
    text-align: center;
    margin-bottom:-4px
  }

  .topbar-date {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #4B4B4B;
    text-align: center;
  }

  .notif-btn {
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: var(--muted);
  }

  .notif-btn .badge {
    position: absolute;
    top: 0;
    right: 0;
    width: 9px;
    height: 9px;
    background: #FF2056;
    border-radius: 50%;
    border: 2px solid #fff;
  }

  .user-chip {
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    border-left: 1px solid #00000014;
    padding: 0px 11px;
    position: relative;
    left: 20px;
  }

  .avatar-circle {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #FFE4E6;
    color: #FF2056;
    font-weight: 700;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-info {
    line-height: 1.3;
  }

  .user-name {
    font-weight: 600;
    font-size: 15px;
  }

  .user-role {
    font-weight: 400;
    font-size: 12px;
    color: #4C4949;
  }

  /* Content placeholder */
  .content {
    padding: 32px 36px 48px;
    flex: 1;
  }

  .placeholder {
    background: var(--card-bg);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    padding: 60px;
    text-align: center;
    color: var(--muted);
    font-size: 18px;
  }`
;
document.head.appendChild(style);

function Topbar() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const { hasUnread, setHasUnread } = useNotifications();

  
  useEffect(() => {
    function updateClock() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const timeStr = `${hours}:${minutes} ${ampm}`;
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      setCurrentTime(timeStr);
      setCurrentDate(dateStr);
    }
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    
    switch(path) {
      case '/':
      case '/dashboard':
        return 'Dashboard';
      case '/products':
        return 'Products';
      case '/pos':
        return 'Point of Sale';
      case '/inventory':
        return 'Inventory';
      case '/users':
        return 'Users';
      case '/reports':
        return 'Reports';
      case '/approvals':
        return 'Approvals';
      case '/settings':
        return 'Settings';
      case '/notifications':
        return 'Notifications';
      default:
        return 'Dashboard';
    }
  };

  if (loading || !user) {
    return (
      <header className="topbar">
        <h1 className="topbar-title">Loading...</h1>
        <div className="topbar-right">
          <div className="topbar-datetime">
            <div className="topbar-time">{currentTime}</div>
            <div className="topbar-date">{currentDate}</div>
          </div>
        </div>
      </header>
    );
  }

  const getRoleLabel = (role) => {
    switch(role) {
      case 'admin': return 'Admin';
      case 'manager': return 'Manager';
      case 'employee': return 'Employee';
      case 'cashier': return 'Cashier';
      default: return role;
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    
    const parts = name.trim().split(' ');
    
    if (parts.length === 1) {

      return parts[0].charAt(0).toUpperCase();
    }
    
    const firstInitial = parts[0].charAt(0).toUpperCase();
    const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();
    
    return firstInitial + lastInitial;
  };

  const handleNotificationsClick = () => {
    setHasUnread(false);
    navigate('/notifications');
  };


  return (
    <header className="topbar">
      <h1 className="topbar-title">{getPageTitle()}</h1>
      <div className="topbar-right">
        <div className="topbar-datetime">
          <div className="topbar-time">{currentTime}</div>
          <div className="topbar-date">{currentDate}</div>
        </div>

        <button className="notif-btn" onClick={handleNotificationsClick}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          {hasUnread && <span className="badge"></span>}
        </button>

        <div className="user-chip">
          <div className="avatar-circle">{getInitials(user.name)}</div>
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-role">{getRoleLabel(user.role)}</div>
          </div>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
    </header>
  );
}

export default Topbar;