"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { bookById } from "@/lib/canon"
import { useCopy, useLocale } from "@/components/locale"

export default function BookPage() {
  const params = useParams<{ book: string }>()
  const book = bookById(params.book)
  const { locale } = useLocale()
  const t = useCopy()
  if (!book) return <p>{t.notFound}</p>
  const name = locale === "fr" ? book.fr : book.en
  return (
    <div>
      <p className="kicker"><Link href="/bible">{t.bible}</Link></p>
      <div className="section-title"><h2>{name}</h2></div>
      <div className="chapters">
        {Array.from({ length: book.chapters }, (_, i) => (
          <Link key={i + 1} href={`/bible/${book.id.toLowerCase()}/${i + 1}`}>{i + 1}</Link>
        ))}
      </div>
    </div>
  )
}
