"use client"
import { createContext, useContext, useMemo, useState } from "react"

export type Locale = "fr" | "en"
const Ctx = createContext<{ locale: Locale; setLocale: (l: Locale) => void }>({ locale: "fr", setLocale: () => {} })

export function LocaleProvider({ initial, children }: { initial: Locale; children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initial)
  const setLocale = (next: Locale) => {
    document.cookie = `mtusda_locale=${next};path=/;max-age=31536000`
    document.documentElement.lang = next
    setLocaleState(next)
  }
  const value = useMemo(() => ({ locale, setLocale }), [locale])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
export function useLocale() { return useContext(Ctx) }

const copy = {
  fr: {
    city: "Kinshasa",
    tag: "Église adventiste du septième jour",
    home: "Accueil", bible: "Bible", hymns: "Cantiques", lessons: "Leçons", community: "Communauté",
    books: "Livres", church: "Église", account: "Compte", translate: "Traduction",
    hero: "Le sabbat au milieu de la ville.",
    heroSub: "Bible, cantiques, leçons et vie d'église. Le contenu public se lit sans compte.",
    open: "Ouvrir",
    search: "Chercher un verset ou des mots",
    versionKjv: "King James, 1769",
    versionLsg: "Louis Segond, 1910",
    ot: "Ancien Testament", nt: "Nouveau Testament",
    bookmark: "Signet", note: "Note", save: "Enregistrer",
    hymnsLead: "Louange, sabbat, mission, envoi. Textes du domaine public ou adaptations originales. Pas le recueil officiel.",
    lessonsLead: "Leçons exemples, écrites pour MTUSDA. Ce n'est pas le cahier trimestriel.",
    pdf: "L'église pourra déposer ici le PDF officiel qu'elle a le droit de diffuser. Rien n'est importé tant que ce droit n'est pas là.",
    communityLead: "Annonces et rendez-vous visibles sans compte. Les membres connectés peuvent écrire.",
    events: "Rendez-vous", posts: "Mur", prayers: "Prières", announce: "Annonces",
    login: "Entrer", signup: "Créer un compte", demo: "Entrer avec le compte démo",
    logout: "Sortir", publish: "Publier l'annonce",
    postPlaceholder: "Un mot pour l'église…",
    translateLead: "Traduction d'un verset ou d'une annonce. Le texte vient d'un service extérieur. S'il échoue, rien n'est inventé.",
    from: "Depuis", to: "Vers", go: "Traduire",
    notFound: "Cette page n'existe pas.", back: "Retour à l'accueil",
    sample: "Exemple à remplacer",
    read: "Lire",
    sabbath: "Samedi",
    hours: "École du sabbat 8 h 30 · Culte 10 h 00 · Jeunes l'après-midi · Clôture au coucher du soleil.",
    englishBooks: "Texte anglais du domaine public. L'interface est en français. Aucune traduction automatique n'est affichée comme si elle était l'original.",
  },
  en: {
    city: "Kinshasa",
    tag: "Seventh-day Adventist church",
    home: "Home", bible: "Bible", hymns: "Hymns", lessons: "Lessons", community: "Community",
    books: "Books", church: "Church", account: "Account", translate: "Translate",
    hero: "Sabbath in the middle of the city.",
    heroSub: "Bible, hymns, lessons, and church life. Public reading needs no account.",
    open: "Open",
    search: "Search a reference or words",
    versionKjv: "King James, 1769",
    versionLsg: "Louis Segond, 1910",
    ot: "Old Testament", nt: "New Testament",
    bookmark: "Bookmark", note: "Note", save: "Save",
    hymnsLead: "Adoration, Sabbath, mission, sending. Public-domain texts or original adaptations. Not the official hymnal.",
    lessonsLead: "Sample lessons written for MTUSDA. This is not the quarterly.",
    pdf: "The church can place here an official PDF it has the right to share. Nothing official is imported until then.",
    communityLead: "Announcements and gatherings are visible without an account. Signed-in members can write.",
    events: "Gatherings", posts: "Wall", prayers: "Prayer", announce: "Announcements",
    login: "Sign in", signup: "Create an account", demo: "Enter with the demo account",
    logout: "Sign out", publish: "Publish announcement",
    postPlaceholder: "A word for the church…",
    translateLead: "Translate a verse or an announcement. The wording comes from an outside service. If it fails, nothing is invented.",
    from: "From", to: "To", go: "Translate",
    notFound: "This page does not exist.", back: "Back home",
    sample: "Sample, to be replaced",
    read: "Read",
    sabbath: "Saturday",
    hours: "Sabbath School 8:30 · Worship 10:00 · Youth in the afternoon · Close at sunset.",
    englishBooks: "Public-domain English text. The interface follows your language. No machine translation is presented as the original.",
  },
} as const

export function useCopy() {
  const { locale } = useLocale()
  return copy[locale]
}
