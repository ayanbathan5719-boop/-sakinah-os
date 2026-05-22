'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Target, 
  User, 
  Briefcase, 
  ArrowRight, 
  ChevronLeft,
  Loader2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const steps = [
  { id: 'welcome', title: 'Initialization', subtitle: 'Calibrating your neural link...' },
  { id: 'identity', title: 'Founder Identity', subtitle: 'Who is leading this mission?' },
  { id: 'business', title: 'Business Core', subtitle: 'What are we building?' },
  { id: 'niche', title: 'Market Positioning', subtitle: 'Who are we helping?' },
  { id: 'goals', title: 'Strategic Targets', subtitle: 'What does success look like?' },
  { id: 'finalize', title: 'System Online', subtitle: 'Sakinah OS is ready.' },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: '',
    agency_name: 'Sakinah.co',
    niche: 'B2B Recruitment Agencies',
    goals: [] as string[],
    preferred_style: 'Cinematic / Faceless',
    learning_stage: 'Beginner',
    weaknesses: [] as string[],
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleComplete = async () => {
    setIsSubmitting(true);
    
    try {
      // In a real app, we'd get the current user ID from auth.
      // For this demo/MVP, we'll assume a profile update logic.
      // const { data: { user } } = await supabase.auth.getUser();
      
      // Mock save to Supabase
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: '00000000-0000-0000-0000-000000000000', // Placeholder UUID
          ...formData,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        });

      if (error) console.error('Supabase Error:', error);
      
      // Artificial delay for cinematic effect
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const StepContent = () => {
    switch (steps[currentStep].id) {
      case 'welcome':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
              <Zap className="w-10 h-10 text-emerald-500 animate-pulse" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter">Initialize Sakinah OS</h1>
              <p className="text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Welcome, Founder. Before we begin the 30-day challenge, we must calibrate the system to your mission.
              </p>
            </div>
            <button 
              onClick={nextStep}
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-white/10"
            >
              Begin Initialization
            </button>
          </motion.div>
        );

      case 'identity':
        return (
          <div className="space-y-6 w-full max-w-md mx-auto">
            <div className="flex items-center gap-4 text-emerald-500 mb-8">
              <User className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Founder Link</span>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Full Name</label>
              <input 
                type="text" 
                autoFocus
                placeholder="Enter your name"
                className="w-full bg-transparent border-b-2 border-zinc-800 py-4 text-2xl focus:outline-none focus:border-emerald-500 transition-colors"
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              />
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="space-y-6 w-full max-w-md mx-auto">
            <div className="flex items-center gap-4 text-emerald-500 mb-8">
              <Briefcase className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Project Core</span>
            </div>
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Agency Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Sakinah.co"
                  className="w-full bg-transparent border-b-2 border-zinc-800 py-4 text-2xl focus:outline-none focus:border-emerald-500 transition-colors"
                  value={formData.agency_name}
                  onChange={(e) => setFormData({...formData, agency_name: e.target.value})}
                />
              </div>
            </div>
          </div>
        );

      case 'niche':
        return (
          <div className="space-y-6 w-full max-w-md mx-auto">
            <div className="flex items-center gap-4 text-emerald-500 mb-8">
              <Target className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Market Focus</span>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Target Niche</label>
              <input 
                type="text" 
                placeholder="e.g. B2B Recruitment"
                className="w-full bg-transparent border-b-2 border-zinc-800 py-4 text-2xl focus:outline-none focus:border-emerald-500 transition-colors"
                value={formData.niche}
                onChange={(e) => setFormData({...formData, niche: e.target.value})}
              />
              <p className="text-[10px] text-zinc-600 italic mt-4">This helps the Research Agent find specific pain points.</p>
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="space-y-6 w-full max-w-md mx-auto">
            <div className="flex items-center gap-4 text-emerald-500 mb-8">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Success Metrics</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Reach $10k/mo Revenue",
                "Automate 100% of Outreach",
                "Build 10k Instagram Following",
                "Master AI Scraping Workflows"
              ].map((goal) => (
                <button 
                  key={goal}
                  onClick={() => {
                    const newGoals = formData.goals.includes(goal) 
                      ? formData.goals.filter(g => g !== goal) 
                      : [...formData.goals, goal];
                    setFormData({...formData, goals: newGoals});
                  }}
                  className={`p-4 text-left rounded-xl border transition-all ${
                    formData.goals.includes(goal) 
                      ? 'bg-emerald-500/10 border-emerald-500 text-white' 
                      : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-sm font-medium">{goal}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'finalize':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-8"
          >
            {isSubmitting ? (
              <div className="space-y-6">
                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto" />
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter">Calibrating Agents...</h2>
                  <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Writing to neural core</p>
                </div>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
                  <Sparkles className="w-10 h-10 text-black" />
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter">Founder Initialized</h1>
                  <p className="text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    Sakinah OS is now calibrated to your mission. Welcome back, {formData.full_name || 'Founder'}.
                  </p>
                </div>
                <button 
                  onClick={handleComplete}
                  className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-emerald-500/20"
                >
                  Enter Command Center
                </button>
              </>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Cinematic Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-4xl relative z-10">
        <header className="mb-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Zap className="text-black w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight">Sakinah OS</span>
          </div>
          
          <div className="flex gap-2">
            {steps.map((step, i) => (
              <div 
                key={step.id}
                className={`h-1 w-8 rounded-full transition-all duration-500 ${
                  i <= currentStep ? 'bg-emerald-500' : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </header>

        <main className="min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <div className="mb-2 text-center">
                <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.3em]">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
              <StepContent />
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="mt-20 flex justify-between items-center h-12">
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <button 
              onClick={prevStep}
              className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Back</span>
            </button>
          )}
          <div />
          {currentStep > 0 && currentStep < steps.length - 1 && (
            <button 
              onClick={nextStep}
              disabled={
                (currentStep === 1 && !formData.full_name) ||
                (currentStep === 2 && !formData.agency_name) ||
                (currentStep === 3 && !formData.niche)
              }
              className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 disabled:text-zinc-800 transition-colors group"
            >
              <span className="text-xs font-bold uppercase tracking-widest">Continue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
