"use client"
import Link from "next/link"
import lessons from "@/data/lessons.json"
import { useCopy, useLocale } from "@/components/locale"

export default function LessonsPage() {
  const { locale } = useLocale()
  const t = useCopy()
  return (
    <div>
      <p className="kicker">{locale === "fr" ? "École du sabbat" : "Sabbath School"}</p>
      <div className="section-title"><h2>{t.lessons}</h2></div>
      <p className="muted">{t.lessonsLead}</p>
      <div className="feed">
        {lessons.map((lesson, i) => {
          const first = lesson.sections[0]
          const body = locale === "fr" ? first.body_fr : first.body_en
          return (
            <Link key={lesson.slug} href={`/lecons/${lesson.slug}`} className="card lesson-row" data-testid={`lesson-${lesson.slug}`}>
              <span className="lesson-no">{i + 1}</span>
              <span>
                <h3 style={{ marginTop: 0 }}>{locale === "fr" ? lesson.title_fr : lesson.title_en}</h3>
                <div className="muted">{locale === "fr" ? first.title_fr : first.title_en}</div>
                <p className="muted" style={{ marginBottom: 0 }}>{body.slice(0, 180)}…</p>
              </span>
            </Link>
          )
        })}
      </div>
      <div className="empty" style={{ marginTop: 16 }} data-testid="pdf-empty">
        <b>{locale === "fr" ? "Cahier officiel" : "Official quarterly"}</b>
        <p className="muted">{t.pdf}</p>
      </div>
    </div>
  )
}
