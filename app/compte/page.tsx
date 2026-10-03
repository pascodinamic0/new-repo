"use client"
import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
import { useCopy, useLocale } from "@/components/locale"

type User = { name: string; email: string; role: string }
type Mark = { id: string; reference: string; book: string; chapter: number; verse: number }

export default function AccountPage() {
  const t = useCopy()
  const { locale } = useLocale()
  const [user, setUser] = useState<User | null>(null)
  const [marks, setMarks] = useState<Mark[]>([])
  const [notes, setNotes] = useState<{ id: string; reference: string; body: string }[]>([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [mode, setMode] = useState<"in" | "up">("in")
  const [toast, setToast] = useState("")

  function refresh() {
    fetch("/api/auth/session").then(r => r.json()).then(d => setUser(d.user))
    fetch("/api/bookmarks").then(r => r.json()).then(d => setMarks(d.bookmarks || []))
    fetch("/api/notes").then(r => r.json()).then(d => setNotes(d.notes || []))
  }
  useEffect(refresh, [])

  async function submit(e: FormEvent) {
    e.preventDefault()
    const path = mode === "in" ? "/api/auth/login" : "/api/auth/signup"
    const res = await fetch(path, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password, name }) })
    const json = await res.json()
    if (!res.ok) { setToast(json.error); return }
    setToast(""); refresh()
  }
  async function demo() {
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "demo@mtusda.org", password: "mtusda-demo" }) })
    const json = await res.json()
    if (!res.ok) { setToast(json.error); return }
    setToast(""); refresh()
  }
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null); setMarks([]); setNotes([])
  }

  if (user) {
    return (
      <div>
        <p className="kicker">{t.account}</p>
        <div className="section-title"><h2 data-testid="account-name">{user.name}</h2></div>
        <p className="muted">{user.email}</p>
        <button className="btn-ghost" onClick={logout}>{t.logout}</button>
        <h3>{t.bookmark}</h3>
        {marks.map(mark => (
          <Link key={mark.id} className="card" href={`/bible/${mark.book.toLowerCase()}/${mark.chapter}?v=${mark.verse}`} style={{ display: "block", marginBottom: 8 }}>{mark.reference}</Link>
        ))}
        <h3>{t.note}</h3>
        {notes.map(note => (
          <div key={note.id} className="panel" style={{ marginBottom: 8 }}><b>{note.reference}</b><p>{note.body}</p></div>
        ))}
      </div>
    )
  }
  return (
    <div className="reader">
      <p className="kicker">{t.account}</p>
      <div className="section-title"><h2>{mode === "in" ? t.login : t.signup}</h2></div>
      {toast && <div className="toast" role="status">{toast}</div>}
      <form className="panel" onSubmit={submit}>
        {mode === "up" && <input className="field" placeholder={locale === "fr" ? "Nom" : "Name"} value={name} onChange={e => setName(e.target.value)} />}
        <input className="field" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="field" type="password" placeholder={locale === "fr" ? "Mot de passe" : "Password"} value={password} onChange={e => setPassword(e.target.value)} />
        <div className="row">
          <button className="btn" type="submit">{mode === "in" ? t.login : t.signup}</button>
          <button className="btn-ghost" type="button" onClick={() => setMode(mode === "in" ? "up" : "in")}>{mode === "in" ? t.signup : t.login}</button>
        </div>
      </form>
      <button className="btn gold" style={{ marginTop: 12 }} data-testid="demo-login" onClick={demo}>{t.demo}</button>
    </div>
  )
}
