import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const text = String(body.text || "").trim()
    const from = body.from === "fr" ? "fr" : "en"
    const to = body.to === "en" ? "en" : "fr"
    if (!text) return NextResponse.json({ error: "Texte requis." }, { status: 400 })
    const clipped = text.slice(0, 450)
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(clipped)}&langpair=${encodeURIComponent(from + "|" + to)}`
    const response = await fetch(url, { cache: "no-store" })
    if (!response.ok) return NextResponse.json({ error: "La traduction est indisponible pour le moment." }, { status: 502 })
    const data = await response.json()
    const translation = data?.responseData?.translatedText
    if (!translation || /MYMEMORY WARNING/i.test(translation)) {
      return NextResponse.json({ error: "La traduction est indisponible pour le moment." }, { status: 502 })
    }
    return NextResponse.json({ translation })
  } catch {
    return NextResponse.json({ error: "La traduction est indisponible pour le moment." }, { status: 502 })
  }
}
