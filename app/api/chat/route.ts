import { NextResponse } from 'next/server';
import { getAgentResponse, AGENT_PROMPTS } from '@/lib/agents/ai';

export async function POST(req: Request) {
  try {
    const { message, agentType, history, userId } = await req.json();

    if (!message || !agentType || !AGENT_PROMPTS[agentType as keyof typeof AGENT_PROMPTS]) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const aiResponse = await getAgentResponse(agentType as keyof typeof AGENT_PROMPTS, message, history, userId);

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
