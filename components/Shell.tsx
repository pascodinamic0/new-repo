"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { BookOpen, Church, Home, Languages, Music, Users, GraduationCap, Library } from "lucide-react"
import { useCopy, useLocale } from "./locale"

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden>
      <path d="M8 18c8-8 24-8 32 0" fill="none" stroke="#e6d3a3" strokeWidth="3" strokeLinecap="round"/>
      <path d="M24 16 L10 24 L10 38 L24 32 Z" fill="#f6efe6"/>
      <path d="M24 16 L38 24 L38 38 L24 32 Z" fill="#e7c9a0"/>
    </svg>
  )
}

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const { locale, setLocale } = useLocale()
  const t = useCopy()
  const [splash, setSplash] = useState(false)
  useEffect(() => {
    if (!sessionStorage.getItem("mtusda-splash")) {
      setSplash(true)
      sessionStorage.setItem("mtusda-splash", "1")
      const id = setTimeout(() => setSplash(false), 900)
      return () => clearTimeout(id)
    }
  }, [])
  useEffect(() => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {})
  }, [])
  const items = [
    { href: "/", label: t.home, icon: Home },
    { href: "/bible", label: t.bible, icon: BookOpen },
    { href: "/cantiques", label: t.hymns, icon: Music },
    { href: "/lecons", label: t.lessons, icon: GraduationCap },
    { href: "/communaute", label: t.community, icon: Users },
  ]
  const more = [
    { href: "/livres", label: t.books, icon: Library },
    { href: "/eglise", label: t.church, icon: Church },
    { href: "/traduction", label: t.translate, icon: Languages },
    { href: "/compte", label: t.account, icon: Users },
  ]
  const active = (href: string) => href === "/" ? path === "/" : path.startsWith(href)
  return (
    <div className="app">
      {splash && (
        <div className="splash">
          <div>
            <div className="mark" style={{ margin: "0 auto 12px" }}><Mark /></div>
            <div className="kicker">MTUSDA</div>
            <h1 style={{ fontFamily: "var(--display)", margin: 0 }}>{t.city}</h1>
          </div>
        </div>
      )}
      <aside className="sidebar">
        <div className="sideword">MTUSDA</div>
        {[...items, ...more].map(item => (
          <Link key={item.href} href={item.href} className={active(item.href) ? "active" : ""}>{item.label}</Link>
        ))}
        <div style={{ marginTop: "auto" }} className="lang">
          <button className={locale === "fr" ? "on" : ""} data-testid="lang-fr" onClick={() => setLocale("fr")}>FR</button>
          <button className={locale === "en" ? "on" : ""} data-testid="lang-en" onClick={() => setLocale("en")}>EN</button>
        </div>
      </aside>
      <div>
        <header className="topbar">
          <Link href="/" className="brand">
            <span className="mark"><Mark /></span>
            <span><b>MTUSDA</b><span>{t.city}</span></span>
          </Link>
          <div className="tools">
            <div className="lang">
              <button className={locale === "fr" ? "on" : ""} data-testid="lang-fr-mobile" onClick={() => setLocale("fr")}>FR</button>
              <button className={locale === "en" ? "on" : ""} data-testid="lang-en" onClick={() => setLocale("en")}>EN</button>
            </div>
            <Link href="/compte" className="iconbtn" aria-label={t.account}><Users size={18} /></Link>
          </div>
        </header>
        <main className="main">{children}</main>
      </div>
      <nav className="bottom">
        {items.map(item => (
          <Link key={item.href} href={item.href} className={active(item.href) ? "active" : ""}>
            <item.icon size={18} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
