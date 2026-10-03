import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/session"

export async function GET(req: Request) {
  const user = await currentUser()
  if (!user) return NextResponse.json({ notes: [] })
  const reference = new URL(req.url).searchParams.get("reference")
  const sql = db()
  const notes = reference
    ? await sql`select id, reference, body, created_at from notes where user_id = ${user.id} and reference = ${reference} order by created_at desc`
    : await sql`select id, reference, body, created_at from notes where user_id = ${user.id} order by created_at desc limit 40`
  return NextResponse.json({ notes })
}

export async function POST(req: Request) {
  const user = await currentUser()
  if (!user) return NextResponse.json({ error: "Connectez-vous pour écrire une note." }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  const text = String(body.body || "").trim()
  const reference = String(body.reference || "").slice(0, 120)
  if (text.length < 2) return NextResponse.json({ error: "La note est trop courte." }, { status: 400 })
  const sql = db()
  const rows = await sql`insert into notes (user_id, reference, body) values (${user.id}, ${reference}, ${text.slice(0, 2000)}) returning id, reference, body, created_at`
  return NextResponse.json({ note: rows[0] })
}
