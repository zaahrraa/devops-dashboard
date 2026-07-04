export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'viewer';
  status: 'pending' | 'active';
  createdAt: Date;
}

export interface Metrics {
  activePods: number;
  cpuUsage: number;
  memoryUsage: number;
  networkIO: number;
  uptime: number;
  errorRate: number;
}

export interface ActivityEvent {
  id: string;
  type: 'deployment' | 'pod_restart' | 'health_check' | 'config_change' | 'approval' | 'rejection';
  title: string;
  description: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error' | 'info';
}

// Mock Users Database
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    status: 'active',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john123',
    role: 'viewer',
    status: 'active',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '3',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    password: 'sarah123',
    role: 'viewer',
    status: 'pending',
    createdAt: new Date('2024-07-02'),
  },
  {
    id: '4',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    password: 'mike123',
    role: 'viewer',
    status: 'pending',
    createdAt: new Date('2024-07-03'),
  },
  {
    id: '5',
    name: 'Emily Davis',
    email: 'emily@example.com',
    password: 'emily123',
    role: 'viewer',
    status: 'pending',
    createdAt: new Date('2024-07-04'),
  },
];

// Mock Metrics Data
export const generateMockMetrics = (): Metrics => {
  return {
    activePods: 24 + Math.floor(Math.random() * 5),
    cpuUsage: 62 + Math.floor(Math.random() * 10) - 5,
    memoryUsage: 48 + Math.floor(Math.random() * 10) - 5,
    networkIO: 2.3 + Math.random() * 0.5,
    uptime: 99.98,
    errorRate: 0.02 + Math.random() * 0.03,
  };
};

// Mock Activity Events
export const mockActivityEvents: ActivityEvent[] = [
  {
    id: '1',
    type: 'deployment',
    title: 'Deployment Completed',
    description: 'v2.3.1 deployed to production',
    timestamp: new Date(Date.now() - 30 * 60000),
    status: 'success',
  },
  {
    id: '2',
    type: 'pod_restart',
    title: 'Pod Restarted',
    description: 'api-service-5d4c8 restarted (1 restart)',
    timestamp: new Date(Date.now() - 2 * 60 * 60000),
    status: 'warning',
  },
  {
    id: '3',
    type: 'health_check',
    title: 'Health Check Passed',
    description: 'All services responding normally',
    timestamp: new Date(Date.now() - 3 * 60 * 60000),
    status: 'success',
  },
  {
    id: '4',
    type: 'config_change',
    title: 'Configuration Updated',
    description: 'Environment variables updated for payment service',
    timestamp: new Date(Date.now() - 5 * 60 * 60000),
    status: 'info',
  },
  {
    id: '5',
    type: 'approval',
    title: 'User Approved',
    description: 'John Doe was approved for access',
    timestamp: new Date(Date.now() - 24 * 60 * 60000),
    status: 'success',
  },
  {
    id: '6',
    type: 'pod_restart',
    title: 'Pod CrashLoopBackOff',
    description: 'worker-service-2a1f3 in crash loop',
    timestamp: new Date(Date.now() - 26 * 60 * 60000),
    status: 'error',
  },
];
