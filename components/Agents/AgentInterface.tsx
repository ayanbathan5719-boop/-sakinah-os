'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AgentInterfaceProps {
  agentName: string;
  agentRole: string;
  placeholder?: string;
  initialMessage?: string;
}

const AgentInterface = ({ agentName, agentRole, placeholder, initialMessage }: AgentInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: initialMessage || `Hello! I'm your ${agentName}. How can I help you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input, 
          agentType: agentName.split(' ')[0].toUpperCase(), // Maps "Social Media" to "STRATEGIST" or similar
          history: messages.slice(-5).map(m => ({ role: m.role, content: m.content }))
        }),
      });

      const data = await response.json();
      
      const assistantMsg: Message = { 
        id: Date.now().toString(), 
        role: 'assistant', 
        content: data.response || "I'm sorry, I encountered an error."
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-[#1a1a1a] bg-zinc-900/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
            <Bot className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">{agentName}</h2>
            <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-semibold">{agentRole}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] text-zinc-500 font-mono uppercase">System Online</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${
                msg.role === 'user' ? 'bg-zinc-800 border-zinc-700' : 'bg-emerald-500/10 border-emerald-500/20'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-zinc-300" /> : <Sparkles className="w-4 h-4 text-emerald-500" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-zinc-900/80 text-zinc-200 border border-zinc-800/50 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 items-center text-zinc-500 text-sm italic">
              <Loader2 className="w-4 h-4 animate-spin" />
              Agent is thinking...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-zinc-900/30 border-t border-[#1a1a1a]">
        <form onSubmit={handleSend} className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder || "Type your command..."}
            className="w-full bg-black border border-zinc-800 rounded-xl py-4 pl-5 pr-14 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all text-sm placeholder:text-zinc-600"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 w-10 h-10 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-black rounded-lg flex items-center justify-center transition-all shadow-lg"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-center text-zinc-600 mt-3 tracking-wide">
          Sakinah OS Neural Link v1.0.4 • 256-bit encryption active
        </p>
      </div>
    </div>
  );
};

export default AgentInterface;
