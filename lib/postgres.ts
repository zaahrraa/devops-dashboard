import { Pool } from 'pg';
import type { DashboardActivity, DashboardData, DashboardDeployment, DashboardMetric, DashboardPod } from '@/lib/dashboard-types';
declare global {
  var dashboardPool: Pool | undefined;
}

const fallbackData: DashboardData = {
  metrics: [
    { label: 'Running Pods', value: '24', unit: 'active', color: 'text-blue-400' },
    { label: 'Healthy Deployments', value: '12', unit: 'of 12', color: 'text-green-400' },
    { label: 'Cluster Uptime', value: '99.98%', unit: 'this month', color: 'text-purple-400' },
    { label: 'CPU Usage', value: '62%', unit: 'of capacity', color: 'text-orange-400' },
    { label: 'Memory Usage', value: '48%', unit: 'of capacity', color: 'text-cyan-400' },
    { label: 'Active Services', value: '8', unit: 'services', color: 'text-pink-400' },
  ],
  pods: [
    { name: 'api-service-pod-1', status: 'Running', namespace: 'default', restarts: 0 },
    { name: 'api-service-pod-2', status: 'Running', namespace: 'default', restarts: 0 },
    { name: 'frontend-web-app-1', status: 'Running', namespace: 'frontend', restarts: 2 },
    { name: 'legacy-service-1', status: 'CrashLoopBackOff', namespace: 'legacy', restarts: 5 },
  ],
  deployment: {
    version: 'v2.3.1',
    lastDeployment: '2 hours ago',
    environment: 'Production',
    health: 'Healthy',
  },
  activities: [
    {
      id: 1,
      type: 'success',
      title: 'Deployment completed',
      description: 'Successfully deployed v2.3.1 to production cluster',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Rolling update finished',
      description: 'Rolling update completed for worker-queue with 0 errors',
      timestamp: '5 hours ago',
    },
  ],
};

function getConnectionString() {
  return (
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    (process.env.POSTGRES_HOST
      ? `postgresql://${process.env.POSTGRES_USER || 'postgres'}:${process.env.POSTGRES_PASSWORD || ''}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT || 5432}/${process.env.POSTGRES_DB || 'postgres'}`
      : '')
  );
}

export function getPool() {
  const connectionString = getConnectionString();

  if (!connectionString) {
    return null;
  }

  if (!globalThis.dashboardPool) {
    globalThis.dashboardPool = new Pool({
      connectionString,
      ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    });
  }

  return globalThis.dashboardPool;
}

async function queryRows<T>(sql: string): Promise<T[]> {
  const pool = getPool();
  if (!pool) {
    return [];
  }

  const client = await pool.connect();
  try {
    const result = await client.query(sql);
    return result.rows as T[];
  } finally {
    client.release();
  }
}

export function getFallbackDashboardData(): DashboardData {
  return fallbackData;
}

export async function getDashboardData(): Promise<DashboardData | null> {
  const pool = getPool();
  if (!pool) {
    return null;
  }

  try {
    const [metrics, pods, deployment, activities] = await Promise.all([
      queryRows<DashboardMetric>(
        'SELECT label, value, unit, color FROM dashboard_metrics ORDER BY id LIMIT 6'
      ).catch(() => []),
      queryRows<DashboardPod>(
        'SELECT name, status, namespace, restarts FROM dashboard_pods ORDER BY id LIMIT 20'
      ).catch(() => []),
      queryRows<DashboardDeployment>(
        'SELECT version, last_deployment AS "lastDeployment", environment, health FROM dashboard_deployments ORDER BY id DESC LIMIT 1'
      ).catch(() => []),
      queryRows<DashboardActivity>(
        'SELECT id, type, title, description, timestamp FROM dashboard_activities ORDER BY id DESC LIMIT 20'
      ).catch(() => []),
    ]);

    const deploymentRow = deployment[0];
    const dashboardData: DashboardData = {
      metrics: metrics.length ? metrics : fallbackData.metrics,
      pods: pods.length ? pods : fallbackData.pods,
      deployment: deploymentRow ?? fallbackData.deployment,
      activities: activities.length ? activities : fallbackData.activities,
    };

    return dashboardData;
  } catch (error) {
    console.error('Unable to load dashboard data from PostgreSQL:', error);
    return null;
  }
}
