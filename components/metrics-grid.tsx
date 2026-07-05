'use client';

import { useEffect, useState } from 'react';
import { Package, Heart, Clock, Cpu, MemoryStick, Radio } from 'lucide-react';
import type { DashboardMetric } from '@/lib/dashboard-types';

const iconMap = {
  RunningPods: <Package className="w-5 h-5" />,
  HealthyDeployments: <Heart className="w-5 h-5" />,
  ClusterUptime: <Clock className="w-5 h-5" />,
  CPUUsage: <Cpu className="w-5 h-5" />,
  MemoryUsage: <MemoryStick className="w-5 h-5" />,
  ActiveServices: <Radio className="w-5 h-5" />,
};

function getMetricIcon(label: string) {
  switch (label) {
    case 'Running Pods':
      return iconMap.RunningPods;
    case 'Healthy Deployments':
      return iconMap.HealthyDeployments;
    case 'Cluster Uptime':
      return iconMap.ClusterUptime;
    case 'CPU Usage':
      return iconMap.CPUUsage;
    case 'Memory Usage':
      return iconMap.MemoryUsage;
    case 'Active Services':
      return iconMap.ActiveServices;
    default:
      return <Package className="w-5 h-5" />;
  }
}

export default function MetricsGrid() {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((response) => response.json())
      .then((data) => {
        setMetrics(data.metrics ?? []);
      })
      .catch(() => setMetrics([]));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={`${metric.label}-${index}`}
          className="bg-card border border-border rounded-lg p-4 hover:border-accent/50 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <span className={metric.color}>{getMetricIcon(metric.label)}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{metric.value}</span>
            <span className="text-xs text-muted-foreground">{metric.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
