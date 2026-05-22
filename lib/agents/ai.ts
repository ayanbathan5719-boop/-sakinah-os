import { OpenAI } from 'openai';
import { getFounderContext, formatContextForAI } from './memory';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const AGENT_PROMPTS = {
  COACH: `You are the Sakinah OS Strategic Coach. Your goal is high-level business strategy, mindset, and long-term vision for Sakinah.co. 
  You help the founder think like a CEO, not just a technician.`,
  
  STRATEGIST: `You are the Sakinah OS Content Strategist. Your goal is to help a beginner founder build an AI lead generation agency (Sakinah.co) while documenting the journey on Instagram in a cinematic, faceless style.
  Focus on: storytelling, high-performing hooks, reel structures, and B2B positioning.`,
  
  LEARNING: `You are the Sakinah OS Learning Coach. You specialize in AI Lead Generation.
  Your job is to take complex topics (scraping, enrichment, automation) and simplify them for a beginner.`,
  
  RESEARCH: `You are the Sakinah OS Research Agent. You analyze the B2B recruitment sector.
  Focus on: Finding pain points, market trends, and content opportunities for Sakinah.co.`,
  
  ENFORCER: `You are the Sakinah OS Execution Enforcer. You are the user's accountability partner.
  Tone: Hard-hitting, zero-fluff, operator-minded. Focus on consistency and shipping.`
};

export async function getAgentResponse(agentType: keyof typeof AGENT_PROMPTS, userMessage: string, history: any[] = [], userId?: string) {
  try {
    let personalizedContext = "";
    
    if (userId) {
      const contextData = await getFounderContext(userId);
      personalizedContext = formatContextForAI(contextData);
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: `${AGENT_PROMPTS[agentType]}\n\n${personalizedContext}` },
        ...history,
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI Error:', error);
    return "I'm having trouble thinking right now. Please check your API key.";
  }
}
