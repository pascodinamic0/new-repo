"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useRef, useState } from "react"
import hymns from "@/data/hymns.json"
import { useCopy, useLocale } from "@/components/locale"

export default function HymnPage() {
  const { slug } = useParams<{ slug: string }>()
  const hymn = hymns.find(item => item.slug === slug)
  const { locale } = useLocale()
  const t = useCopy()
  const audio = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  if (!hymn) return <p>{t.notFound}</p>
  const title = locale === "fr" ? hymn.title_fr : hymn.title_en
  const lyrics = locale === "fr" ? hymn.lyrics_fr : hymn.lyrics_en
  return (
    <article>
      <p className="kicker"><Link href="/cantiques">{t.hymns}</Link></p>
      <div className="section-title"><h2>{title}</h2></div>
      <p className="muted">{locale === "fr" ? hymn.author_fr : hymn.author_en}</p>
      <div className="player">
        <button data-testid="play" onClick={() => {
          const node = audio.current
          if (!node) return
          if (node.paused) { node.play(); setPlaying(true) } else { node.pause(); setPlaying(false) }
        }}>{playing ? (locale === "fr" ? "Pause" : "Pause") : (locale === "fr" ? "Écouter" : "Play")}</button>
        <div>
          <b>{title}</b>
          <div style={{ opacity: .8, fontSize: 13 }}>{hymn.audioCredit}</div>
        </div>
      </div>
      <audio ref={audio} src={hymn.audio} preload="none" data-testid="audio" onEnded={() => setPlaying(false)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <div className="panel" style={{ marginTop: 14 }}>
        <div className="lyrics" data-testid="lyrics">{lyrics}</div>
      </div>
      <p className="muted">{locale === "fr" ? hymn.frCredit : hymn.audioCredit}</p>
    </article>
  )
}
