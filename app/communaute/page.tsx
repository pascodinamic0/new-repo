"use client"
import { FormEvent, useEffect, useState } from "react"
import { useCopy, useLocale } from "@/components/locale"

type Ann = { id: string; title_fr: string; title_en: string; body_fr: string; body_en: string }
type Ev = { id: string; title_fr: string; title_en: string; description_fr: string; description_en: string; starts_at: string; location: string }
type Post = { id: string; display_name: string; body: string; kind: string; created_at: string }
type User = { id: string; name: string; role: string }

export default function CommunityPage() {
  const { locale } = useLocale()
  const t = useCopy()
  const [tab, setTab] = useState<"ann" | "events" | "posts">("ann")
  const [anns, setAnns] = useState<Ann[]>([])
  const [events, setEvents] = useState<Ev[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [text, setText] = useState("")
  const [toast, setToast] = useState("")
  const [form, setForm] = useState({ title_fr: "", title_en: "", body_fr: "", body_en: "" })

  function load() {
    fetch("/api/announcements").then(r => r.json()).then(d => setAnns(d.announcements || []))
    fetch("/api/events").then(r => r.json()).then(d => setEvents(d.events || []))
    fetch("/api/posts").then(r => r.json()).then(d => setPosts(d.posts || []))
    fetch("/api/auth/session").then(r => r.json()).then(d => setUser(d.user))
  }
  useEffect(load, [])

  async function sendPost(e: FormEvent) {
    e.preventDefault()
    const res = await fetch("/api/posts", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ body: text, kind: "post" }) })
    const json = await res.json()
    if (!res.ok) { setToast(json.error); return }
    setText(""); setToast(locale === "fr" ? "Message publié." : "Post published."); load()
  }
  async function sendAnn(e: FormEvent) {
    e.preventDefault()
    const res = await fetch("/api/announcements", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(form) })
    const json = await res.json()
    if (!res.ok) { setToast(json.error); return }
    setForm({ title_fr: "", title_en: "", body_fr: "", body_en: "" })
    setToast(locale === "fr" ? "Annonce publiée." : "Announcement published.")
    load()
  }

  return (
    <div>
      <p className="kicker">MTUSDA · {t.city}</p>
      <div className="section-title"><h2>{t.community}</h2></div>
      <p className="muted">{t.communityLead}</p>
      <div className="chips">
        <button className={tab === "ann" ? "chip on" : "chip"} onClick={() => setTab("ann")}>{t.announce}</button>
        <button className={tab === "events" ? "chip on" : "chip"} onClick={() => setTab("events")}>{t.events}</button>
        <button className={tab === "posts" ? "chip on" : "chip"} onClick={() => setTab("posts")}>{t.posts}</button>
      </div>
      {toast && <div className="toast" role="status">{toast}</div>}
      {tab === "ann" && anns.map(ann => (
        <article key={ann.id} className="panel" style={{ marginTop: 12 }} data-testid="announcement">
          <h3>{locale === "fr" ? ann.title_fr : ann.title_en}</h3>
          <p>{locale === "fr" ? ann.body_fr : ann.body_en}</p>
        </article>
      ))}
      {tab === "events" && events.map(event => (
        <article key={event.id} className="panel" style={{ marginTop: 12 }} data-testid="event">
          <div className="muted">{new Date(event.starts_at).toLocaleString(locale === "fr" ? "fr-FR" : "en-GB", { timeZone: "Africa/Kinshasa" })} · {event.location}</div>
          <h3>{locale === "fr" ? event.title_fr : event.title_en}</h3>
          <p>{locale === "fr" ? event.description_fr : event.description_en}</p>
        </article>
      ))}
      {tab === "posts" && (
        <div>
          {user ? (
            <form onSubmit={sendPost} className="panel" style={{ margin: "12px 0" }}>
              <textarea data-testid="post-box" value={text} onChange={e => setText(e.target.value)} placeholder={t.postPlaceholder} />
              <button className="btn" type="submit">{t.publish}</button>
            </form>
          ) : <p className="muted"><a href="/compte">{t.login}</a></p>}
          {posts.map(post => (
            <article key={post.id} className="panel" style={{ marginTop: 10 }} data-testid="post">
              <b>{post.display_name}</b>
              <p>{post.body}</p>
            </article>
          ))}
        </div>
      )}
      {user?.role === "admin" && tab === "ann" && (
        <form onSubmit={sendAnn} className="panel" style={{ marginTop: 16 }}>
          <h3>{t.publish}</h3>
          <input className="field" placeholder="Titre FR" value={form.title_fr} onChange={e => setForm({ ...form, title_fr: e.target.value })} />
          <input className="field" placeholder="Title EN" value={form.title_en} onChange={e => setForm({ ...form, title_en: e.target.value })} />
          <textarea placeholder="Texte FR" value={form.body_fr} onChange={e => setForm({ ...form, body_fr: e.target.value })} />
          <textarea placeholder="Text EN" value={form.body_en} onChange={e => setForm({ ...form, body_en: e.target.value })} />
          <button className="btn" type="submit">{t.publish}</button>
        </form>
      )}
    </div>
  )
}
