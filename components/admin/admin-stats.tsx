'use client';

import { mockUsers } from '@/lib/mock-data';
import { Users, Clock, CheckCircle, Shield } from 'lucide-react';
import { MetricsCard } from '../dashboard/metrics-card';

export const AdminStats: React.FC = () => {
  const totalUsers = mockUsers.length;
  const pendingUsers = mockUsers.filter((u) => u.status === 'pending').length;
  const activeUsers = mockUsers.filter((u) => u.status === 'active').length;
  const adminUsers = mockUsers.filter((u) => u.role === 'admin').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricsCard
        label="Total Users"
        value={totalUsers}
        icon={Users}
        color="blue"
      />
      <MetricsCard
        label="Pending Approvals"
        value={pendingUsers}
        icon={Clock}
        color="orange"
      />
      <MetricsCard
        label="Active Users"
        value={activeUsers}
        icon={CheckCircle}
        color="green"
      />
      <MetricsCard
        label="Admin Users"
        value={adminUsers}
        icon={Shield}
        color="purple"
      />
    </div>
  );
};
