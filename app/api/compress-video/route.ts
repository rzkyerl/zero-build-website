import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 120; // 2 min — large videos need more time

export async function POST(req: NextRequest) {
  const token = process.env.APYHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Video compression service not configured." },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  // Validate that a video file was actually provided
  const videoFile = formData.get("video");
  if (!videoFile || !(videoFile instanceof File)) {
    return NextResponse.json({ error: "No video file provided." }, { status: 400 });
  }

  let res: Response;
  try {
    res = await fetch(
      "https://api.apyhub.com/compress/video/file?output=compressed.mp4",
      {
        method: "POST",
        headers: { "apy-token": token },
        body: formData,
      }
    );
  } catch (err) {
    console.error("[compress-video] fetch error:", err);
    return NextResponse.json(
      { error: "Could not reach compression service. Check your internet connection." },
      { status: 502 }
    );
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    console.error(`[compress-video] ApyHub error ${res.status}:`, text);
    return NextResponse.json(
      { error: `Compression service error (${res.status}): ${text}` },
      { status: res.status }
    );
  }

  const blob = await res.blob();

  if (blob.size === 0) {
    return NextResponse.json(
      { error: "Compression service returned an empty file." },
      { status: 502 }
    );
  }

  return new NextResponse(blob, {
    status: 200,
    headers: {
      "Content-Type": "video/mp4",
      "Content-Disposition": 'attachment; filename="compressed.mp4"',
    },
  });
}
