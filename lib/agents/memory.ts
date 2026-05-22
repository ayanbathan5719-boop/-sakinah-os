import { supabase } from '../supabase';

/**
 * Fetches all relevant context for a user to inject into an AI prompt.
 * This is the "Brain" of the personalized OS.
 */
export async function getFounderContext(userId: string) {
  // In a real app, userId would come from auth.
  // For now, we'll fetch from our key tables.
  
  const [profile, latestLogs, learning, content] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', userId).single(),
    supabase.from('daily_logs').select('*').eq('user_id', userId).order('log_date', { ascending: false }).limit(3),
    supabase.from('learning_milestones').select('*').eq('user_id', userId),
    supabase.from('content_items').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(5)
  ]);

  return {
    founder: profile.data,
    history: {
      recentLogs: latestLogs.data,
      skills: learning.data,
      content: content.data
    }
  };
}

/**
 * Formats the raw DB data into a string the AI can understand.
 */
export function formatContextForAI(context: any) {
  if (!context.founder) return "No founder profile found.";

  const { founder, history } = context;

  return `
--- FOUNDER CONTEXT ---
Agency: ${founder.agency_name}
Niche: ${founder.niche}
Goals: ${founder.goals?.join(', ') || 'None set'}
Current Learning Stage: ${founder.learning_stage}
Style: ${founder.preferred_style}

--- RECENT ACTIVITY ---
Completed Skills: ${history.skills?.filter((s: any) => s.status === 'mastered').map((s: any) => s.concept_name).join(', ') || 'None'}
Struggling with: ${history.skills?.filter((s: any) => s.status === 'struggling').map((s: any) => s.concept_name).join(', ') || 'None'}
Recent Content: ${history.content?.map((c: any) => c.title).join(', ') || 'No recent content'}
  `;
}
