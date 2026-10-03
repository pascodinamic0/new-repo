"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Pause, Play, Share2, Star } from "lucide-react"
import hymns from "@/data/hymns.json"
import { useCopy, useLocale } from "@/components/locale"
import { useReadAloud } from "@/components/readAloud"

export default function HymnPage() {
  const { slug } = useParams<{ slug: string }>()
  const { locale } = useLocale()
  const t = useCopy()
  const index = hymns.findIndex(item => item.slug === slug)
  const hymn = hymns[index]
  const speech = useReadAloud(locale === "fr" ? "fr-FR" : "en-US")
  const [star, setStar] = useState(false)
  const [toast, setToast] = useState("")
  useEffect(() => {
    setStar(localStorage.getItem(`mtusda-star-${slug}`) === "1")
    speech.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])
  const lines = useMemo(() => {
    if (!hymn) return []
    return hymn.stanzas.map(stanza => (locale === "fr" && stanza.fr.trim() ? stanza.fr : stanza.en).replace(/\n/g, " "))
  }, [hymn, locale])
  if (!hymn) return <p>{t.notFound}</p>
  const title = locale === "fr" ? hymn.title_fr : hymn.title_en
  const other = locale === "fr" ? "en" : "fr"
  function toggleStar() {
    const next = !star
    setStar(next)
    localStorage.setItem(`mtusda-star-${slug}`, next ? "1" : "0")
  }
  async function share() {
    const text = hymn.stanzas.map((stanza, i) => `${i + 1}\n${locale === "fr" && stanza.fr.trim() ? stanza.fr : stanza.en}`).join("\n\n")
    const payload = `${hymn.number}. ${title}\n\n${text}`
    if (navigator.share) {
      try { await navigator.share({ title, text: payload }); return } catch { /* cancelled */ }
    }
    await navigator.clipboard.writeText(payload)
    setToast(locale === "fr" ? "Texte copié." : "Text copied.")
  }
  const prev = hymns[(index - 1 + hymns.length) % hymns.length]
  const next = hymns[(index + 1) % hymns.length]
  return (
    <article style={{ paddingBottom: 96 }}>
      <div className="reader-bar">
        <Link href="/cantiques" aria-label={t.hymns}><ChevronLeft size={20} /></Link>
        <b style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {hymn.number}. {title}
        </b>
        <div className="hymn-tools">
          <button type="button" aria-label={locale === "fr" ? "Favori" : "Favorite"} onClick={toggleStar}>
            <Star size={20} fill={star ? "currentColor" : "none"} />
          </button>
          <button type="button" aria-label={locale === "fr" ? "Partager" : "Share"} onClick={share}>
            <Share2 size={20} />
          </button>
        </div>
      </div>
      {toast && <div className="toast" role="status">{toast}</div>}
      <div data-testid="lyrics">
        {hymn.stanzas.map((stanza, i) => {
          const text = locale === "fr" && stanza.fr.trim() ? stanza.fr : stanza.en
          return (
            <section key={i} className={speech.index === i ? "stanza speaking" : "stanza"} data-speaking={speech.index === i ? "true" : "false"}>
              <div className="n">{i + 1}</div>
              <p>{text}</p>
            </section>
          )
        })}
      </div>
      <h3>{locale === "fr" ? hymn.title_en : hymn.title_fr}</h3>
      {hymn.stanzas.map((stanza, i) => {
        const text = other === "fr" ? stanza.fr : stanza.en
        if (!text.trim()) return null
        return (
          <section key={`o${i}`} className="stanza">
            <div className="n">{i + 1}</div>
            <p className="muted">{text}</p>
          </section>
        )
      })}
      <p className="muted">{hymn.rights}</p>
      <div className="listen-bar">
        <Link href={`/cantiques/${prev.slug}`} aria-label={locale === "fr" ? "Précédent" : "Previous"}><ChevronLeft size={22} /></Link>
        <button type="button" className="go" data-testid="play" aria-label={speech.on ? "Pause" : "Play"} onClick={() => speech.toggle(lines)}>
          {speech.on ? <Pause size={26} /> : <Play size={26} />}
        </button>
        <Link href={`/cantiques/${next.slug}`} aria-label={locale === "fr" ? "Suivant" : "Next"}><ChevronRight size={22} /></Link>
      </div>
    </article>
  )
}
