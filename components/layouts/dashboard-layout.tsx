'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Sidebar } from './sidebar';
import { TopNav } from './top-nav';

interface DashboardLayoutProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'viewer';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  requiredRole = 'viewer',
}) => {
  const router = useRouter();
  const { isAuthenticated, userRole, accountStatus, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }

    // Redirect if account is pending
    if (accountStatus === 'pending') {
      router.push('/auth');
      return;
    }

    // Check role-based access
    if (requiredRole === 'admin' && userRole !== 'admin') {
      router.push('/dashboard');
      return;
    }
  }, [isAuthenticated, userRole, accountStatus, requiredRole, router, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || accountStatus === 'pending') {
    return null;
  }

  if (requiredRole === 'admin' && userRole !== 'admin') {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
