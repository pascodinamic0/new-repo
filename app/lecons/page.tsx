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
      <div className="grid-2">
        {lessons.map(lesson => (
          <Link key={lesson.slug} href={`/lecons/${lesson.slug}`} className="card" data-testid={`lesson-${lesson.slug}`}>
            <div className="muted">{t.sample}</div>
            <h3>{locale === "fr" ? lesson.title_fr : lesson.title_en}</h3>
            <p className="muted">{locale === "fr" ? lesson.summary_fr : lesson.summary_en}</p>
          </Link>
        ))}
      </div>
      <div className="empty" style={{ marginTop: 16 }} data-testid="pdf-empty">
        <b>{locale === "fr" ? "Cahier officiel" : "Official quarterly"}</b>
        <p className="muted">{t.pdf}</p>
      </div>
    </div>
  )
}
