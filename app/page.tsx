"use client"
import Link from "next/link"
import { BookOpen, Calendar, GraduationCap, Languages, MoreHorizontal, Music, Users, Video } from "lucide-react"
import { useCopy, useLocale } from "@/components/locale"

const lamp = {
  fr: { ref: "Psaume 119:105", text: "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier." },
  en: { ref: "Psalm 119:105", text: "Thy word is a lamp unto my feet, and a light unto my path." },
}
const daily = {
  fr: { ref: "Jean 3:16", text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.", href: "/bible/john/3?v=16" },
  en: { ref: "John 3:16", text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.", href: "/bible/john/3?v=16" },
}

export default function HomePage() {
  const t = useCopy()
  const { locale } = useLocale()
  const v = lamp[locale]
  const d = daily[locale]
  const tiles = [
    { href: "/bible", title: t.bible, icon: BookOpen, tone: "t-bible" },
    { href: "/cantiques", title: t.hymns, icon: Music, tone: "t-hymns" },
    { href: "/lecons", title: t.lessons, icon: GraduationCap, tone: "t-lessons" },
    { href: "/traduction", title: t.translate, icon: Languages, tone: "t-translate" },
    { href: "/communaute", title: t.community, icon: Users, tone: "t-community" },
    { href: "/communaute#rdv", title: locale === "fr" ? "Agenda" : "Events", icon: Calendar, tone: "t-events" },
    { href: "/cantiques", title: locale === "fr" ? "Média" : "Media", icon: Video, tone: "t-media" },
    { href: "/plus", title: locale === "fr" ? "Plus" : "More", icon: MoreHorizontal, tone: "t-more" },
  ]
  return (
    <div>
      <section className="hero">
        <img src="/images/bible.jpg" alt="" />
        <div className="shade" />
        <div className="copy">
          <p className="kicker">{v.ref}</p>
          <h1>{v.text}</h1>
        </div>
      </section>
      <div className="tiles">
        {tiles.map(item => (
          <Link key={item.tone} href={item.href} className={`tile ${item.tone}`}>
            <item.icon size={22} />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
      <Link href={d.href} className="verse-card" data-testid="verse-of-day">
        <p className="kicker" style={{ color: "var(--gold)" }}>{locale === "fr" ? "Verset du jour" : "Verse of the day"}</p>
        <p>{d.text}</p>
        <b>{d.ref}</b>
      </Link>
      <div className="today">
        <Link href="/bible/john/3">
          <span className="muted">{locale === "fr" ? "Lecture du jour" : "Today's reading"}</span>
          <b>{locale === "fr" ? "Jean 3" : "John 3"}</b>
        </Link>
        <Link href="/cantiques/amazing-grace">
          <span className="muted">{t.hymns}</span>
          <b>{locale === "fr" ? "Grâce étonnante" : "Amazing Grace"}</b>
        </Link>
        <Link href="/lecons/sabbat-cadeau">
          <span className="muted">{t.lessons}</span>
          <b>{locale === "fr" ? "Le sabbat, un cadeau" : "The Sabbath, a gift"}</b>
        </Link>
        <div className="panel" style={{ margin: 0 }}>
          <span className="muted">{t.sabbath}</span>
          <b>{t.hours}</b>
        </div>
      </div>
    </div>
  )
}
