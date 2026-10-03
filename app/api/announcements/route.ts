import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/session"

export async function GET() {
  const sql = db()
  const announcements = await sql`select id, title_fr, title_en, body_fr, body_en, created_at from announcements where published = true order by created_at desc`
  return NextResponse.json({ announcements })
}

export async function POST(req: Request) {
  const user = await currentUser()
  if (!user || user.role !== "admin") return NextResponse.json({ error: "Seul un responsable peut publier." }, { status: 403 })
  const body = await req.json().catch(() => ({}))
  const title_fr = String(body.title_fr || "").trim()
  const title_en = String(body.title_en || "").trim()
  const body_fr = String(body.body_fr || "").trim()
  const body_en = String(body.body_en || "").trim()
  if (!title_fr || !title_en || !body_fr || !body_en) return NextResponse.json({ error: "Titre et texte, en français et en anglais." }, { status: 400 })
  const sql = db()
  const rows = await sql`insert into announcements (title_fr, title_en, body_fr, body_en, published) values (${title_fr.slice(0,160)}, ${title_en.slice(0,160)}, ${body_fr.slice(0,2000)}, ${body_en.slice(0,2000)}, true) returning id, title_fr, title_en, body_fr, body_en, created_at`
  return NextResponse.json({ announcement: rows[0] })
}
