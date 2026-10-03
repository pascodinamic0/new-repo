"use client"
import Link from "next/link"
import { useCopy } from "@/components/locale"
export default function NotFound() {
  const t = useCopy()
  return (
    <section className="panel">
      <p className="kicker">404</p>
      <h1 style={{ fontFamily: "var(--display)", fontSize: 42, marginTop: 0 }}>{t.notFound}</h1>
      <Link className="btn" href="/">{t.back}</Link>
    </section>
  )
}
