import { createContext, useContext } from 'react';

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'viewer';
  status: 'pending' | 'active';
}

export interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: CurrentUser | null;
  userRole: 'admin' | 'viewer' | null;
  accountStatus: 'pending' | 'active' | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  approveUser: (userId: string) => Promise<void>;
  rejectUser: (userId: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
