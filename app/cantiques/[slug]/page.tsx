"use client"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Pause, Play, SkipBack, SkipForward } from "lucide-react"
import hymns from "@/data/hymns.json"
import { useCopy, useLocale } from "@/components/locale"

function clock(n: number) {
  if (!Number.isFinite(n) || n < 0) return "0:00"
  const m = Math.floor(n / 60)
  const s = Math.floor(n % 60)
  return `${m}:${String(s).padStart(2, "0")}`
}

export default function HymnPage() {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()
  const hymn = hymns.find(item => item.slug === slug)
  const { locale } = useLocale()
  const t = useCopy()
  const audio = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [dur, setDur] = useState(0)
  const index = hymns.findIndex(item => item.slug === slug)
  useEffect(() => { setPlaying(false); setTime(0); setDur(0) }, [slug])
  if (!hymn) return <p>{t.notFound}</p>
  const title = locale === "fr" ? hymn.title_fr : hymn.title_en
  const otherTitle = locale === "fr" ? hymn.title_en : hymn.title_fr
  const lyrics = locale === "fr" ? hymn.lyrics_fr : hymn.lyrics_en
  const other = locale === "fr" ? hymn.lyrics_en : hymn.lyrics_fr
  function go(step: number) {
    const next = hymns[(index + step + hymns.length) % hymns.length]
    router.push(`/cantiques/${next.slug}`)
  }
  function toggle() {
    const node = audio.current
    if (!node) return
    if (node.paused) node.play().catch(() => setPlaying(false))
    else node.pause()
  }
  return (
    <article>
      <p className="kicker"><Link href="/cantiques">{t.hymns}</Link> · N° {hymn.number}</p>
      <div className="hymn-art">
        <img src="/images/bible.jpg" alt="" />
        <div className="shade" />
        <div className="copy">
          <div className="kicker">{locale === "fr" ? "Cantique" : "Hymn"} · N° {hymn.number}</div>
          <h2>{title}</h2>
          <p>{locale === "fr" ? hymn.author_fr : hymn.author_en}</p>
        </div>
      </div>
      {hymn.audio ? (
        <div className="player">
          <button type="button" aria-label={locale === "fr" ? "Précédent" : "Previous"} onClick={() => go(-1)}><SkipBack size={18} /></button>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button data-testid="play" type="button" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
                {playing ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <b>{title}</b>
                <div className="meta">{clock(time)} / {clock(dur || 0)}</div>
                <input
                  type="range"
                  min={0}
                  max={dur || 0}
                  step={0.1}
                  value={Math.min(time, dur || 0)}
                  aria-label={locale === "fr" ? "Progression" : "Progress"}
                  onChange={e => {
                    const next = Number(e.target.value)
                    if (audio.current) audio.current.currentTime = next
                    setTime(next)
                  }}
                />
              </div>
            </div>
          </div>
          <button type="button" aria-label={locale === "fr" ? "Suivant" : "Next"} onClick={() => go(1)}><SkipForward size={18} /></button>
          <audio
            ref={audio}
            src={hymn.audio}
            preload="metadata"
            data-testid="audio"
            onEnded={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={e => setTime(e.currentTarget.currentTime)}
            onLoadedMetadata={e => setDur(e.currentTarget.duration)}
          />
        </div>
      ) : (
        <p className="muted">{hymn.audioCredit}</p>
      )}
      <div className="panel" style={{ marginTop: 14 }}>
        <div className="lyrics" data-testid="lyrics">{lyrics}</div>
      </div>
      <div className="section-title"><h2>{otherTitle}</h2></div>
      <div className="panel">
        <div className="lyrics alt">{other}</div>
      </div>
      <p className="muted">{locale === "fr" ? hymn.frCredit : hymn.audioCredit}</p>
    </article>
  )
}
