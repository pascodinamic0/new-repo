"use client"
import Link from "next/link"
import { useState } from "react"
import hymns from "@/data/hymns.json"
import { useCopy, useLocale } from "@/components/locale"

const cats = ["adoration", "sabbath", "mission", "closing"] as const

export default function HymnsPage() {
  const { locale } = useLocale()
  const t = useCopy()
  const [cat, setCat] = useState<(typeof cats)[number] | "all">("all")
  const labels = locale === "fr"
    ? { adoration: "Adoration", sabbath: "Sabbat", mission: "Mission", closing: "Envoi", all: "Tous" }
    : { adoration: "Adoration", sabbath: "Sabbath", mission: "Mission", closing: "Sending", all: "All" }
  const list = hymns.filter(h => cat === "all" || h.cat === cat)
  return (
    <div>
      <p className="kicker">MTUSDA</p>
      <div className="section-title"><h2>{t.hymns}</h2></div>
      <p className="muted">{t.hymnsLead}</p>
      <div className="chips">
        {(["all", ...cats] as const).map(id => (
          <button key={id} className={cat === id ? "chip on" : "chip"} onClick={() => setCat(id)}>{labels[id]}</button>
        ))}
      </div>
      <div className="grid-2" style={{ marginTop: 12 }}>
        {list.map(hymn => (
          <Link key={hymn.slug} href={`/cantiques/${hymn.slug}`} className="card hymn" data-testid={`hymn-${hymn.slug}`}>
            <div>
              <div className="muted">{labels[hymn.cat as typeof cats[number]]}</div>
              <h3>{locale === "fr" ? hymn.title_fr : hymn.title_en}</h3>
              <div className="muted">{locale === "fr" ? hymn.author_fr : hymn.author_en}</div>
            </div>
            <span className="btn">{t.open}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
