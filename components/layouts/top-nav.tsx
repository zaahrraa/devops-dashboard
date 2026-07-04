'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Bell, Clock, User } from 'lucide-react';

export const TopNav: React.FC = () => {
  const { currentUser } = useAuth();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-card border-b border-border flex items-center justify-between px-6 py-4 h-16">
      {/* Left side - Title */}
      <div>
        <h1 className="text-lg font-semibold text-foreground">
          {currentUser?.name ? `Welcome, ${currentUser.name}` : 'DevOps Dashboard'}
        </h1>
      </div>

      {/* Right side - Time and user info */}
      <div className="flex items-center gap-6">
        {/* Time */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{currentTime}</span>
        </div>

        {/* Notifications */}
        <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-3 pl-6 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-foreground">{currentUser?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{currentUser?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
