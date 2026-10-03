import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/session"

export async function GET() {
  const sql = db()
  const posts = await sql`select id, display_name, body, kind, created_at from community_posts order by created_at desc limit 50`
  return NextResponse.json({ posts })
}

export async function POST(req: Request) {
  const user = await currentUser()
  if (!user) return NextResponse.json({ error: "Connectez-vous pour publier." }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  const text = String(body.body || "").trim()
  const kind = body.kind === "prayer" ? "prayer" : "post"
  if (text.length < 2) return NextResponse.json({ error: "Écrivez quelques mots." }, { status: 400 })
  const sql = db()
  const rows = await sql`insert into community_posts (user_id, display_name, body, kind) values (${user.id}, ${user.name}, ${text.slice(0, 1000)}, ${kind}) returning id, display_name, body, kind, created_at`
  return NextResponse.json({ post: rows[0] })
}
