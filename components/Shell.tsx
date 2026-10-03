"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FormEvent, useEffect, useRef, useState } from "react"
import { Bell, BookOpen, Church, GraduationCap, Home, Languages, Library, Music, Search, Users, X } from "lucide-react"
import { useCopy, useLocale } from "./locale"

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const router = useRouter()
  const { locale, setLocale } = useLocale()
  const t = useCopy()
  const [q, setQ] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [splash, setSplash] = useState<"in" | "out" | "off">("off")
  const field = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {})
  }, [])
  useEffect(() => {
    let seen = false
    try { seen = sessionStorage.getItem("mtusda-splash") === "1" } catch { /* private mode */ }
    if (seen) return
    try { sessionStorage.setItem("mtusda-splash", "1") } catch { /* ignore */ }
    setSplash("in")
    const hold = window.setTimeout(() => setSplash("out"), 1100)
    const done = window.setTimeout(() => setSplash("off"), 1550)
    return () => { window.clearTimeout(hold); window.clearTimeout(done) }
  }, [])
  useEffect(() => {
    if (searchOpen) field.current?.focus()
  }, [searchOpen])
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
    setSearchOpen(false)
    router.push(query ? `/bible?q=${encodeURIComponent(query)}` : "/bible")
  }
  const Lang = ({ test }: { test: string }) => (
    <div className={test === "side" ? "lang" : "lang-icons"} role="group" aria-label={locale === "fr" ? "Langue" : "Language"}>
      <button type="button" className={locale === "fr" ? "on" : ""} data-testid={test === "side" ? "lang-fr" : "lang-fr-mobile"} onClick={() => setLocale("fr")}>FR</button>
      <button type="button" className={locale === "en" ? "on" : ""} data-testid="lang-en" onClick={() => setLocale("en")}>EN</button>
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
            <b>MTUSDA</b>
          </Link>
          <div className="head-actions">
            <Lang test="mobile" />
            <button type="button" className="iconhit" aria-label={t.search} onClick={() => setSearchOpen(true)}>
              <Search size={20} />
            </button>
            <Link href="/communaute#annonces" className="iconhit" aria-label={t.announce}>
              <Bell size={20} />
              <span className="dot" />
            </Link>
          </div>
        </header>
        {searchOpen && (
          <div className="search-sheet" role="dialog" aria-modal="true" aria-label={t.search} onClick={() => setSearchOpen(false)}>
            <form className="search-panel" role="search" onSubmit={search} onClick={e => e.stopPropagation()}>
              <div className="search-row">
                <Search size={18} />
                <input
                  ref={field}
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder={t.search}
                  aria-label={t.search}
                  enterKeyHint="search"
                />
                <button type="button" className="iconhit" aria-label={locale === "fr" ? "Fermer" : "Close"} onClick={() => setSearchOpen(false)}>
                  <X size={18} />
                </button>
              </div>
              <button className="btn" type="submit">{locale === "fr" ? "Chercher dans la Bible" : "Search the Bible"}</button>
            </form>
          </div>
        )}
        <main className="main"><div key={path} className="page">{children}</div></main>
      </div>
      <nav className="bottom">
        {items.map(item => (
          <Link key={item.href} href={item.href} className={active(item.href) ? "active" : ""}>
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      {splash !== "off" && (
        <div className={splash === "out" ? "splash out" : "splash"} aria-hidden="true">
          <div className="splash-mark">
            <img src="/logo-mark.png" alt="" />
            <b>MTUSDA</b>
          </div>
        </div>
      )}
    </div>
  )
}
