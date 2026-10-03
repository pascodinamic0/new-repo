"use client"
import { useEffect, useRef, useState } from "react"

export function useReadAloud(lang: string) {
  const [index, setIndex] = useState(-1)
  const [on, setOn] = useState(false)
  const gen = useRef(0)
  const at = useRef(0)
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)
  const keep = useRef(0)

  function clearKeep() {
    if (keep.current) {
      window.clearInterval(keep.current)
      keep.current = 0
    }
  }

  useEffect(() => () => {
    gen.current += 1
    clearKeep()
    window.speechSynthesis?.cancel()
  }, [])

  function stop() {
    gen.current += 1
    clearKeep()
    window.speechSynthesis?.cancel()
    utterRef.current = null
    setOn(false)
    setIndex(-1)
    at.current = 0
  }

  function speak(lines: string[], start = 0) {
    const synth = window.speechSynthesis
    if (!synth || !lines.length) return
    gen.current += 1
    const mine = gen.current
    clearKeep()
    synth.cancel()
    setOn(true)
    const run = (i: number) => {
      if (mine !== gen.current) return
      if (i >= lines.length) {
        setOn(false)
        setIndex(-1)
        at.current = 0
        clearKeep()
        return
      }
      at.current = i
      setIndex(i)
      const utter = new SpeechSynthesisUtterance(lines[i])
      utterRef.current = utter
      utter.lang = lang
      utter.rate = 0.92
      utter.onend = () => run(i + 1)
      utter.onerror = (event) => {
        if (mine !== gen.current) return
        const reason = (event as SpeechSynthesisErrorEvent).error
        if (reason === "interrupted" || reason === "canceled") return
        setOn(false)
      }
      synth.speak(utter)
    }
    // iOS drops an utterance spoken in the same turn as cancel().
    window.setTimeout(() => {
      if (mine !== gen.current) return
      try { synth.getVoices() } catch { /* no voice list yet */ }
      keep.current = window.setInterval(() => {
        if (mine !== gen.current) {
          clearKeep()
          return
        }
        if (synth.paused) synth.resume()
      }, 8000)
      run(start)
    }, 80)
  }

  function toggle(lines: string[]) {
    if (on) stop()
    else speak(lines, at.current > 0 && at.current < lines.length ? at.current : 0)
  }

  return { index, on, toggle, stop, speak }
}
