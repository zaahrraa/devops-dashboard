'use client';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { AdminStats } from '@/components/admin/admin-stats';
import { PendingUsersTable } from '@/components/admin/pending-users-table';

export default function AdminPage() {
  return (
    <DashboardLayout requiredRole="admin">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Admin Portal</h2>
          <p className="text-muted-foreground">Manage users and approve pending signups</p>
        </div>

        {/* Stats */}
        <AdminStats />

        {/* Pending Users */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Pending User Approvals</h3>
          <PendingUsersTable />
        </div>
      </div>
    </DashboardLayout>
  );
}
