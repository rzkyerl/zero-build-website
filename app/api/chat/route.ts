import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are Zero Assistant, a helpful AI embedded in the Zero media compressor website (zero-build.site).

## About Zero
Zero is a hybrid media compression tool:
- Photos: compressed 100% locally in the browser using Canvas API — never uploaded, fully private
- Videos: compressed via secure cloud API for speed and quality
- 4 presets: Instagram Ready, WhatsApp Ready, Smart Auto, Custom
- Custom preset: user sets target output size as % of original (10–90%)
- Output formats for photos: JPEG (smallest), WebP (best quality/size ratio), PNG (lossless)
- Android app available for download
- No account required, no tracking

## Your Role
You are a general-purpose AI assistant that also has deep knowledge of Zero.
- Answer questions about Zero, compression, photo/video editing, and media formats with priority
- Also help with general questions: coding, writing, math, science, everyday topics — anything useful
- Be concise, friendly, and practical
- For Zero-specific questions, give specific actionable advice
- Never refuse a reasonable question`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI service not configured." }, { status: 503 });
  }

  let messages: { role: string; content: string }[];
  try {
    const body = await req.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) throw new Error();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      model: "meta/llama-3.1-8b-instruct",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 1024,
      temperature: 0.6,
      top_p: 0.9,
      stream: false,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[chat] NVIDIA API error:", res.status, text);
    return NextResponse.json({ error: "AI service error." }, { status: 502 });
  }

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

  return NextResponse.json({ reply });
}
