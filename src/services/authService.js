const MOCK_USERS = {
  'ahmed': { id: 1, name: 'Ahmed Ali', role: 'admin', dashboard: '/dashboard', permissions: ['all'] },
  'reda': { id: 2, name: 'Reda Yasser', role: 'manager', dashboard: '/dashboard', permissions: ['manage_prices', 'view_reports', 'approve_returns'] },
  'ali': { id: 3, name: 'Ali Nabil', role: 'employee', dashboard: '/dashboard', permissions: ['search_products', 'add_products', 'stock_requests'] },
  'emad': { id: 4, name: 'Emad Yehia', role: 'cashier', dashboard: '/dashboard', permissions: ['process_sales', 'process_returns'] }
};

const MOCK_PASSWORDS = {
  'ahmed': '123',
  'reda': '123',
  'ali': '123',
  'emad': '123'
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  // Login - using username and password
  login: async (username, password) => {
    await delay(800); // Simulate server response time
    
    if (MOCK_USERS[username] && MOCK_PASSWORDS[username] === password) {
      const user = MOCK_USERS[username];
      // Store token (mock)
      localStorage.setItem('auth_token', 'mock_jwt_token_' + user.role);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user, message: `Welcome ${user.name}` };
    } else {
      throw { success: false, message: 'Invalid username or password' };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    return { success: true, message: 'Logged out successfully' };
  },

  // Check authentication status
  checkAuth: () => {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');
    if (token && user) {
      return { isAuthenticated: true, user: JSON.parse(user) };
    }
    return { isAuthenticated: false, user: null };
  }
};