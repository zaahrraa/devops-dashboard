import { CheckCircle2, AlertCircle } from 'lucide-react';

interface Deployment {
  version: string;
  lastDeployment: string;
  environment: string;
  health: 'Healthy' | 'Warning' | 'Critical';
}

const deployment: Deployment = {
  version: 'v2.3.1',
  lastDeployment: '2 hours ago',
  environment: 'Production',
  health: 'Healthy',
};

export default function DeploymentsSection() {
  return (
    <div className="space-y-6">
      {/* Current Deployment Card */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Current Deployment</h3>

        <div className="space-y-4">
          {/* Version */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Current Version</p>
            <p className="text-2xl font-bold text-accent">{deployment.version}</p>
          </div>

          {/* Last Deployment */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-1">Last Deployment</p>
            <p className="text-sm text-foreground">{deployment.lastDeployment}</p>
          </div>

          {/* Environment */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-1">Environment</p>
            <p className="text-sm text-foreground">{deployment.environment}</p>
          </div>

          {/* Health Status */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Health Status</p>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold text-green-400">{deployment.health}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>

        <div className="space-y-2">
          <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
            Deploy New Version
          </button>
          <button className="w-full px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium text-sm">
            Rollback
          </button>
          <button className="w-full px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium text-sm">
            Scale Replicas
          </button>
        </div>
      </div>
    </div>
  );
}
