"use client"
import Link from "next/link"
import { BookOpen, GraduationCap, Library, Music, Users } from "lucide-react"
import { useCopy, useLocale } from "@/components/locale"

const verse = {
  fr: { ref: "Jean 3:16", text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.", href: "/bible/john/3?v=16" },
  en: { ref: "John 3:16", text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.", href: "/bible/john/3?v=16" },
}

export default function HomePage() {
  const t = useCopy()
  const { locale } = useLocale()
  const v = verse[locale]
  const features = [
    { href: "/bible", title: t.bible, text: locale === "fr" ? "Louis Segond 1910, lecture et recherche." : "King James Version, reading and search.", icon: BookOpen },
    { href: "/cantiques", title: t.hymns, text: locale === "fr" ? "Paroles françaises et anglaises, audio." : "French and English lyrics, with audio.", icon: Music },
    { href: "/lecons", title: t.lessons, text: locale === "fr" ? "Leçons exemples à lire, pas un cahier officiel." : "Sample lessons you can read, not an official quarterly.", icon: GraduationCap },
    { href: "/communaute", title: t.community, text: locale === "fr" ? "Annonces, rendez-vous et messages." : "Announcements, gatherings, and posts.", icon: Users },
  ]
  return (
    <div>
      <section className="hero">
        <img src="/images/light.jpg" alt="" />
        <div className="shade" />
        <div className="copy">
          <p className="kicker">MTUSDA · {t.tag}</p>
          <h1>{t.hero}</h1>
          <p>{t.heroSub}</p>
        </div>
      </section>
      <div className="section-title"><h2>{t.sabbath}</h2></div>
      <div className="panel sabbath">
        <div>
          <b>{locale === "fr" ? "Prochain culte" : "Next worship"}</b>
          <div className="muted">{t.hours}</div>
        </div>
        <Link className="btn" href="/eglise">{t.open}</Link>
      </div>
      <div className="grid-2" style={{ marginTop: 14 }}>
        {features.map(item => (
          <Link key={item.href} href={item.href} className="card feature">
            <span className="iconblob"><item.icon size={18} /></span>
            <h3>{item.title}</h3>
            <div className="muted">{item.text}</div>
          </Link>
        ))}
      </div>
      <div className="section-title"><h2>{v.ref}</h2><Link href={v.href}>{t.read}</Link></div>
      <Link href={v.href} className="panel" data-testid="verse-of-day">
        <p style={{ fontFamily: "var(--display)", fontSize: 22, lineHeight: 1.4, marginTop: 0 }}>{v.text}</p>
      </Link>
      <div className="row" style={{ marginTop: 16 }}>
        <Link className="btn-ghost" href="/traduction">{t.translate}</Link>
        <Link className="btn-ghost" href="/livres">{t.books}</Link>
        <Link className="btn-ghost" href="/compte">{t.account}</Link>
      </div>
      <div className="section-title"><h2>{t.books}</h2><Link href="/livres">{t.open}</Link></div>
      <Link href="/livres" className="card" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 12, alignItems: "center" }}>
        <img src="/images/bible.jpg" alt="" style={{ height: 88, width: 120, objectFit: "cover", borderRadius: 14 }} />
        <div>
          <Library size={16} />
          <h3 style={{ margin: "6px 0" }}>{locale === "fr" ? "Steps to Christ, The Great Controversy, The Desire of Ages" : "Steps to Christ, The Great Controversy, The Desire of Ages"}</h3>
          <div className="muted">{t.englishBooks}</div>
        </div>
      </Link>
    </div>
  )
}
