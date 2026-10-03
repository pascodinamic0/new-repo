"use client"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { bookById } from "@/lib/canon"
import { cacheChapter, readChapter } from "@/lib/idb"
import { useCopy, useLocale } from "@/components/locale"

type Payload = { version: string; book: string; chapter: number; verses: { v: number; t: string }[] }

export default function ChapterPage() {
  const params = useParams<{ book: string; chapter: string }>()
  const search = useSearchParams()
  const highlight = Number(search.get("v") || 0)
  const book = bookById(params.book)
  const chapter = Number(params.chapter)
  const { locale } = useLocale()
  const t = useCopy()
  const version = locale === "en" ? "kjv" : "lsg"
  const [data, setData] = useState<Payload | null>(null)
  const [toast, setToast] = useState("")
  const [note, setNote] = useState("")
  const [saved, setSaved] = useState<number[]>([])

  useEffect(() => {
    if (!book) return
    const key = `${version}:${book.id}:${chapter}`
    let cancel = false
    ;(async () => {
      const cached = await readChapter<Payload>(key).catch(() => null)
      if (cached && !cancel) setData(cached)
      try {
        const res = await fetch(`/api/bible/chapter?v=${version}&b=${book.id}&c=${chapter}`)
        if (!res.ok) throw new Error("fail")
        const json = await res.json() as Payload
        await cacheChapter(key, json)
        if (!cancel) setData(json)
      } catch {
        if (!cached && !cancel) setToast(locale === "fr" ? "Chapitre indisponible hors ligne." : "Chapter unavailable offline.")
      }
    })()
    return () => { cancel = true }
  }, [book, chapter, version, locale])

  useEffect(() => {
    fetch("/api/bookmarks").then(r => r.json()).then(d => {
      const mine = (d.bookmarks || []).filter((b: { book: string; chapter: number; version: string }) => b.book === book?.id && b.chapter === chapter && b.version === version).map((b: { verse: number }) => b.verse)
      setSaved(mine)
    }).catch(() => {})
  }, [book, chapter, version])

  if (!book) return <p>{t.notFound}</p>
  const name = locale === "fr" ? book.fr : book.en

  async function toggle(verse: number) {
    const res = await fetch("/api/bookmarks", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ version, book: book!.id, chapter, verse, reference: `${name} ${chapter}:${verse}` }),
    })
    const json = await res.json()
    if (!res.ok) { setToast(json.error); return }
    setSaved(list => json.saved ? [...list, verse] : list.filter(v => v !== verse))
    setToast(json.saved ? (locale === "fr" ? "Signet enregistré." : "Bookmark saved.") : (locale === "fr" ? "Signet retiré." : "Bookmark removed."))
  }

  async function saveNote() {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ reference: `${name} ${chapter}`, body: note }),
    })
    const json = await res.json()
    setToast(res.ok ? (locale === "fr" ? "Note enregistrée." : "Note saved.") : json.error)
    if (res.ok) setNote("")
  }

  return (
    <article className="reader" data-testid="chapter">
      <p className="kicker"><Link href={`/bible/${book.id.toLowerCase()}`}>{name}</Link> · {version === "lsg" ? "LSG" : "KJV"}</p>
      <div className="section-title">
        <h2>{name} {chapter}</h2>
        <span className="row">
          {chapter > 1 && <Link className="btn-ghost" href={`/bible/${book.id.toLowerCase()}/${chapter - 1}`}>{chapter - 1}</Link>}
          {chapter < book.chapters && <Link className="btn-ghost" href={`/bible/${book.id.toLowerCase()}/${chapter + 1}`}>{chapter + 1}</Link>}
        </span>
      </div>
      {toast && <div className="toast" role="status">{toast}</div>}
      {(data?.verses || []).map(verse => (
        <div key={verse.v} id={`v${verse.v}`} className={verse.v === highlight ? "verse mark" : "verse"} data-testid={`verse-${verse.v}`}>
          <b>{verse.v}</b>
          <span>{verse.t}</span>
          <button className="btn-ghost" data-testid={verse.v === 1 ? "bookmark-verse" : undefined} onClick={() => toggle(verse.v)} aria-label={t.bookmark}>
            {saved.includes(verse.v) ? "●" : "○"}
          </button>
        </div>
      ))}
      <div className="panel" style={{ marginTop: 16 }}>
        <h3>{t.note}</h3>
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder={locale === "fr" ? "Une note pour ce chapitre" : "A note for this chapter"} />
        <button className="btn" onClick={saveNote}>{t.save}</button>
      </div>
    </article>
  )
}
