'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  User, 
  Key, 
  Database, 
  Shield, 
  Save, 
  Loader2,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState<any>({
    full_name: '',
    agency_name: '',
    niche: '',
    learning_stage: '',
  });

  useEffect(() => {
    async function fetchProfile() {
      if (!supabase) return;
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', '00000000-0000-0000-0000-000000000000')
        .single();
      
      if (data) setProfile(data);
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: '00000000-0000-0000-0000-000000000000',
        ...profile,
        updated_at: new Date().toISOString(),
      });
    
    setSaving(false);
    if (!error) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <Settings className="w-8 h-8 text-zinc-500" />
          System Settings
        </h1>
        <p className="text-zinc-400">Configure your Sakinah OS neural link and business profile.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Business Profile */}
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8 space-y-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-500" />
              Founder Profile
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  value={profile.full_name}
                  onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Agency Name</label>
                <input 
                  type="text" 
                  value={profile.agency_name}
                  onChange={(e) => setProfile({...profile, agency_name: e.target.value})}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Target Niche</label>
                <input 
                  type="text" 
                  value={profile.niche}
                  onChange={(e) => setProfile({...profile, niche: e.target.value})}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Learning Stage</label>
                <select 
                  value={profile.learning_stage}
                  onChange={(e) => setProfile({...profile, learning_stage: e.target.value})}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 focus:outline-none focus:border-emerald-500 transition-all text-sm appearance-none"
                >
                  <option>Beginner</option>
                  <option>Foundation Phase (Day 3)</option>
                  <option>Intermediate</option>
                  <option>Advanced Operator</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-black font-bold rounded-xl transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {success ? 'Profile Updated' : 'Save Profile'}
                {success && <CheckCircle2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Infrastructure */}
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8 space-y-6 opacity-50 pointer-events-none">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-500">
              <Key className="w-5 h-5" />
              API Infrastructure
            </h2>
            <p className="text-xs text-zinc-500 italic">Connected via local .env.local file. External management coming in v1.1.0</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-500" />
              Brain Sync
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Database Status:</span>
                <span className="text-emerald-500 font-mono">ONLINE</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Neural Latency:</span>
                <span className="text-emerald-500 font-mono">24ms</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Encryption:</span>
                <span className="text-emerald-500 font-mono">AES-256</span>
              </div>
            </div>
          </div>

          <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-rose-500 uppercase tracking-widest flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Danger Zone
            </h3>
            <p className="text-[10px] text-zinc-500 leading-relaxed">
              Resetting your OS will wipe all learning milestones, content history, and founder context. This cannot be undone.
            </p>
            <button className="w-full py-2 bg-rose-900/20 hover:bg-rose-900/40 text-rose-500 text-xs font-bold rounded-lg border border-rose-900/50 transition-all flex items-center justify-center gap-2">
              <Trash2 className="w-4 h-4" />
              Wipe OS Brain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
