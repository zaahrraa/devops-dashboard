'use client';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { ClusterMetrics } from '@/components/dashboard/cluster-metrics';
import { ActivityFeed } from '@/components/dashboard/activity-feed';

export default function DashboardPage() {
  return (
    <DashboardLayout requiredRole="viewer">
      <div className="p-6 space-y-6">
        <ClusterMetrics />
        <ActivityFeed />
      </div>
    </DashboardLayout>
  );
}
