'use client';

import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  Award,
  Zap,
  Calendar
} from 'lucide-react';

const MetricCard = ({ label, value, change, trend, icon: Icon }: any) => (
  <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
        <Icon className="w-5 h-5 text-emerald-500" />
      </div>
      <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="text-zinc-500 text-xs font-medium uppercase tracking-wider">{label}</h3>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  </div>
);

export default function ProgressPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-purple-500 font-mono text-xs uppercase tracking-widest">
            <BarChart3 className="w-3 h-3" />
            Performance Analytics
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Progress Tracker</h1>
          <p className="text-zinc-400">Data-driven insights into your growth and consistency.</p>
        </div>

        <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800">
          {['7D', '30D', '90D', 'ALL'].map((p) => (
            <button key={p} className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${p === '30D' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}>
              {p}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard label="Instagram Followers" value="2,482" change="+12.4%" trend="up" icon={TrendingUp} />
        <MetricCard label="Reels Engagement" value="8.2%" change="+2.1%" trend="up" icon={Zap} />
        <MetricCard label="Outreach Volume" value="142" change="-5.2%" trend="down" icon={Target} />
        <MetricCard label="Milestones Met" value="14/20" change="+3" trend="up" icon={Award} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-500" />
              Activity Heatmap
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-zinc-800 rounded-sm" />
                <span className="text-[10px] text-zinc-500">None</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
                <span className="text-[10px] text-zinc-500">Max</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 h-32 items-end">
            {Array.from({ length: 30 }).map((_, i) => {
              const height = Math.random() * 100;
              return (
                <div 
                  key={i} 
                  className="flex-1 bg-emerald-500/20 hover:bg-emerald-500 rounded-t-sm transition-all cursor-help group relative"
                  style={{ height: `${Math.max(10, height)}%` }}
                >
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold">
                    Day {i+1}: 4 Tasks Done
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-zinc-600 font-mono">
            <span>MAY 01</span>
            <span>MAY 15</span>
            <span>MAY 30</span>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8 space-y-6">
          <h3 className="font-bold">Next Milestones</h3>
          <div className="space-y-4">
            {[
              { t: "100 Automated Emails/Day", p: 80 },
              { t: "First 5k Followers", p: 48 },
              { t: "30-Day Content Streak", p: 40 },
              { t: "AI Lead Gen Course V1", p: 15 }
            ].map((m, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">{m.t}</span>
                  <span className="text-zinc-100 font-bold">{m.p}%</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${m.p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
