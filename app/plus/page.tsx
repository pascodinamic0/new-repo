"use client"
import Link from "next/link"
import { useCopy, useLocale } from "@/components/locale"

export default function MorePage() {
  const t = useCopy()
  const { locale } = useLocale()
  const links = [
    { href: "/livres", title: t.books, text: t.englishBooks },
    { href: "/eglise", title: t.church, text: t.hours },
    { href: "/traduction", title: t.translate, text: t.translateLead },
    { href: "/compte", title: t.account, text: locale === "fr" ? "Signets, notes, et le compte démo." : "Bookmarks, notes, and the demo account." },
  ]
  return (
    <div>
      <p className="kicker">MTUSDA</p>
      <div className="section-title"><h2>{locale === "fr" ? "Plus" : "More"}</h2></div>
      <div className="grid-2">
        {links.map(item => (
          <Link key={item.href} href={item.href} className="card">
            <h3>{item.title}</h3>
            <p className="muted">{item.text}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
