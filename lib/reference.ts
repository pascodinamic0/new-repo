import { BOOKS, bookById, type BookInfo } from "./canon"

export function fold(input: string) {
  return input
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[’']/g, "'")
}

export type ScriptureRef = { book: BookInfo; chapter: number; verse?: number }

export function parseReference(query: string): ScriptureRef | null {
  if (!query?.trim()) return null
  let text = fold(query).replace(/\s+/g, " ").trim()
  text = text.replace(/(\d)\s*[,.]\s*(\d)/g, "$1:$2")
  let bookPart = ""
  let chapter = 0
  let verse: number | undefined
  const withVerse = text.match(/^(.*?)\s+(\d+)\s*:\s*(\d+)\s*$/)
  const chapterOnly = text.match(/^(.*?)\s+(\d+)\s*$/)
  if (withVerse) {
    bookPart = withVerse[1]
    chapter = Number(withVerse[2])
    verse = Number(withVerse[3])
  } else if (chapterOnly) {
    bookPart = chapterOnly[1]
    chapter = Number(chapterOnly[2])
  } else {
    return null
  }
  const book = matchBook(bookPart)
  if (!book || chapter < 1 || chapter > book.chapters) return null
  if (verse !== undefined && (verse < 1 || verse > 200)) return null
  return { book, chapter, verse }
}

function matchBook(name: string): BookInfo | null {
  const spaced = fold(name).replace(/\s+/g, " ").trim()
  const tight = spaced.replace(/\s/g, "")
  if (!spaced) return null
  const aliases = BOOKS.flatMap(book => book.aliases.map(alias => ({ book, alias: fold(alias) })))
  aliases.sort((a, b) => b.alias.length - a.alias.length)
  for (const item of aliases) {
    const aTight = item.alias.replace(/\s/g, "")
    if (spaced === item.alias || tight === aTight) return item.book
  }
  return null
}

export function refLabel(ref: ScriptureRef, locale: "fr" | "en") {
  const name = locale === "fr" ? ref.book.fr : ref.book.en
  return ref.verse ? `${name} ${ref.chapter}:${ref.verse}` : `${name} ${ref.chapter}`
}

export { bookById }
