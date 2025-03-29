
import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  [key: string]: any; // Allow for additional properties
}

interface AuthContextType {
  user: User | null;
  login: (userData: Omit<User, 'id'> & { id?: number }) => void;
  register: (userData: Omit<User, 'id'> & { password: string }) => User;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on initial render
    const storedUser = localStorage.getItem('bookhavenUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // In a real app, this would verify credentials with a backend
    setUser(userData);
    localStorage.setItem('bookhavenUser', JSON.stringify(userData));
  };

  const register = (userData) => {
    // In a real app, this would register the user with a backend
    const newUser = { ...userData, id: userData.id || Date.now() };
    setUser(newUser);
    localStorage.setItem('bookhavenUser', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bookhavenUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
