'use client';

import React, { useEffect, useState } from 'react';
import { 
  Zap, 
  Target, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  BrainCircuit,
  Rocket,
  Loader2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const StatCard = ({ label, value, subtext, icon: Icon, color }: any) => (
  <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-300">
    <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg bg-zinc-900 border border-zinc-800`}>
        <Icon className="w-5 h-5 text-emerald-500" />
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="text-zinc-400 text-sm font-medium">{label}</h3>
      <div className="text-2xl font-bold text-white">{value}</div>
      <p className="text-zinc-500 text-xs">{subtext}</p>
    </div>
  </div>
);

const TaskItem = ({ title, type, completed }: any) => (
  <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-800/40 transition-all cursor-pointer group">
    <div className={`w-2 h-2 rounded-full ${
      type === 'content' ? 'bg-purple-500' : 
      type === 'learning' ? 'bg-blue-500' : 
      'bg-emerald-500'
    }`} />
    <span className="flex-1 text-sm text-zinc-300 group-hover:text-white transition-colors">{title}</span>
    <div className={`w-5 h-5 rounded border ${completed ? 'bg-emerald-500 border-emerald-500' : 'border-zinc-700'} flex items-center justify-center`}>
      {completed && <CheckCircle2 className="w-3 h-3 text-black" />}
    </div>
  </div>
);

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfile() {
      if (!supabase) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', '00000000-0000-0000-0000-000000000000')
        .single();

      if (data) setProfile(data);
      setLoading(false);
    }
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Good Morning, {profile?.full_name?.split(' ')[0] || 'Founder'}
        </h1>
        <p className="text-zinc-400">Day 3 of 30 • {profile?.agency_name || 'Sakinah.co'} Phase: Foundation</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          label="Challenge Day" 
          value="03/30" 
          subtext="Phase 1: Tool Setup" 
          icon={Clock} 
          color="bg-emerald-500"
        />
        <StatCard 
          label="Total Posts" 
          value="2" 
          subtext="Day 3 Reel in progress" 
          icon={Rocket} 
          color="bg-purple-500"
        />
        <StatCard 
          label="Learning Milestones" 
          value="2" 
          subtext="Next: Clay AI Enrichment" 
          icon={BrainCircuit} 
          color="bg-blue-500"
        />
        <StatCard 
          label="Budget Spent" 
          value="$0" 
          subtext="Goal: Stay Lean" 
          icon={TrendingUp} 
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-500" />
                Today's Core Focus
              </h2>
              <span className="text-xs bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full font-medium">High Leverage</span>
            </div>
            
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 border-l-4 border-l-emerald-500">
              <p className="text-lg text-zinc-100 font-medium">
                Export 50 Verified Recruitment Leads from Apollo.io and record Day 3 Reel.
              </p>
              <p className="text-zinc-500 mt-2 text-sm">
                Primary Goal: Technical validation + Documentary storytelling of "The Discovery".
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Strategic Tasks</h3>
              <div className="space-y-3">
                <TaskItem title="Learn Apollo filters for B2B Recruitment" type="learning" completed={true} />
                <TaskItem title="Export 50 verified leads to CSV" type="execution" />
                <TaskItem title="Document list building process in Notion" type="execution" />
                <TaskItem title="Record BandLab audio (+2 semitones)" type="content" />
                <TaskItem title="Post Day 3 Reel tagging Jordan Platten" type="content" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-emerald-500">
              <Zap className="w-5 h-5" />
              Mindset Insight
            </h2>
            <p className="text-zinc-300 italic leading-relaxed">
              "The magic you're looking for is in the work you're avoiding. Today's data export isn't just a task—it's the fuel for your first client campaign."
            </p>
            <div className="pt-2 text-xs text-zinc-500 font-medium">— Mentor Agent</div>
          </div>

          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">Mission Intel</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Niche:</span>
                <span className="text-emerald-500 font-medium">Recruitment Agencies</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">IG Handle:</span>
                <span className="text-emerald-500 font-medium">@iqra.leadgen</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Budget:</span>
                <span className="text-emerald-500 font-medium">$0 (Free Stack)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
