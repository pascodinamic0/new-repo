import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sessionCookie, signSession } from "@/lib/session"

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const email = String(body.email || "").trim().toLowerCase()
  const password = String(body.password || "")
  const name = String(body.name || "").trim().slice(0, 80)
  if (!email.includes("@") || password.length < 6 || name.length < 2) {
    return NextResponse.json({ error: "Nom, email valide et mot de passe (6 caractères) requis." }, { status: 400 })
  }
  const sql = db()
  try {
    const rows = await sql`insert into users (email, password_hash, display_name) values (${email}, crypt(${password}, gen_salt('bf')), ${name}) returning id, email, display_name, role`
    const user = rows[0] as { id: string; email: string; display_name: string; role: string }
    const token = signSession({ id: user.id, email: user.email, name: user.display_name, role: user.role })
    const cookie = sessionCookie(token)
    const res = NextResponse.json({ user: { id: user.id, email: user.email, name: user.display_name, role: user.role } })
    res.cookies.set(cookie.name, cookie.value, cookie.options)
    return res
  } catch {
    return NextResponse.json({ error: "Cet email est déjà utilisé." }, { status: 409 })
  }
}
