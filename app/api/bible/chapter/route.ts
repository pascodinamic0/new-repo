import { NextResponse } from "next/server"
import { readFileSync } from "fs"
import path from "path"
import { bookById } from "@/lib/canon"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const version = url.searchParams.get("v") === "kjv" ? "kjv" : "lsg"
  const id = url.searchParams.get("b") || ""
  const chapter = Number(url.searchParams.get("c"))
  const book = bookById(id)
  if (!book || !Number.isFinite(chapter) || chapter < 1 || chapter > book.chapters) {
    return NextResponse.json({ error: "Chapitre introuvable." }, { status: 404 })
  }
  const file = path.join(process.cwd(), "data", "bible", version, `${book.id}.json`)
  const doc = JSON.parse(readFileSync(file, "utf8")) as { chapters: { n: number; verses: { v: number; t: string }[] }[] }
  const found = doc.chapters.find(ch => ch.n === chapter)
  if (!found) return NextResponse.json({ error: "Chapitre introuvable." }, { status: 404 })
  return NextResponse.json({ version, book: book.id, chapter, verses: found.verses })
}
