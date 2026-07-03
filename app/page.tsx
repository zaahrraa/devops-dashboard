'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import MetricsGrid from '@/components/metrics-grid';
import KubernetesSection from '@/components/kubernetes-section';
import DeploymentsSection from '@/components/deployments-section';
import ActivityFeed from '@/components/activity-feed';

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentTime={currentTime} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Metrics Grid */}
            <MetricsGrid />

            {/* Main Content Grid */}
            <div className="grid grid-cols-3 gap-6">
              {/* Kubernetes Section - Takes 2 columns */}
              <div className="col-span-2">
                <KubernetesSection />
              </div>

              {/* Deployments Section - Takes 1 column */}
              <div className="col-span-1">
                <DeploymentsSection />
              </div>
            </div>

            {/* Activity Feed - Full width */}
            <ActivityFeed />
          </div>
        </main>
      </div>
    </div>
  );
}
