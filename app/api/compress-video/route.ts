import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
// Video files can be large — allow up to 200 MB
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const token = process.env.APYHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Video compression service not configured." }, { status: 503 });
  }

  // Forward the multipart form data directly to ApyHub
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const res = await fetch("https://api.apyhub.com/compress/video/file?output=compressed.mp4", {
    method: "POST",
    headers: {
      "apy-token": token,
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    return NextResponse.json(
      { error: `Compression service error: ${res.status} — ${text}` },
      { status: res.status }
    );
  }

  // Stream the compressed video back to the client
  const blob = await res.blob();
  return new NextResponse(blob, {
    status: 200,
    headers: {
      "Content-Type": "video/mp4",
      "Content-Disposition": 'attachment; filename="compressed.mp4"',
    },
  });
}
