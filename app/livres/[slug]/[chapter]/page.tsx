"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useCopy } from "@/components/locale"
export default function BookChapter() {
  const params = useParams<{ slug: string; chapter: string }>()
  const t = useCopy()
  const [data, setData] = useState<{ title: string; paragraphs: string[] } | null>(null)
  useEffect(() => {
    fetch(`/api/books?slug=${params.slug}&chapter=${params.chapter}`).then(r => r.json()).then(setData)
  }, [params.slug, params.chapter])
  if (!data?.paragraphs) return <p className="muted">…</p>
  return (
    <article className="reader">
      <p className="kicker"><Link href={`/livres/${params.slug}`}>{t.books}</Link></p>
      <div className="section-title"><h2>{data.title}</h2></div>
      {data.paragraphs.map((p, i) => <p key={i} style={{ lineHeight: 1.7 }}>{p}</p>)}
    </article>
  )
}
