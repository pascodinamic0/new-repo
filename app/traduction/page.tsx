"use client"
import { useState } from "react"
import { useCopy, useLocale } from "@/components/locale"
export default function TranslatePage() {
  const t = useCopy()
  const { locale } = useLocale()
  const [text, setText] = useState("")
  const [from, setFrom] = useState(locale === "fr" ? "fr" : "en")
  const [out, setOut] = useState("")
  const [err, setErr] = useState("")
  const to = from === "fr" ? "en" : "fr"
  async function go() {
    setErr(""); setOut("")
    const res = await fetch("/api/translate", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text, from, to }) })
    const json = await res.json()
    if (!res.ok) setErr(json.error || "La traduction est indisponible pour le moment.")
    else setOut(json.translation)
  }
  return (
    <div className="reader">
      <p className="kicker">MTUSDA</p>
      <div className="section-title"><h2>{t.translate}</h2></div>
      <p className="muted">{t.translateLead}</p>
      <div className="row">
        <button className="btn-ghost" onClick={() => setFrom(from === "fr" ? "en" : "fr")}>{t.from} {from.toUpperCase()} → {to.toUpperCase()}</button>
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder={locale === "fr" ? "Collez un verset ou une annonce" : "Paste a verse or an announcement"} />
      <button className="btn" onClick={go}>{t.go}</button>
      {err && <div className="toast" role="status">{err}</div>}
      {out && <div className="panel" style={{ marginTop: 12 }} data-testid="translation"><p>{out}</p></div>}
    </div>
  )
}
