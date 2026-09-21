import { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'admin' | 'user' | 'guest';

interface User {
  id: string;
  username: string;
  role: UserRole;
  email?: string;
  subscription?: {
    plan: string;
    expiresAt: string;
    unlimited: boolean;
  };
  purchasedTemplates: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasAccess: (templateId: string) => boolean;
  canPurchase: () => boolean;
}

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin',
};

const DEMO_USERS: User[] = [
  {
    id: 'admin-001',
    username: 'admin',
    role: 'admin',
    email: 'admin@blogmaker.pro',
    subscription: {
      plan: 'Безлимитный',
      expiresAt: '2099-12-31',
      unlimited: true,
    },
    purchasedTemplates: ['*'],
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const adminUser = DEMO_USERS.find(u => u.username === 'admin');
      if (adminUser) {
        setUser(adminUser);
        return true;
      }
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'admin';

  const hasAccess = (templateId: string): boolean => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    if (user.purchasedTemplates.includes('*')) return true;
    return user.purchasedTemplates.includes(templateId);
  };

  const canPurchase = (): boolean => {
    return isAuthenticated && !isAdmin;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isAdmin,
      login,
      logout,
      hasAccess,
      canPurchase,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
