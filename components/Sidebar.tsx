'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  PenTool, 
  BookOpen, 
  Search, 
  BarChart3, 
  Settings, 
  Zap,
  CheckCircle2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Zap, label: 'AI Workspace', href: '/workspace' },
  { icon: PenTool, label: 'Content Strategist', href: '/content' },
  { icon: BookOpen, label: 'Learning Coach', href: '/learning' },
  { icon: Search, label: 'Research Agent', href: '/research' },
  { icon: BarChart3, label: 'Progress Tracker', href: '/progress' },
  { icon: CheckCircle2, label: 'Accountability', href: '/accountability' },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
          <Zap className="text-black w-5 h-5 fill-current" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Sakinah OS</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-emerald-500/10 text-emerald-500" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                isActive ? "text-emerald-500" : "text-zinc-400 group-hover:text-white"
              )} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#1a1a1a] space-y-2">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-zinc-400 hover:text-white hover:bg-zinc-800/50",
            pathname === '/settings' && "bg-zinc-800 text-white"
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
