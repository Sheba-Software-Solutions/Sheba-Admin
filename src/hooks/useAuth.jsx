import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiHelpers } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get environment variables
  const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || 'auth_token';
  const USER_KEY = import.meta.env.VITE_USER_KEY || 'user_data';

  useEffect(() => {
    // Check for existing authentication on app load
    const savedToken = localStorage.getItem(TOKEN_KEY);
    const savedUser = localStorage.getItem(USER_KEY);

    if (savedToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiHelpers.login(credentials);
      const { token: newToken, user: userData } = response.data;

      // Store in localStorage
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));

      // Update state
      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, user: userData };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.response?.data || error.message };
    }
  };

  const logout = async () => {
    try {
      await apiHelpers.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Always clear local state and storage
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const validateRole = (expectedRole) => {
    if (!user) return false;
    return user.role === expectedRole;
  };

  const logoutOnRoleMismatch = async () => {
    await logout();
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  };

  const changePassword = async (passwordData) => {
    try {
      await apiHelpers.changePassword(passwordData);
      return { success: true };
    } catch (error) {
      console.error('Password change failed:', error);
      return { success: false, error: error.response?.data || error.message };
    }
  };

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    validateRole,
    logoutOnRoleMismatch,
    updateUser,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
