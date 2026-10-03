import { NextResponse } from "next/server"
import { db } from "@/lib/db"
export async function GET() {
  const sql = db()
  const events = await sql`select id, title_fr, title_en, description_fr, description_en, starts_at, location from events order by starts_at asc`
  return NextResponse.json({ events })
}
