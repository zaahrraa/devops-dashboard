import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'cyan' | 'pink';
}

const colorClasses = {
  blue: 'text-blue-400',
  green: 'text-green-400',
  orange: 'text-orange-400',
  purple: 'text-purple-400',
  cyan: 'text-cyan-400',
  pink: 'text-pink-400',
};

const bgColorClasses = {
  blue: 'bg-blue-500/10',
  green: 'bg-green-500/10',
  orange: 'bg-orange-500/10',
  purple: 'bg-purple-500/10',
  cyan: 'bg-cyan-500/10',
  pink: 'bg-pink-500/10',
};

export const MetricsCard: React.FC<MetricsCardProps> = ({
  label,
  value,
  unit,
  icon: Icon,
  trend,
  trendValue,
  color = 'blue',
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      {/* Header with icon */}
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
        <div className={`p-2 rounded-lg ${bgColorClasses[color]}`}>
          <Icon className={`w-5 h-5 ${colorClasses[color]}`} />
        </div>
      </div>

      {/* Value */}
      <div>
        <p className="text-3xl font-bold text-foreground">
          {value}
          {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
        </p>
      </div>

      {/* Trend */}
      {trend && trendValue && (
        <div className="text-xs">
          {trend === 'up' && <span className="text-green-400">↑ {trendValue} from last hour</span>}
          {trend === 'down' && <span className="text-red-400">↓ {trendValue} from last hour</span>}
          {trend === 'stable' && <span className="text-muted-foreground">→ Stable</span>}
        </div>
      )}
    </div>
  );
};
