import { NextResponse } from "next/server"
import { readFileSync } from "fs"
import path from "path"
import { BOOKS } from "@/lib/canon"
import { fold, parseReference } from "@/lib/reference"

type Row = { book: string; chapter: number; verse: number; text: string }
const cache: Record<string, Row[]> = {}

function corpus(version: string): Row[] {
  if (cache[version]) return cache[version]
  const rows: Row[] = []
  for (const book of BOOKS) {
    const file = path.join(process.cwd(), "data", "bible", version, `${book.id}.json`)
    const doc = JSON.parse(readFileSync(file, "utf8")) as { chapters: { n: number; verses: { v: number; t: string }[] }[] }
    for (const chapter of doc.chapters) {
      for (const verse of chapter.verses) rows.push({ book: book.id, chapter: chapter.n, verse: verse.v, text: verse.t })
    }
  }
  cache[version] = rows
  return rows
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = (url.searchParams.get("q") || "").trim()
  const version = url.searchParams.get("v") === "kjv" ? "kjv" : "lsg"
  if (q.length < 2) return NextResponse.json({ results: [] })
  const ref = parseReference(q)
  if (ref) {
    return NextResponse.json({
      reference: { book: ref.book.id, chapter: ref.chapter, verse: ref.verse || null },
      results: [],
    })
  }
  const needle = fold(q)
  const words = needle.split(/\s+/).filter(w => w.length > 1)
  const results = []
  for (const row of corpus(version)) {
    const hay = fold(row.text)
    if (words.every(word => hay.includes(word))) {
      results.push(row)
      if (results.length >= 30) break
    }
  }
  return NextResponse.json({ reference: null, results })
}
