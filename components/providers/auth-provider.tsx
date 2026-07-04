'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { AuthContext, CurrentUser, AuthContextType } from '@/lib/auth-context';
import { mockUsers, type User } from '@/lib/mock-data';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>(mockUsers);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to restore user session:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      setIsLoading(false);
      return { success: false, message: 'Invalid email or password' };
    }

    if (user.status === 'pending') {
      setIsLoading(false);
      // Return the pending user info so we can show the pending message
      return {
        success: true,
        message: 'pending',
      };
    }

    const currentUserData: CurrentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    };

    setCurrentUser(currentUserData);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(currentUserData));
    setIsLoading(false);

    return { success: true };
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Check if email already exists
    if (users.find((u) => u.email === email)) {
      setIsLoading(false);
      return { success: false, message: 'Email already exists' };
    }

    // Create new pending user
    const newUser: User = {
      id: String(users.length + 1),
      name,
      email,
      password,
      role: 'viewer',
      status: 'pending',
      createdAt: new Date(),
    };

    setUsers([...users, newUser]);
    setIsLoading(false);

    return { success: true, message: 'signup_success' };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const approveUser = async (userId: string): Promise<void> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: 'active' as const }
          : user
      )
    );

    setIsLoading(false);
  };

  const rejectUser = async (userId: string): Promise<void> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setUsers(users.filter((user) => user.id !== userId));

    setIsLoading(false);
  };

  const value: AuthContextType = {
    isAuthenticated,
    currentUser,
    userRole: currentUser?.role ?? null,
    accountStatus: currentUser?.status ?? null,
    isLoading,
    login,
    signup,
    logout,
    approveUser,
    rejectUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
