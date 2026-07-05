'use client';

import { CheckCircle2, AlertCircle, GitBranch, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { DashboardActivity } from '@/lib/dashboard-types';

function getActivityColor(type: DashboardActivity['type']) {
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

function getActivityIcon(type: DashboardActivity['type']) {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="w-5 h-5" />;
    case 'warning':
      return <AlertCircle className="w-5 h-5" />;
    case 'error':
      return <AlertCircle className="w-5 h-5" />;
    case 'info':
      return <GitBranch className="w-5 h-5" />;
    default:
      return <Zap className="w-5 h-5" />;
  }
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<DashboardActivity[]>([]);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((response) => response.json())
      .then((data) => {
        setActivities(data.activities ?? []);
      })
      .catch(() => setActivities([]));
  }, []);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Activity Feed</h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4 pb-4 border-b border-border/50 last:border-b-0 last:pb-0">
            {/* Icon */}
            <div className={`shrink-0 ${getActivityColor(activity.type)}`}>{getActivityIcon(activity.type)}</div>

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
