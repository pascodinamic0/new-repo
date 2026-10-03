import { describe, expect, it } from "vitest"
import { parseReference } from "../lib/reference"

describe("parseReference", () => {
  it("reads English and French references", () => {
    expect(parseReference("John 3:16")?.book.id).toBe("John")
    expect(parseReference("John 3:16")).toMatchObject({ chapter: 3, verse: 16 })
    expect(parseReference("Jean 3:16")?.book.id).toBe("John")
    expect(parseReference("Jn 3:16")?.verse).toBe(16)
    expect(parseReference("Jean 3,16")?.verse).toBe(16)
    expect(parseReference("Jean 3.16")?.verse).toBe(16)
  })

  it("reads numbered books and psalms", () => {
    expect(parseReference("1 Jean 1:9")).toMatchObject({ chapter: 1, verse: 9 })
    expect(parseReference("1 Jean 1:9")?.book.id).toBe("1John")
    expect(parseReference("1 John 1:9")?.book.id).toBe("1John")
    expect(parseReference("Psaume 23")).toMatchObject({ chapter: 23 })
    expect(parseReference("Psaume 23")?.book.id).toBe("Ps")
    expect(parseReference("Ps 23:1")?.verse).toBe(1)
    expect(parseReference("Cantique des Cantiques 2:1")?.book.id).toBe("Song")
  })

  it("rejects word searches and impossible chapters", () => {
    expect(parseReference("dieu aime le monde")).toBeNull()
    expect(parseReference("for God so loved")).toBeNull()
    expect(parseReference("John 99:1")).toBeNull()
    expect(parseReference("")).toBeNull()
  })
})
