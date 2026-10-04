\"use client\"
import Link from \"next/link\"
import { useLocale, useCopy } from \"@/components/locale\"

type Topic = {
  key: string
  title_fr: string
  title_en: string
  body_fr: string
  body_en: string
  href: string
}

export default function AdventistInfoPage() {
  const { locale } = useLocale()
  const t = useCopy()

  const topics: Topic[] = [
    {
      key: \"jesus-center\",
      title_fr: \"Jésus au centre\",
      title_en: \"Jesus at the Center\",
      body_fr:
        \"Tout ce que nous sommes et faisons s'oriente vers Jésus : sa vie, sa mort, et sa résurrection. Il est notre Sauveur et notre modèle pour la vie quotidienne.\",
      body_en:
        \"Everything we believe and practice points to Jesus—His life, death, and resurrection. He is our Savior and the pattern for everyday living.\",
      href: \"https://www.askanadventistfriend.com/\",
    },
    {
      key: \"bible-creed\",
      title_fr: \"La Bible, seule autorité\",
      title_en: \"The Bible, Our Guide\",
      body_fr:
        \"La Bible est la référence finale pour la foi et la vie. Nous cherchons à comprendre son message complet, centré sur l'Évangile.\",
      body_en:
        \"The Bible is our final guide for faith and life. We seek its whole message, centered on the gospel.\",
      href: \"https://www.askanadventistfriend.com/\",
    },
    {
      key: \"sabbath\",
      title_fr: \"Le sabbat du septième jour\",
      title_en: \"The Seventh‑day Sabbath\",
      body_fr:
        \"Chaque semaine, du vendredi soir au samedi soir, nous mettons à part un temps de repos, d'adoration et de service. C'est un cadeau de Dieu.\",
      body_en:
        \"From Friday sunset to Saturday sunset, we set aside time for rest, worship, and service. It is God's gift in time.\",
      href: \"https://www.askanadventistfriend.com/\",
    },
    {
      key: \"health\",
      title_fr: \"Vivre en santé\",
      title_en: \"Healthful Living\",
      body_fr:
        \"Le corps est un don de Dieu : nous honorons ce don par des choix sobres, le repos, la prière et l'attention aux autres. Pas de programme imposé—des habitudes bienveillantes.\",
      body_en:
        \"Our bodies are God's gift. We honor that gift with thoughtful choices, rest, prayer, and caring for others—not a rigid program, but kind habits.\",
      href: \"https://www.askanadventistfriend.com/\",
    },
    {
      key: \"beginnings\",
      title_fr: \"Origines au XIXᵉ siècle\",
      title_en: \"Beginnings in the 1800s\",
      body_fr:
        \"L'Église adventiste naît au milieu des années 1800 autour de l'espérance du retour de Jésus. Des croyants se sont unis pour vivre et partager cette espérance.\",
      body_en:
        \"The Adventist Church formed in the mid‑1800s around the hope of Jesus’ return, as believers joined to live and share that hope.\",
      href: \"https://www.askanadventistfriend.com/\",
    },
    {
      key: \"education\",
      title_fr: \"Éducation adventiste\",
      title_en: \"Adventist Education\",
      body_fr:
        \"Former toute la personne : l'esprit, le corps et l'âme. Nos écoles cherchent l'excellence, le service et une foi vécue.\",
      body_en:
        \"We educate the whole person—mind, body, and spirit. Our schools value excellence, service, and a lived faith.\",
      href: \"https://www.askanadventistfriend.com/\",
    },
    {
      key: \"evangelism\",
      title_fr: \"Annonce de l’Évangile\",
      title_en: \"Sharing the Good News\",
      body_fr:
        \"Par des relations simples, des études bibliques et des actions utiles, nous témoignons de l'amour de Dieu—près d'ici et au loin.\",
      body_en:
        \"Through simple relationships, Bible study, and practical help, we share God’s love—nearby and far away.\",
      href: \"https://www.askanadventistfriend.com/\",
    },
    {
      key: \"church-life\",
      title_fr: \"La vie d'église\",
      title_en: \"Everyday Church Life\",
      body_fr:
        \"Un sabbat typique comprend l'École du sabbat, le culte, parfois un repas fraternel, des activités de jeunesse et une clôture au coucher du soleil.\",
      body_en:
        \"A typical Sabbath includes Sabbath School, worship, sometimes a shared meal, youth activities, and closing at sunset.\",
      href: \"https://www.askanadventistfriend.com/\",
    },
  ]

  return (
    <div>
      <p className=\"kicker\">MTUSDA · {t.city}</p>
      <div className=\"section-title\">
        <h2>{locale === \"fr\" ? \"Découvrir l’Église adventiste\" : \"Discover the Adventist Church\"}</h2>
      </div>
      <p className=\"muted\">
        {locale === \"fr\"
          ? \"Courtes présentations écrites pour cette application. Pour des articles complets, visitez le site AskanAdventistFriend.\"
          : \"Short explainers written for this app. For full articles, visit AskanAdventistFriend.\"}
        {\" \"}
        <a href=\"https://www.askanadventistfriend.com/\" target=\"_blank\" rel=\"noopener noreferrer\">askanadventistfriend.com</a>
      </p>
      <div className=\"grid-2\" style={{ marginTop: 12 }}>
        {topics.map((it) => (
          <section key={it.key} className=\"card\">
            <h3>{locale === \"fr\" ? it.title_fr : it.title_en}</h3>
            <p className=\"muted\">{locale === \"fr\" ? it.body_fr : it.body_en}</p>
            <p className=\"muted\" style={{ marginTop: 8 }}>
              <a href={it.href} target=\"_blank\" rel=\"noopener noreferrer\">
                {locale === \"fr\" ? \"En savoir plus\" : \"Learn more\"}
              </a>
            </p>
          </section>
        ))}
      </div>
      <div className=\"row\" style={{ marginTop: 16 }}>
        <Link className=\"btn\" href=\"/eglise\">{locale === \"fr\" ? \"Retour à l’Église\" : \"Back to Church\"}</Link>
        <Link className=\"btn-ghost\" href=\"/communaute\">{t.community}</Link>
      </div>
    </div>
  )
}

