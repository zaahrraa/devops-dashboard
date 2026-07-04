'use client';

import { useState, useEffect } from 'react';
import { mockActivityEvents, type ActivityEvent } from '@/lib/mock-data';
import {
  CheckCircle,
  AlertCircle,
  InfoIcon,
  XCircle,
  GitBranch,
  Zap,
  RotateCw,
  Settings,
} from 'lucide-react';

const eventIcons: Record<string, React.ReactNode> = {
  deployment: <GitBranch className="w-4 h-4" />,
  pod_restart: <RotateCw className="w-4 h-4" />,
  health_check: <CheckCircle className="w-4 h-4" />,
  config_change: <Settings className="w-4 h-4" />,
  approval: <CheckCircle className="w-4 h-4" />,
  rejection: <XCircle className="w-4 h-4" />,
};

const statusColors: Record<string, string> = {
  success: 'text-green-400 bg-green-500/10',
  warning: 'text-yellow-400 bg-yellow-500/10',
  error: 'text-red-400 bg-red-500/10',
  info: 'text-blue-400 bg-blue-500/10',
};

const formatTime = (date: Date): string => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export const ActivityFeed: React.FC = () => {
  const [events, setEvents] = useState<ActivityEvent[]>(mockActivityEvents);

  useEffect(() => {
    // Update timestamps every minute
    const interval = setInterval(() => {
      setEvents([...mockActivityEvents]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0">
            {/* Icon */}
            <div className={`p-2 rounded-lg flex-shrink-0 ${statusColors[event.status]}`}>
              {eventIcons[event.type] || <Zap className="w-4 h-4" />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-foreground">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0 whitespace-nowrap">
                  {formatTime(event.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
