'use client';

import React from 'react';
import AgentInterface from '@/components/Agents/AgentInterface';
import { Search, Globe, TrendingUp, Users } from 'lucide-react';

export default function ResearchPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-orange-500 font-mono text-xs uppercase tracking-widest">
          <Search className="w-3 h-3" />
          Market Intelligence
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Research Agent</h1>
        <p className="text-zinc-400">Deep dives into recruitment agency pain points and B2B trends.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <AgentInterface 
            agentName="Research Agent" 
            agentRole="Market Analysis"
            placeholder="Search for recent trends in UK recruitment sector..."
            initialMessage="I've been monitoring the B2B recruitment space. I found 3 high-leverage opportunities in the mid-size agency sector regarding AI implementation. Would you like a summary of their biggest lead gen bottlenecks?"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6 space-y-6">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              Live Insights
            </h3>
            
            <div className="space-y-4">
              {[
                { label: "Agency Pain Point", text: "Ghosting after initial outreach", intensity: "high" },
                { label: "Content Angle", text: "Efficiency of AI vs Virtual Assistants", intensity: "medium" },
                { label: "Search Volume", text: "'AI for Recruitment' +22% MoM", intensity: "high" }
              ].map((item, i) => (
                <div key={i} className="p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">{item.label}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      item.intensity === 'high' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {item.intensity}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-200">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <h4 className="text-xs font-bold text-zinc-400 mb-3 flex items-center gap-2 uppercase tracking-widest">
                <Users className="w-3 h-3" />
                Target Personas
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Founder", "HR Director", "Growth Manager", "Talent Lead"].map((p) => (
                  <span key={p} className="text-[10px] px-2 py-1 bg-zinc-800 text-zinc-400 rounded-md">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6 text-center">
            <Globe className="w-8 h-8 text-orange-500/50 mx-auto mb-3" />
            <p className="text-xs text-zinc-500 mb-4">Connected to 15+ real-time news sources and LinkedIn API via Agent Core.</p>
            <button className="w-full py-2 bg-zinc-900 border border-zinc-800 text-white text-xs font-medium rounded-lg hover:bg-zinc-800 transition-all">
              Manage Sources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
