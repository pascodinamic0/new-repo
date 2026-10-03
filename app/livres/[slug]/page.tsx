"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useCopy } from "@/components/locale"
export default function BookIndex() {
  const { slug } = useParams<{ slug: string }>()
  const t = useCopy()
  const [meta, setMeta] = useState<{ title: string; year: number; chapters: { n: number; title: string }[] } | null>(null)
  useEffect(() => { fetch(`/api/books?slug=${slug}`).then(r => r.json()).then(setMeta) }, [slug])
  if (!meta?.chapters) return <p className="muted">…</p>
  return (
    <div>
      <p className="kicker"><Link href="/livres">{t.books}</Link> · {meta.year}</p>
      <div className="section-title"><h2>{meta.title}</h2></div>
      <p className="muted">{t.englishBooks}</p>
      <div className="list" style={{ display: "grid", gap: 8 }}>
        {meta.chapters.map(ch => (
          <Link className="item" key={ch.n} href={`/livres/${slug}/${ch.n}`}><b>{ch.n}.</b> {ch.title}</Link>
        ))}
      </div>
    </div>
  )
}
