import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (email, password) => {
    // Frontend demo mock (backend connect hote hi JWT endpoint se replace hoga)
    const mockUser = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0],
      email,
      role: email.includes('admin') ? 'admin' : 'customer',
      token: 'mock-jwt-token-' + Date.now(),
    };
    setUser(mockUser);
    return mockUser;
  };

  const register = (name, email, password) => {
    const mockUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      role: 'customer',
      token: 'mock-jwt-token-' + Date.now(),
    };
    setUser(mockUser);
    return mockUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);