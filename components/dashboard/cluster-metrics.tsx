'use client';

import { useState, useEffect } from 'react';
import { MetricsCard } from './metrics-card';
import { generateMockMetrics, type Metrics } from '@/lib/mock-data';
import {
  Package,
  Cpu,
  HardDrive,
  Zap,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

export const ClusterMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    // Generate initial metrics
    setMetrics(generateMockMetrics());

    // Update metrics every 3 seconds
    const interval = setInterval(() => {
      setMetrics(generateMockMetrics());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!metrics) {
    return <div>Loading metrics...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Cluster Metrics</h2>
        <p className="text-muted-foreground">Real-time infrastructure monitoring</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricsCard
          label="Active Pods"
          value={metrics.activePods}
          icon={Package}
          trend="stable"
          trendValue="0"
          color="blue"
        />
        <MetricsCard
          label="CPU Usage"
          value={metrics.cpuUsage}
          unit="%"
          icon={Cpu}
          trend="down"
          trendValue="5%"
          color="orange"
        />
        <MetricsCard
          label="Memory Usage"
          value={metrics.memoryUsage}
          unit="%"
          icon={HardDrive}
          trend="up"
          trendValue="2%"
          color="purple"
        />
        <MetricsCard
          label="Network I/O"
          value={metrics.networkIO.toFixed(2)}
          unit="GB/s"
          icon={Zap}
          trend="stable"
          trendValue="0"
          color="cyan"
        />
        <MetricsCard
          label="Uptime"
          value={metrics.uptime}
          unit="%"
          icon={TrendingUp}
          trend="stable"
          trendValue="0"
          color="green"
        />
        <MetricsCard
          label="Error Rate"
          value={metrics.errorRate.toFixed(3)}
          unit="%"
          icon={AlertCircle}
          trend="down"
          trendValue="0.01%"
          color="pink"
        />
      </div>
    </div>
  );
};
