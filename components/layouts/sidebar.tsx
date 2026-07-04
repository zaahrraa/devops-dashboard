'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  LayoutDashboard,
  Shield,
  Activity,
  Settings,
  LogOut,
  Zap,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { logout, userRole, currentUser } = useAuth();

  const navItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'viewer'],
    },
    {
      label: 'Admin Portal',
      href: '/admin',
      icon: Shield,
      roles: ['admin'],
    },
    {
      label: 'Monitoring',
      href: '/monitoring',
      icon: Activity,
      roles: ['admin', 'viewer'],
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: Settings,
      roles: ['admin', 'viewer'],
    },
  ];

  const filteredItems = navItems.filter((item) => item.roles.includes(userRole || ''));

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sidebar-primary/10 rounded-lg">
            <Zap className="w-5 h-5 text-sidebar-primary" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">DevOps</h2>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="space-y-2">
          <p className="text-sm font-medium text-sidebar-foreground">{currentUser?.name}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-sidebar-accent rounded text-sidebar-accent-foreground capitalize">
              {userRole}
            </span>
            {currentUser?.status === 'active' && (
              <span className="text-xs px-2 py-1 bg-green-500/20 rounded text-green-400">
                Active
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors text-sm font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
