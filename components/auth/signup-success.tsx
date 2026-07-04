'use client';

import { CheckCircle, Clock } from 'lucide-react';

interface SignupSuccessProps {
  email: string;
  onGoBack: () => void;
}

export const SignupSuccess: React.FC<SignupSuccessProps> = ({ email, onGoBack }) => {
  return (
    <div className="w-full max-w-md mx-auto text-center space-y-6">
      <div className="flex justify-center">
        <CheckCircle className="w-16 h-16 text-green-400" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Account Created!</h2>
        <p className="text-muted-foreground">
          We&apos;ve received your signup request
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-left">
            <p className="font-medium text-foreground">Pending Admin Approval</p>
            <p className="text-sm text-muted-foreground">
              Your account is now under review by our administrators. You&apos;ll receive an email at{' '}
              <span className="text-primary font-medium">{email}</span> once your account is approved.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-2 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">What happens next?</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Our admin team will review your request</li>
            <li>You&apos;ll be notified once approved</li>
            <li>You can then access the full dashboard</li>
          </ul>
        </div>
      </div>

      <button
        onClick={onGoBack}
        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Back to Login
      </button>
    </div>
  );
};
