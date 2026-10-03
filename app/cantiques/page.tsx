"use client"
import Link from "next/link"
import hymns from "@/data/hymns.json"
import { useCopy, useLocale } from "@/components/locale"

export default function HymnsPage() {
  const { locale } = useLocale()
  const t = useCopy()
  return (
    <div>
      <p className="kicker">{locale === "fr" ? "Domaine public" : "Public domain"}</p>
      <div className="section-title"><h2>{t.hymns}</h2></div>
      <p className="muted">{t.hymnsLead}</p>
      <div>
        {hymns.map(hymn => (
          <Link key={hymn.slug} href={`/cantiques/${hymn.slug}`} className="hymn-line" data-testid={`hymn-${hymn.slug}`}>
            <b>{hymn.number}</b>
            <span>{locale === "fr" ? hymn.title_fr : hymn.title_en}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
