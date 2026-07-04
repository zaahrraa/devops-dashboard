'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { AuthForm } from '@/components/auth/auth-form';
import { SignupSuccess } from '@/components/auth/signup-success';
import { PendingApproval } from '@/components/auth/pending-approval';
import { Lock } from 'lucide-react';

type AuthPageState = 'form' | 'signup_success' | 'pending_approval' | 'loading';

export default function AuthPage() {
  const router = useRouter();
  const { isAuthenticated, currentUser, userRole, accountStatus, login, logout, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [pageState, setPageState] = useState<AuthPageState>('form');
  const [signupEmail, setSignupEmail] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');

  // Redirect if already authenticated and active
  useEffect(() => {
    if (isAuthenticated && accountStatus === 'active') {
      if (userRole === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, accountStatus, userRole, router]);

  // Handle pending user login
  useEffect(() => {
    if (isAuthenticated && accountStatus === 'pending') {
      setPendingEmail(currentUser?.email || '');
      setPageState('pending_approval');
    }
  }, [isAuthenticated, accountStatus, currentUser?.email]);

  const handleSignupClick = () => {
    setAuthMode('signup');
    setPageState('form');
  };

  const handleLoginClick = () => {
    setAuthMode('login');
    setPageState('form');
  };

  const handleAuthFormSubmit = async (e?: React.FormEvent) => {
    // This is triggered by the form - we need to listen for success
    if (authMode === 'login') {
      const email = (document.querySelector('input[type="email"]') as HTMLInputElement)?.value;
      if (email && pageState === 'form') {
        // The login will be called by the form component
        // After a successful signup, we show the success message
      }
    }
  };

  // Listen for signup success - this is a bit of a workaround
  // In a real app, the form would call a callback
  useEffect(() => {
    const checkFormSuccess = () => {
      const successMsg = document.querySelector('[class*="green-500"]');
      if (successMsg?.textContent?.includes('Account created')) {
        const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
        if (emailInput?.value) {
          setSignupEmail(emailInput.value);
          setPageState('signup_success');
        }
      }
    };

    // This is a simplified version - in production you'd use proper form callbacks
  }, []);

  const handleGoBackToLogin = () => {
    setAuthMode('login');
    setPageState('form');
    setSignupEmail('');
  };

  const handleLogoutFromPending = () => {
    logout();
    setPendingEmail('');
    setPageState('form');
    setAuthMode('login');
  };

  // Create a wrapper to capture form state changes
  const [formState, setFormState] = useState<'idle' | 'signup_success'>('idle');

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">DevOps Dashboard</h1>
          <p className="text-muted-foreground">Enterprise-grade infrastructure monitoring</p>
        </div>

        {/* Content based on page state */}
        <div className="bg-card border border-border rounded-lg p-8">
          {pageState === 'form' && (
            <AuthForm mode={authMode} onModeChange={setAuthMode} />
          )}

          {pageState === 'signup_success' && (
            <SignupSuccess email={signupEmail} onGoBack={handleGoBackToLogin} />
          )}

          {pageState === 'pending_approval' && (
            <PendingApproval email={pendingEmail} onLogout={handleLogoutFromPending} />
          )}
        </div>

        {/* Demo credentials hint */}
        <div className="mt-8 p-4 bg-card/50 border border-border rounded-lg text-xs text-muted-foreground">
          <p className="font-medium text-foreground mb-2">Demo Credentials:</p>
          <ul className="space-y-1">
            <li>
              <strong>Admin:</strong> admin@example.com / admin123
            </li>
            <li>
              <strong>Viewer:</strong> john@example.com / john123
            </li>
            <li>
              <strong>Or create new account to see pending approval</strong>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
