import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [loginOverlayVisible, setLoginOverlayVisible] = useState(false);

  const refreshUser = async () => {
    if (token) {
      try {
        const res = await authService.me();
        setUser(res.data.data);
      } catch (error) {
        console.error('Failed to refresh user');
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await authService.me();
          setUser(res.data.data);
        } catch (error) {
          console.error("Token invalid, removing...");
          setToken(null);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const loginWithGoogle = async (credential) => {
    try {
      const response = await authService.loginWithGoogle(credential);
      const { token: newToken, user: userData } = response.data.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      setLoginOverlayVisible(true);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    const { token: newToken, user: userData } = res.data.data;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    setLoginOverlayVisible(true);
    return res.data;
  };

  const register = async (userData) => {
    const res = await authService.register(userData);
    const { token: newToken, user: newUserData } = res.data.data;
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(newUserData);
    setLoginOverlayVisible(true);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    loading,
    login,
    loginWithGoogle,
    register,
    logout,
    refreshUser,
    loginOverlayVisible,
    dismissLoginOverlay: () => setLoginOverlayVisible(false),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
