import { Bell, Settings } from 'lucide-react';

interface HeaderProps {
  currentTime: string;
}

export default function Header({ currentTime }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">DevOps Dashboard</h1>
        <div className="flex items-center gap-3 mt-2">
          <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
            Production
          </span>
          <span className="text-sm text-muted-foreground">{currentTime}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
        </button>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </header>
  );
}
