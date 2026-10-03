"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { Bell, BookOpen, Church, GraduationCap, Home, Languages, Library, Music, Users } from "lucide-react"
import { useCopy, useLocale } from "./locale"

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const router = useRouter()
  const { locale, setLocale } = useLocale()
  const t = useCopy()
  const [q, setQ] = useState("")
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
    { href: "/plus", label: locale === "fr" ? "Plus" : "More", icon: Library },
  ]
  const active = (href: string) => href === "/" ? path === "/" : path.startsWith(href)
  function search(e: FormEvent) {
    e.preventDefault()
    const query = q.trim()
    router.push(query ? `/bible?q=${encodeURIComponent(query)}` : "/bible")
  }
  const Lang = ({ test }: { test: string }) => (
    <div className="lang">
      <button className={locale === "fr" ? "on" : ""} data-testid={test === "side" ? "lang-fr" : "lang-fr-mobile"} onClick={() => setLocale("fr")}>FR</button>
      <button className={locale === "en" ? "on" : ""} data-testid="lang-en" onClick={() => setLocale("en")}>EN</button>
    </div>
  )
  return (
    <div className="app">
      <aside className="sidebar">
        <img className="side-logo" src="/logo.png" alt="MTUSDA" />
        {[...items, ...more.filter(m => m.href !== "/plus")].map(item => (
          <Link key={item.href} href={item.href} className={active(item.href) ? "active" : ""}>{item.label}</Link>
        ))}
        <Lang test="side" />
      </aside>
      <div className="frame">
        <header className="topbar">
          <Link href="/" className="brand" aria-label="MTUSDA">
            <span className="mark"><img src="/logo-mark.png" alt="" /></span>
            <span><b>MTUSDA</b></span>
          </Link>
          <form className="searchform" onSubmit={search} role="search">
            <input
              aria-label={t.search}
              placeholder={locale === "fr" ? "Chercher" : "Search"}
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </form>
          <div className="tools">
            <Link href="/communaute" className="iconbtn" aria-label={t.announce}>
              <Bell size={18} />
              <span className="dot" />
            </Link>
            <Lang test="mobile" />
          </div>
        </header>
        <main className="main">{children}</main>
      </div>
      <nav className="bottom">
        {items.map(item => (
          <Link key={item.href} href={item.href} className={active(item.href) ? "active" : ""}>
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
