'use client';

import React from 'react';
import AgentInterface from '@/components/Agents/AgentInterface';
import { ShieldCheck, AlertCircle, TrendingUp, Target } from 'lucide-react';

export default function AccountabilityPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-rose-500 font-mono text-xs uppercase tracking-widest">
          <ShieldCheck className="w-3 h-3" />
          Neural Accountability
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Execution Assistant</h1>
        <p className="text-zinc-400">Zero fluff. High standards. Stay consistent or get called out.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-rose-500 mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Slippage Alert
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              "You've missed your outreach goal for 2 consecutive days. At this rate, your 30-day target for Sakinah.co is at risk."
            </p>
            <div className="h-1.5 w-full bg-zinc-900 rounded-full mb-2">
              <div className="h-full bg-rose-500 rounded-full w-2/3" />
            </div>
            <p className="text-[10px] text-zinc-500 font-mono">Consitency Score: 68%</p>
          </div>

          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6">
            <h3 className="text-sm font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-rose-500" />
              Hard Targets
            </h3>
            <div className="space-y-3">
              {[
                { t: "Post 1 Reel", s: "todo" },
                { t: "50 LinkedIn DMs", s: "todo" },
                { t: "1 Deep Work Session", s: "done" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/50 border border-zinc-800">
                  <span className="text-[10px] text-zinc-300">{item.t}</span>
                  <div className={`w-2 h-2 rounded-full ${item.s === 'done' ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <AgentInterface 
            agentName="Enforcer Agent" 
            agentRole="Accountability & Focus"
            placeholder="I'm feeling overwhelmed today..."
            initialMessage="I'm here to keep you on track. No excuses. I've noticed a slowdown in your technical implementation. Why did you only complete 1 task yesterday? Let's fix the schedule for today."
          />
        </div>
      </div>
    </div>
  );
}
