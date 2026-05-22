'use client';

import React from 'react';
import AgentInterface from '@/components/Agents/AgentInterface';
import { Sparkles, PenTool, Calendar, Library } from 'lucide-react';

export default function ContentPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            Strategic Intelligence
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Content Strategist</h1>
          <p className="text-zinc-400">Scale your "Building in Public" journey with cinematic storytelling.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm hover:bg-zinc-800 transition-all">
            <Calendar className="w-4 h-4" />
            Calendar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-lg text-sm font-medium hover:bg-emerald-500 transition-all text-black">
            <Library className="w-4 h-4" />
            Swipe File
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <AgentInterface 
            agentName="Strategist Agent" 
            agentRole="Content Creation & Growth"
            placeholder="Ask for a reel hook, caption structure, or content pillars..."
            initialMessage="Welcome back. I've reviewed your last 3 Reels for Sakinah.co. Your engagement is up 12%, but your CTA completion is lagging. Let's fix that today. What are we building?"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6">
            <h3 className="text-sm font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <PenTool className="w-4 h-4 text-emerald-500" />
              Quick Suggestions
            </h3>
            <div className="space-y-3">
              {[
                "Generate 5 hooks for B2B Recruitment",
                "Cinematic transition ideas for faceless reels",
                "AIDA structure for agency outreach",
                "Instagram SEO keywords for Lead Gen"
              ].map((text, i) => (
                <button 
                  key={i}
                  className="w-full text-left p-3 text-xs text-zinc-400 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-emerald-500/30 hover:text-white transition-all"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-zinc-100 mb-4">Style Guide</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Tone:</span>
                <span className="text-emerald-500 font-medium">Cinematic / Direct</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Niche:</span>
                <span className="text-emerald-500 font-medium">AI Recruitment</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Platform:</span>
                <span className="text-emerald-500 font-medium">Instagram Reels</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
