import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

export type SessionUser = { id: string; email: string; name: string; role: string }

function secret() {
  const value = process.env.SESSION_SECRET
  if (!value) throw new Error("SESSION_SECRET missing")
  return value
}

export function signSession(user: SessionUser) {
  const payload = Buffer.from(JSON.stringify({ ...user, exp: Date.now() + 30 * 864e5 })).toString("base64url")
  const sig = createHmac("sha256", secret()).update(payload).digest("base64url")
  return `${payload}.${sig}`
}

export function readToken(token?: string | null): SessionUser | null {
  if (!token) return null
  const [payload, sig] = token.split(".")
  if (!payload || !sig) return null
  const expected = createHmac("sha256", secret()).update(payload).digest("base64url")
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString())
    if (!data.exp || data.exp < Date.now()) return null
    return { id: data.id, email: data.email, name: data.name, role: data.role }
  } catch {
    return null
  }
}

export async function currentUser() {
  const jar = await cookies()
  return readToken(jar.get("mtusda_session")?.value)
}

export function sessionCookie(token: string) {
  return {
    name: "mtusda_session",
    value: token,
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    },
  }
}
