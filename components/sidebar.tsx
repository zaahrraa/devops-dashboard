'use client';

import { useState } from 'react';
import { LayoutDashboard, Package, GitBranch, Zap, Activity, Settings } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', active: true },
  { icon: <Package className="w-5 h-5" />, label: 'Pods', active: false },
  { icon: <GitBranch className="w-5 h-5" />, label: 'Deployments', active: false },
  { icon: <Zap className="w-5 h-5" />, label: 'Services', active: false },
  { icon: <Activity className="w-5 h-5" />, label: 'Monitoring', active: false },
  { icon: <Settings className="w-5 h-5" />, label: 'Settings', active: false },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-lg">K</span>
          </div>
          <span className="text-sidebar-foreground font-bold text-lg">K8S Monitor</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveItem(index)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeItem === index
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/60">Kubernetes v1.28.0</p>
      </div>
    </aside>
  );
}
