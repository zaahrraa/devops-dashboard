export interface DashboardMetric {
  label: string;
  value: string;
  unit: string;
  color: string;
}

export interface DashboardPod {
  name: string;
  status: 'Running' | 'Pending' | 'CrashLoopBackOff' | 'Completed';
  namespace: string;
  restarts: number;
}

export interface DashboardDeployment {
  version: string;
  lastDeployment: string;
  environment: string;
  health: 'Healthy' | 'Warning' | 'Critical';
}

export interface DashboardActivity {
  id: number;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  description: string;
  timestamp: string;
}

export interface DashboardData {
  metrics: DashboardMetric[];
  pods: DashboardPod[];
  deployment: DashboardDeployment;
  activities: DashboardActivity[];
}
