import { NextResponse } from "next/server"
import { readFileSync, existsSync } from "fs"
import path from "path"

const slugs = new Set(["steps-to-christ", "great-controversy", "desire-of-ages"])

export async function GET(req: Request) {
  const url = new URL(req.url)
  const slug = url.searchParams.get("slug") || ""
  if (!slugs.has(slug)) return NextResponse.json({ error: "Livre introuvable." }, { status: 404 })
  const chapter = url.searchParams.get("chapter")
  const base = path.join(process.cwd(), "data", "books", slug)
  if (!chapter) {
    const meta = JSON.parse(readFileSync(path.join(base, "meta.json"), "utf8"))
    return NextResponse.json(meta)
  }
  if (!/^\d+$/.test(chapter)) return NextResponse.json({ error: "Chapitre introuvable." }, { status: 404 })
  const file = path.join(base, `${chapter}.json`)
  if (!existsSync(file)) return NextResponse.json({ error: "Chapitre introuvable." }, { status: 404 })
  return NextResponse.json(JSON.parse(readFileSync(file, "utf8")))
}
