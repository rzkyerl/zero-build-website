import { NextRequest } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are Zero Assistant, a helpful AI embedded in the Zero media compressor website (zero-build.site).

## About Zero
Zero is a hybrid media compression tool:
- Photos: compressed 100% locally in the browser using Canvas API — never uploaded, fully private
- Videos: compressed via secure cloud API for speed and quality
- 4 presets: Instagram Ready, WhatsApp Ready, Smart Auto, Custom
- Custom preset: user sets target output size as % of original (10–90%)
- Output formats for photos: JPEG (smallest), WebP (best quality/size ratio), PNG (lossless)
- Android app available for download at www.zero-build.site
- No account required, no tracking

## App Availability
- Zero web app: available at www.zero-build.site (official, always up to date)
- Android APK: available for direct download at www.zero-build.site/download section
- Google Play Store: NOT yet available — coming soon
- Apple App Store / iOS: NOT yet available — coming soon
- If anyone asks about Play Store, App Store, or iOS app — clearly state they are not available yet and direct them to www.zero-build.site

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
    return new Response(JSON.stringify({ error: "AI service not configured." }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  let messages: { role: string; content: string }[];
  try {
    const body = await req.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) throw new Error();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Accept": "text/event-stream",
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
      stream: true,
    }),
  });

  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => "");
    console.error("[chat] NVIDIA API error:", res.status, text);
    return new Response(JSON.stringify({ error: "AI service error." }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Stream SSE from NVIDIA → forward as SSE to client
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              continue;
            }
            try {
              const parsed = JSON.parse(data);
              const token = parsed.choices?.[0]?.delta?.content;
              if (token) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`));
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      } finally {
        controller.close();
        reader.releaseLock();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
