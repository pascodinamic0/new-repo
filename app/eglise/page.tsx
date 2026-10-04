"use client"
import Link from "next/link"
import { useCopy, useLocale } from "@/components/locale"
export default function ChurchPage() {
  const t = useCopy()
  const { locale } = useLocale()
  const deps = locale === "fr" ? [
    ["École du sabbat", "Étude de la Bible chaque samedi matin, avant le culte. Les leçons de l'application sont des exemples."],
    ["Ministères personnels", "Visites, études bibliques et attention aux voisins de la commune."],
    ["Jeunesse / JA", "Les jeunes accueillent, chantent et servent. Ce n'est pas un programme vide."],
    ["Santé", "Un geste simple : eau, repas, visite. Sans humilier personne."],
  ] : [
    ["Sabbath School", "Bible study every Saturday morning, before worship. Lessons in the app are samples."],
    ["Personal Ministries", "Visits, Bible studies, and care for neighbors."],
    ["Youth / AY", "Young people welcome, sing, and serve. Not an empty program."],
    ["Health", "A simple act: water, a meal, a visit. Without shaming anyone."],
  ]
  return (
    <div>
      <p className="kicker">MTUSDA · {t.city}</p>
      <div className="section-title"><h2>{t.church}</h2></div>
      <div className="panel">
        <h3>{t.sabbath}</h3>
        <p>{t.hours}</p>
        <p className="muted">{locale === "fr" ? "Salle de culte MTUSDA, Kinshasa. Le samedi est le jour de culte." : "MTUSDA worship room, Kinshasa. Saturday is the day of worship."}</p>
      </div>
      <div className="row" style={{ marginTop: 12 }}>
        <Link className="btn" href="/eglise/adventistes">
          {locale === "fr" ? "Découvrir les adventistes" : "About Adventists"}
        </Link>
        <Link className="btn-ghost" href="/communaute">
          {t.community}
        </Link>
      </div>
      <div className="grid-2" style={{ marginTop: 12 }}>
        {deps.map(([title, body]) => (
          <section key={title} className="card"><h3>{title}</h3><p className="muted">{body}</p></section>
        ))}
      </div>
      <div className="row" style={{ marginTop: 16 }}>
        <Link className="btn" href="/lecons">{t.lessons}</Link>
        <Link className="btn-ghost" href="/bible">{t.bible}</Link>
      </div>
    </div>
  )
}
