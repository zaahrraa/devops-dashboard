import { CheckCircle2, AlertCircle, GitBranch, Zap } from 'lucide-react';

interface Activity {
  id: number;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
}

const activities: Activity[] = [
  {
    id: 1,
    type: 'success',
    title: 'Deployment completed',
    description: 'Successfully deployed v2.3.1 to production cluster',
    timestamp: '2 hours ago',
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
  {
    id: 2,
    type: 'success',
    title: 'Pod restarted',
    description: 'Pod "api-service-pod-1" restarted successfully after crash',
    timestamp: '3 hours ago',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 3,
    type: 'success',
    title: 'Health check passed',
    description: 'All health checks passed for deployment "frontend-web-app"',
    timestamp: '4 hours ago',
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
  {
    id: 4,
    type: 'warning',
    title: 'Rolling update finished',
    description: 'Rolling update completed for "worker-queue" with 0 errors',
    timestamp: '5 hours ago',
    icon: <AlertCircle className="w-5 h-5" />,
  },
  {
    id: 5,
    type: 'success',
    title: 'Configuration updated',
    description: 'ConfigMap updated for database-sync job',
    timestamp: '6 hours ago',
    icon: <GitBranch className="w-5 h-5" />,
  },
  {
    id: 6,
    type: 'info',
    title: 'Node maintenance scheduled',
    description: 'Scheduled maintenance on node "worker-03" at 2AM UTC',
    timestamp: '8 hours ago',
    icon: <AlertCircle className="w-5 h-5" />,
  },
];

function getActivityColor(type: Activity['type']) {
  switch (type) {
    case 'success':
      return 'text-green-400';
    case 'warning':
      return 'text-yellow-400';
    case 'error':
      return 'text-red-400';
    case 'info':
      return 'text-blue-400';
    default:
      return 'text-gray-400';
  }
}

export default function ActivityFeed() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Activity Feed</h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4 pb-4 border-b border-border/50 last:border-b-0 last:pb-0">
            {/* Icon */}
            <div className={`flex-shrink-0 ${getActivityColor(activity.type)}`}>{activity.icon}</div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground">{activity.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border/50">
        <button className="text-accent hover:text-accent/80 transition-colors text-sm font-medium">
          View all events
        </button>
      </div>
    </div>
  );
}
