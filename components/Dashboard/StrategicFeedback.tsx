'use client';

import React, { useState } from 'react';
import { Brain, X, ChevronRight, MessageSquareWarning } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StrategicFeedback = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-white text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50 group"
      >
        <Brain className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-8 w-96 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-4 bg-zinc-900 border-b border-[#1a1a1a] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageSquareWarning className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">Strategic Audit Mode</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white">The Operator's Critique</h3>
                <p className="text-xs text-zinc-400 leading-relaxed italic">
                  "I've analyzed your current workflow. You're spending too much time on 'Cinematic Transitions' and not enough on 'Lead List Quality'. This is a low-leverage trap."
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Priority Adjustments</p>
                <div className="space-y-2">
                  {[
                    "Stop editing for 2 hours; Ship the outreach first.",
                    "Verify the Apollo.io filters; you're targeting 'HR' when you should target 'Growth VPs'.",
                    "Simplify the script. It's too long for B2B recruitment."
                  ].map((tip, i) => (
                    <div key={i} className="flex gap-2 text-xs text-zinc-300 p-2 rounded-lg bg-zinc-900/50 border border-zinc-800">
                      <ChevronRight className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-3 bg-white text-black text-xs font-bold rounded-xl hover:bg-zinc-200 transition-all">
                Update Focus to High-Leverage
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StrategicFeedback;
