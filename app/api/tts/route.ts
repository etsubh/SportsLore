import { NextRequest, NextResponse } from "next/server";

const MAX_CHARS = 400;

export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get("text")?.trim();
  if (!text) {
    return NextResponse.json({ error: "Missing text" }, { status: 400 });
  }
  if (text.length > MAX_CHARS) {
    return NextResponse.json({ error: "Text too long" }, { status: 400 });
  }

  const url =
    "https://translate.googleapis.com/translate_tts?" +
    new URLSearchParams({
      ie: "UTF-8",
      client: "tw-ob",
      tl: "en-US",
      q: text,
    });

  const upstream = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: "https://translate.google.com/",
    },
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: "TTS upstream failed" }, { status: 502 });
  }

  const audio = await upstream.arrayBuffer();
  return new NextResponse(audio, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
