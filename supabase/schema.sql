-- Sakinah OS: Core Database Schema

-- 1. Profiles: The Foundation Memory
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  agency_name TEXT DEFAULT 'Sakinah.co',
  niche TEXT DEFAULT 'B2B Recruitment',
  positioning TEXT,
  goals TEXT[],
  preferred_style TEXT,
  weaknesses TEXT[],
  learning_stage TEXT DEFAULT 'Beginner',
  onboarding_completed BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Daily Logs: The Daily Memory
CREATE TABLE IF NOT EXISTS daily_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  log_date DATE DEFAULT CURRENT_DATE,
  focus_of_day TEXT,
  mistakes TEXT[],
  reflections TEXT,
  strategic_insights TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Content Items: The Content Memory
CREATE TABLE IF NOT EXISTS content_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  type TEXT CHECK (type IN ('reel', 'carousel', 'story', 'post')),
  title TEXT,
  hook TEXT,
  script TEXT,
  caption TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'posted')),
  performance_data JSONB DEFAULT '{}',
  theme TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Learning Milestones: The Learning Memory
CREATE TABLE IF NOT EXISTS learning_milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  concept_name TEXT NOT NULL,
  difficulty_level TEXT,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'mastered', 'struggling')),
  notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. AI Memory: The Strategic & Conversation Memory
CREATE TABLE IF NOT EXISTS ai_memories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  agent_type TEXT, -- 'STRATEGIST', 'LEARNING', 'RESEARCH', 'ENFORCER'
  content TEXT NOT NULL,
  memory_type TEXT DEFAULT 'insight' CHECK (memory_type IN ('insight', 'pattern', 'advice', 'fact')),
  relevance_score FLOAT DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_memories ENABLE ROW LEVEL SECURITY;

-- Simple Policies (Only User can read/write their own data)
CREATE POLICY "Users can manage their own profile" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can manage their own logs" ON daily_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own content" ON content_items FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own learning" ON learning_milestones FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own AI memories" ON ai_memories FOR ALL USING (auth.uid() = user_id);
