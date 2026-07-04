'use client';

import { Clock } from 'lucide-react';

interface PendingApprovalProps {
  email: string;
  onLogout: () => void;
}

export const PendingApproval: React.FC<PendingApprovalProps> = ({ email, onLogout }) => {
  return (
    <div className="w-full max-w-md mx-auto text-center space-y-6">
      <div className="flex justify-center">
        <Clock className="w-16 h-16 text-yellow-400 animate-pulse" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Account Pending Approval</h2>
        <p className="text-muted-foreground">
          Your account is waiting for admin approval
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="text-left">
          <p className="text-sm text-muted-foreground mb-2">
            <strong className="text-foreground">Email:</strong> {email}
          </p>
          <p className="text-sm text-muted-foreground">
            Your account is currently under review by our administrators. Once approved, you&apos;ll have full access to the dashboard. This typically takes 24-48 hours.
          </p>
        </div>

        <div className="pt-4 border-t border-border space-y-2 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Next Steps:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Check your email for approval notification</li>
            <li>Admin will review your credentials</li>
            <li>You&apos;ll be notified of the decision</li>
          </ul>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Try Different Account
      </button>
    </div>
  );
};
