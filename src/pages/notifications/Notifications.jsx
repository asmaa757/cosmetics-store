import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notificationsService } from "../../services/notificationsService";
import { useNotifications } from '../../context/NotificationsContext';
import "./Notifications.css";

function NotificationIcon({ type, color, bgColor }) {
  if (type === "order") {
    return (
      <div className="notifications-icon-wrapper" style={{ backgroundColor: bgColor }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </div>
    );
  }
  if (type === "stock") {
    return (
      <div className="notifications-icon-wrapper" style={{ backgroundColor: bgColor }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
    );
  }
  return (
    <div className="notifications-icon-wrapper" style={{ backgroundColor: bgColor }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}


function NotificationItem({ notif, isLast, onRemove }) {
  const navigate = useNavigate();
  const { setHasUnread } = useNotifications();


const handleClick = async () => {
  await notificationsService.removeNotification(notif.id);
  if (onRemove) onRemove(notif.id);
  setHasUnread(false);
  if (notif.link) {
    navigate(notif.link);
  }
};

  return (
    <div
      className={`notifications-item ${!isLast ? 'notifications-item-border' : ''}`}
      onClick={handleClick}
      onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      style={{ cursor: "pointer" }}
    >
      <NotificationIcon type={notif.type} color={notif.dotColor} bgColor={notif.bgColor} />
      <div className="notifications-content">
        <p className="notifications-item-title">{notif.title}</p>
        <p className="notifications-item-desc">{notif.description}</p>
        <p className="notifications-item-time">{notif.time}</p>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const [allItems, setAllItems] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const data = await notificationsService.getAllNotifications();
      setAllItems(data);
    } catch (error) {
      console.error("Failed to load notifications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleRemoveNotification = (id) => {
    setAllItems(prev => prev.filter(n => n.id !== id));
  };

  const displayedItems = showAll ? allItems : allItems.slice(0, 3);
  const unreadCount = allItems.length;

  if (loading) {
    return (
      <div className="notifications-container">
        <div className="notifications-wrapper">
          <div className="notifications-card">
            <div className="notifications-empty">Loading notifications...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-container">
      <div className="notifications-wrapper">
        <div className="notifications-card"><div className="notifications-header">
            <div>
              <p className="notifications-title">Notifications</p>
              <p className="notifications-count">{unreadCount} unread</p>
            </div>
            {showAll && (
              <button 
                className="notifications-see-less-btn" 
                onClick={() => setShowAll(false)}
              >
                See less
              </button>
            )}
          </div>

          {displayedItems.length === 0 ? (
            <div className="notifications-empty">
              <svg className="notifications-empty-svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <div>No notifications</div>
            </div>
          ) : (
            displayedItems.map((notif, index) => (
              <NotificationItem 
                key={notif.id} 
                notif={notif} 
                isLast={index === displayedItems.length - 1}
                onRemove={handleRemoveNotification}
              />
            ))
          )}

          {!showAll && allItems.length > 3 && (
            <div className="notifications-footer">
              <button className="notifications-see-all-btn" onClick={() => setShowAll(true)}>
                See all notifications...
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
