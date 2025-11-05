import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  hasConfigKey: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  signOut: () => void;
  setConfigKey: (key: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasConfigKey, setHasConfigKey] = useState(false);

  useEffect(() => {
    // Load auth state from localStorage
    const savedUser = localStorage.getItem('stackguard_user');
    const savedConfigKey = localStorage.getItem('stackguard_config_key');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedConfigKey) {
      setHasConfigKey(true);
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    const savedUsers = localStorage.getItem('stackguard_users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = {
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
      };
      setUser(userData);
      localStorage.setItem('stackguard_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<boolean> => {
    // Simulate API call
    const savedUsers = localStorage.getItem('stackguard_users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    
    // Check if user already exists
    const existingUser = users.find((u: any) => u.email === email);
    if (existingUser) {
      return false;
    }

    const newUser = { email, password, firstName, lastName };
    users.push(newUser);
    localStorage.setItem('stackguard_users', JSON.stringify(users));

    const userData = { email, firstName, lastName };
    setUser(userData);
    localStorage.setItem('stackguard_user', JSON.stringify(userData));
    return true;
  };

  const signOut = () => {
    setUser(null);
    setHasConfigKey(false);
    localStorage.removeItem('stackguard_user');
    localStorage.removeItem('stackguard_config_key');
  };

  const setConfigKey = (key: string) => {
    localStorage.setItem('stackguard_config_key', key);
    setHasConfigKey(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        hasConfigKey,
        signIn,
        signUp,
        signOut,
        setConfigKey,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
