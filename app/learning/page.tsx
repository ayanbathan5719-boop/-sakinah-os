'use client';

import React from 'react';
import AgentInterface from '@/components/Agents/AgentInterface';
import { BookOpen, GraduationCap, Map, CheckCircle2 } from 'lucide-react';

export default function LearningPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-blue-500 font-mono text-xs uppercase tracking-widest">
          <BookOpen className="w-3 h-3" />
          Skill Acquisition
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Learning Coach</h1>
        <p className="text-zinc-400">Master AI Lead Gen step-by-step. Current focus: Automated Data Scrapers.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6">
            <h3 className="text-sm font-bold text-zinc-100 mb-6 flex items-center gap-2">
              <Map className="w-4 h-4 text-blue-500" />
              Learning Roadmap
            </h3>
            <div className="space-y-6">
              {[
                { title: "Foundations of AI B2B", status: "completed" },
                { title: "Data Scraping & Cleansing", status: "current" },
                { title: "AI Personalized Outreach", status: "locked" },
                { title: "CRM Automation", status: "locked" },
                { title: "Scaling to 10k Leads/Mo", status: "locked" }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 relative">
                  {i !== 4 && <div className="absolute left-[11px] top-6 w-0.5 h-6 bg-zinc-800" />}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                    item.status === 'completed' ? 'bg-emerald-500' : 
                    item.status === 'current' ? 'bg-blue-500 animate-pulse' : 'bg-zinc-800'
                  }`}>
                    {item.status === 'completed' ? <CheckCircle2 className="w-3 h-3 text-black" /> : 
                     <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'current' ? 'bg-white' : 'bg-zinc-600'}`} />}
                  </div>
                  <div className="space-y-1">
                    <p className={`text-xs font-medium ${item.status === 'locked' ? 'text-zinc-600' : 'text-zinc-200'}`}>
                      {item.title}
                    </p>
                    {item.status === 'current' && <span className="text-[10px] text-blue-500 uppercase font-bold tracking-tighter">Active Now</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-blue-500 mb-2">Today's Lesson</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              "How to use Clay to enrich LinkedIn profiles with GPT-4o for hyper-personalized messaging."
            </p>
            <button className="w-full py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-500 transition-all">
              Start Session
            </button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <AgentInterface 
            agentName="Learning Agent" 
            agentRole="Educational Mentor"
            placeholder="Explain Clay enrichment like I'm a beginner..."
            initialMessage="Ready to level up? Today we are moving from basic scraping to AI enrichment. Don't worry about the technical jargon—I'll simplify it. What concept from yesterday's homework was the most confusing?"
          />
        </div>
      </div>
    </div>
  );
}
