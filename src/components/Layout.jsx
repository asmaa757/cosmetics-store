import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <main className="main" style={{ flex: 1, background: '#F9FAFB' }}>
          <div className="content">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;