import { createContext, useContext, useState } from 'react';

const NotificationsContext = createContext();

export function NotificationsProvider({ children }) {
  const [hasUnread, setHasUnread] = useState(true);
  
  return (
    <NotificationsContext.Provider value={{ hasUnread, setHasUnread }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext);
}