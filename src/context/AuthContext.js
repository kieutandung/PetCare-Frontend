import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Kiểm tra user đã login chưa khi load app
    const currentUser = authService.getCurrentUser();
    if (currentUser && authService.isAuthenticated()) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (loginData) => {
    try {
      const response = await authService.login(loginData);
      if (response.success) {
        const userData = {
          id: response.userId,
          fullName: response.fullName,
          email: response.email,
          phone: response.phone,
          role: response.role,
        };
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true, message: response.message };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message || 'Login failed' };
    }
  };

  const register = async (registerData) => {
    try {
      const response = await authService.register(registerData);
      if (response.success) {
        const userData = {
          id: response.userId,
          fullName: response.fullName,
          email: response.email,
          phone: response.phone,
          role: response.role,
        };
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true, message: response.message };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message || 'Registration failed' };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const response = await authService.changePassword(user?.id, oldPassword, newPassword);
      return response;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};