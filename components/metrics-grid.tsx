import { Package, Heart, Clock, Cpu, MemoryStick, Radio } from 'lucide-react';

interface Metric {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  color: string;
}

const metrics: Metric[] = [
  {
    icon: <Package className="w-5 h-5" />,
    label: 'Running Pods',
    value: '24',
    unit: 'active',
    color: 'text-blue-400',
  },
  {
    icon: <Heart className="w-5 h-5" />,
    label: 'Healthy Deployments',
    value: '12',
    unit: 'of 12',
    color: 'text-green-400',
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: 'Cluster Uptime',
    value: '99.98%',
    unit: 'this month',
    color: 'text-purple-400',
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    label: 'CPU Usage',
    value: '62%',
    unit: 'of capacity',
    color: 'text-orange-400',
  },
  {
    icon: <MemoryStick className="w-5 h-5" />,
    label: 'Memory Usage',
    value: '48%',
    unit: 'of capacity',
    color: 'text-cyan-400',
  },
  {
    icon: <Radio className="w-5 h-5" />,
    label: 'Active Services',
    value: '8',
    unit: 'services',
    color: 'text-pink-400',
  },
];

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:border-accent/50 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <span className={`${metric.color}`}>{metric.icon}</span>
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
