import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/session"

export async function GET() {
  const user = await currentUser()
  if (!user) return NextResponse.json({ bookmarks: [] })
  const sql = db()
  const bookmarks = await sql`select id, reference, version, book, chapter, verse from bookmarks where user_id = ${user.id} order by created_at desc`
  return NextResponse.json({ bookmarks })
}

export async function POST(req: Request) {
  const user = await currentUser()
  if (!user) return NextResponse.json({ error: "Connectez-vous pour enregistrer un signet." }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  const version = body.version === "kjv" ? "kjv" : "lsg"
  const book = String(body.book || "")
  const chapter = Number(body.chapter)
  const verse = Number(body.verse)
  const reference = String(body.reference || `${version} ${book} ${chapter}:${verse}`)
  if (!book || !chapter || !verse) return NextResponse.json({ error: "Référence incomplète." }, { status: 400 })
  const sql = db()
  const existing = await sql`select id from bookmarks where user_id = ${user.id} and version = ${version} and book = ${book} and chapter = ${chapter} and verse = ${verse}`
  if (existing.length) {
    await sql`delete from bookmarks where id = ${existing[0].id}`
    return NextResponse.json({ saved: false })
  }
  await sql`insert into bookmarks (user_id, reference, version, book, chapter, verse) values (${user.id}, ${reference}, ${version}, ${book}, ${chapter}, ${verse})`
  return NextResponse.json({ saved: true })
}
