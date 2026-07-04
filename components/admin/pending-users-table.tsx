'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { mockUsers, type User } from '@/lib/mock-data';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

export const PendingUsersTable: React.FC = () => {
  const { approveUser, rejectUser } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  useEffect(() => {
    // Filter pending users from mock data
    const pending = mockUsers.filter((user) => user.status === 'pending');
    setPendingUsers(pending);
  }, []);

  const handleApprove = async (userId: string) => {
    setActionInProgress(userId);
    try {
      await approveUser(userId);
      setPendingUsers(pendingUsers.filter((user) => user.id !== userId));
    } finally {
      setActionInProgress(null);
    }
  };

  const handleReject = async (userId: string) => {
    setActionInProgress(userId);
    try {
      await rejectUser(userId);
      setPendingUsers(pendingUsers.filter((user) => user.id !== userId));
    } finally {
      setActionInProgress(null);
    }
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {pendingUsers.length === 0 ? (
        <div className="p-12 text-center">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <p className="text-foreground font-medium mb-1">No pending approvals</p>
          <p className="text-muted-foreground text-sm">All users have been reviewed</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                  Signup Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs font-medium capitalize">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleApprove(user.id)}
                        disabled={actionInProgress === user.id}
                        className="p-2 text-green-400 hover:bg-green-500/10 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Approve user"
                      >
                        {actionInProgress === user.id ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleReject(user.id)}
                        disabled={actionInProgress === user.id}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Reject user"
                      >
                        {actionInProgress === user.id ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
