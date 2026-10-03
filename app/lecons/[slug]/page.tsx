"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import lessons from "@/data/lessons.json"
import { useCopy, useLocale } from "@/components/locale"

export default function LessonPage() {
  const { slug } = useParams<{ slug: string }>()
  const lesson = lessons.find(item => item.slug === slug)
  const { locale } = useLocale()
  const t = useCopy()
  if (!lesson) return <p>{t.notFound}</p>
  return (
    <article className="reader">
      <p className="kicker"><Link href="/lecons">{t.lessons}</Link> · {t.sample}</p>
      <div className="section-title"><h2 data-testid="lesson-title">{locale === "fr" ? lesson.title_fr : lesson.title_en}</h2></div>
      <p className="muted">{locale === "fr" ? lesson.summary_fr : lesson.summary_en}</p>
      {lesson.sections.map(section => (
        <section key={section.id} className="panel" style={{ marginBottom: 12 }} data-testid="lesson-body">
          <h3>{locale === "fr" ? section.title_fr : section.title_en}</h3>
          <p style={{ lineHeight: 1.65 }}>{locale === "fr" ? section.body_fr : section.body_en}</p>
        </section>
      ))}
    </article>
  )
}
