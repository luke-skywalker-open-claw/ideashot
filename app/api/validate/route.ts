import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `You are a brutally honest startup validator — think YC partner meets experienced indie maker.
You give concise, actionable feedback without sugarcoating.
Always respond with valid JSON only, no markdown, no preamble.`

export async function POST(req: NextRequest) {
  try {
    const { idea, audience, problem } = await req.json()

    if (!idea || !audience || !problem) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const prompt = `Validate this startup idea:

IDEA: ${idea}
TARGET AUDIENCE: ${audience}
PROBLEM SOLVED: ${problem}

Respond with this exact JSON structure (no markdown, pure JSON):
{
  "icpScore": <number 1-10>,
  "icpExplanation": "<1-2 sentences on ICP clarity>",
  "marketSignal": "<Hot|Warm|Cold>",
  "marketReasoning": "<1-2 sentences on market demand evidence>",
  "risks": ["<risk 1>", "<risk 2>", "<risk 3>"],
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "mvpScope": ["<mvp step 1>", "<mvp step 2>", "<mvp step 3>"],
  "brutalTake": "<one honest sentence — the thing they need to hear>"
}`

    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
      system: SYSTEM_PROMPT,
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    
    // Extract JSON — sometimes model wraps in backticks
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON in response')
    }

    const result = JSON.parse(jsonMatch[0])
    return NextResponse.json(result)
  } catch (err) {
    console.error('Validate error:', err)
    return NextResponse.json({ error: 'Validation failed' }, { status: 500 })
  }
}
