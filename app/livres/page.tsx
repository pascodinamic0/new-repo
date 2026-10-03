"use client"
import Link from "next/link"
import { useCopy } from "@/components/locale"
const books = [
  { slug: "steps-to-christ", title: "Steps to Christ", year: 1892 },
  { slug: "great-controversy", title: "The Great Controversy", year: 1911 },
  { slug: "desire-of-ages", title: "The Desire of Ages", year: 1898 },
]
export default function BooksPage() {
  const t = useCopy()
  return (
    <div>
      <p className="kicker">Ellen G. White</p>
      <div className="section-title"><h2>{t.books}</h2></div>
      <p className="muted">{t.englishBooks}</p>
      <div className="grid-2">
        {books.map(book => (
          <Link key={book.slug} href={`/livres/${book.slug}`} className="card">
            <div className="muted">{book.year} · public domain</div>
            <h3>{book.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
