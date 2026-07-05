'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { DashboardPod } from '@/lib/dashboard-types';

function getStatusColor(status: DashboardPod['status']) {
  switch (status) {
    case 'Running':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Pending':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'CrashLoopBackOff':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'Completed':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}

export default function KubernetesSection() {
  const [pods, setPods] = useState<DashboardPod[]>([]);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((response) => response.json())
      .then((data) => {
        setPods(data.pods ?? []);
      })
      .catch(() => setPods([]));
  }, []);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Kubernetes Pods</h2>
        <button className="flex items-center gap-2 px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <span>Namespace</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Pod Name</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Namespace</th>
              <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Restarts</th>
            </tr>
          </thead>
          <tbody>
            {pods.map((pod, index) => (
              <tr
                key={index}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="py-3 px-4 text-foreground font-medium">{pod.name}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(
                      pod.status
                    )}`}
                  >
                    {pod.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{pod.namespace}</td>
                <td className="py-3 px-4 text-right">
                  <span
                    className={`font-medium ${
                      pod.restarts > 0 ? 'text-orange-400' : 'text-green-400'
                    }`}
                  >
                    {pod.restarts}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
        <span>Showing {pods.length} pods</span>
        <button className="text-accent hover:text-accent/80 transition-colors">Load More</button>
      </div>
    </div>
  );
}
