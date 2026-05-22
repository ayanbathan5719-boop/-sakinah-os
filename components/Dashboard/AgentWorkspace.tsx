'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  BrainCircuit, 
  Zap, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Search, 
  ShieldAlert,
  Loader2,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

const AGENTS = [
  { id: 'COACH', name: 'Strategic Coach', icon: BrainCircuit, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'STRATEGIST', name: 'Content Strategist', icon: Sparkles, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { id: 'LEARNING', name: 'Learning Coach', icon: BookOpen, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { id: 'RESEARCH', name: 'Research Agent', icon: Search, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { id: 'ENFORCER', name: 'Execution Enforcer', icon: ShieldAlert, color: 'text-rose-400', bg: 'bg-rose-400/10' },
];

export default function AgentWorkspace() {
  const [activeAgent, setActiveAgent] = useState(AGENTS[0]);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchChatHistory();
    fetchUserContext();
  }, [activeAgent]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function fetchChatHistory() {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('agent_type', activeAgent.id)
      .order('created_at', { ascending: true })
      .limit(50);
    
    if (data) setMessages(data);
  }

  async function fetchUserContext() {
    // In a real app, get from auth. Using dummy ID for now.
    const userId = '00000000-0000-0000-0000-000000000000';
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) setContext(data);
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { 
      role: 'user', 
      content: input, 
      agent_type: activeAgent.id,
      user_id: '00000000-0000-0000-0000-000000000000' 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          agentType: activeAgent.id,
          history: messages.slice(-5).map(m => ({ role: m.role, content: m.content })),
          userId: '00000000-0000-0000-0000-000000000000'
        })
      });

      const data = await response.json();
      const aiMessage = { 
        role: 'assistant', 
        content: data.response, 
        agent_type: activeAgent.id,
        user_id: '00000000-0000-0000-0000-000000000000'
      };

      setMessages(prev => [...prev, aiMessage]);

      // Save to Supabase (User + AI)
      await supabase.from('chat_messages').insert([userMessage, aiMessage]);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4">
      {/* Left Sidebar: Agents */}
      <div className="w-64 flex flex-col gap-2">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2 mb-2">Command Staff</h3>
        {AGENTS.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setActiveAgent(agent)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              activeAgent.id === agent.id 
                ? `${agent.bg} border border-${agent.color}/20` 
                : 'hover:bg-zinc-900 border border-transparent'
            }`}
          >
            <agent.icon className={`w-5 h-5 ${activeAgent.id === agent.id ? agent.color : 'text-zinc-500'}`} />
            <span className={`text-sm font-medium ${activeAgent.id === agent.id ? 'text-white' : 'text-zinc-400'}`}>
              {agent.name}
            </span>
          </button>
        ))}
      </div>

      {/* Main Panel: Chat */}
      <div className="flex-1 flex flex-col bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden relative">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#1a1a1a] flex items-center justify-between bg-zinc-900/30">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${activeAgent.bg}`}>
              <activeAgent.icon className={`w-5 h-5 ${activeAgent.color}`} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">{activeAgent.name}</h2>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Mission Active</p>
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800"
        >
          {messages.length === 0 && !isLoading && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <MessageSquare className="w-12 h-12 text-zinc-700" />
              <p className="text-sm text-zinc-500 max-w-xs">
                No tactical logs found. Initialize conversation with {activeAgent.name}.
              </p>
            </div>
          )}
          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${
                  msg.role === 'user' ? 'bg-zinc-800 border-zinc-700' : `${activeAgent.bg} border-${activeAgent.color}/20`
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-zinc-300" /> : <activeAgent.icon className={`w-4 h-4 ${activeAgent.color}`} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : 'bg-zinc-900/80 text-zinc-200 border border-zinc-800/50 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 items-center text-zinc-500 text-sm italic">
                <Loader2 className="w-4 h-4 animate-spin" />
                {activeAgent.name} is formulating response...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-zinc-900/30 border-t border-[#1a1a1a]">
          <form onSubmit={handleSendMessage} className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Coordinate with ${activeAgent.name}...`}
              className="w-full bg-black border border-zinc-800 rounded-xl py-4 pl-5 pr-14 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-2 w-10 h-10 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-black rounded-lg flex items-center justify-center transition-all shadow-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Right Panel: Context */}
      <div className="w-80 flex flex-col gap-6">
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6 space-y-6">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Neural Context</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">Founder</span>
              <span className="text-xs text-white font-medium">{context?.full_name || 'Unidentified'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">Agency</span>
              <span className="text-xs text-white font-medium">{context?.agency_name || 'Sakinah.co'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">Mission Day</span>
              <span className="text-xs text-emerald-500 font-bold">12 / 30</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1a1a1a] space-y-3">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Objectives</p>
            {context?.goals?.map((goal: string, i: number) => (
              <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                <Target className="w-3 h-3 text-emerald-500" />
                {goal}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#1a1a1a] space-y-3">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Niche Intel</p>
            <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <p className="text-[11px] text-emerald-400 font-bold mb-1">{context?.niche}</p>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                Focus on AI automation for candidate screening and lead gen.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Vital Signs</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>Consistency</span>
                <span className="text-emerald-500">92%</span>
              </div>
              <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[92%]" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>Skill Level</span>
                <span className="text-purple-500">{context?.learning_stage}</span>
              </div>
              <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[30%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
