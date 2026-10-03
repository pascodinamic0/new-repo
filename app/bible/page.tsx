"use client"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { BOOKS } from "@/lib/canon"
import { parseReference } from "@/lib/reference"
import { useCopy, useLocale } from "@/components/locale"

export default function BiblePage() {
  const { locale } = useLocale()
  const t = useCopy()
  const router = useRouter()
  const [q, setQ] = useState("")
  const [hits, setHits] = useState<{ book: string; chapter: number; verse: number; text: string }[]>([])
  const [msg, setMsg] = useState("")
  const version = locale === "en" ? "kjv" : "lsg"

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const ref = parseReference(q)
    if (ref) {
      router.push(`/bible/${ref.book.id.toLowerCase()}/${ref.chapter}${ref.verse ? `?v=${ref.verse}` : ""}`)
      return
    }
    setMsg("")
    const res = await fetch(`/api/bible/search?v=${version}&q=${encodeURIComponent(q)}`)
    const data = await res.json()
    if (data.reference) {
      router.push(`/bible/${String(data.reference.book).toLowerCase()}/${data.reference.chapter}${data.reference.verse ? `?v=${data.reference.verse}` : ""}`)
      return
    }
    setHits(data.results || [])
    if (!data.results?.length) setMsg(locale === "fr" ? "Aucun verset trouvé." : "No verse found.")
  }

  return (
    <div>
      <p className="kicker">{version === "lsg" ? t.versionLsg : t.versionKjv}</p>
      <div className="section-title"><h2>{t.bible}</h2></div>
      <form onSubmit={onSubmit}>
        <input data-testid="bible-search" className="search" value={q} onChange={e => setQ(e.target.value)} placeholder={t.search} />
      </form>
      {msg && <p className="muted">{msg}</p>}
      {hits.map(hit => {
        const book = BOOKS.find(b => b.id === hit.book)
        const name = locale === "fr" ? book?.fr : book?.en
        return (
          <a key={`${hit.book}${hit.chapter}${hit.verse}`} className="verse" href={`/bible/${hit.book.toLowerCase()}/${hit.chapter}?v=${hit.verse}`}>
            <b>{hit.verse}</b>
            <span><strong>{name} {hit.chapter}:{hit.verse}. </strong>{hit.text}</span>
            <span />
          </a>
        )
      })}
      <h3>{t.ot}</h3>
      <div className="books">
        {BOOKS.filter(b => b.testament === "OT").map(b => (
          <a key={b.id} href={`/bible/${b.id.toLowerCase()}`}>{locale === "fr" ? b.fr : b.en}</a>
        ))}
      </div>
      <h3>{t.nt}</h3>
      <div className="books">
        {BOOKS.filter(b => b.testament === "NT").map(b => (
          <a key={b.id} href={`/bible/${b.id.toLowerCase()}`}>{locale === "fr" ? b.fr : b.en}</a>
        ))}
      </div>
    </div>
  )
}
