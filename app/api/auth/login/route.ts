import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sessionCookie, signSession } from "@/lib/session"

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const email = String(body.email || "").trim().toLowerCase()
  const password = String(body.password || "")
  if (!email || !password) return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 400 })
  const sql = db()
  const rows = await sql`select id, email, display_name, role from users where email = ${email} and password_hash = crypt(${password}, password_hash)`
  const user = rows[0] as { id: string; email: string; display_name: string; role: string } | undefined
  if (!user) return NextResponse.json({ error: "Identifiants incorrects." }, { status: 401 })
  const token = signSession({ id: user.id, email: user.email, name: user.display_name, role: user.role })
  const cookie = sessionCookie(token)
  const res = NextResponse.json({ user: { id: user.id, email: user.email, name: user.display_name, role: user.role } })
  res.cookies.set(cookie.name, cookie.value, cookie.options)
  return res
}
