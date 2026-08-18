import { useCallback, useEffect, useState } from 'react'

const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

const VOICE_QUALITY_HINTS = ['natural', 'neural', 'premium', 'google']

function pickBestPtBrVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices().filter((v) => {
    const lang = v.lang.toLowerCase()
    return lang === 'pt-br' || lang === 'pt_br' || lang.startsWith('pt-br')
  })
  const ptVoices = voices.length
    ? voices
    : window.speechSynthesis
        .getVoices()
        .filter((v) => v.lang.toLowerCase().startsWith('pt'))

  const byQuality = ptVoices.find((v) =>
    VOICE_QUALITY_HINTS.some((hint) => v.name.toLowerCase().includes(hint)),
  )
  return byQuality ?? ptVoices[0]
}

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    if (!isSupported) return
    window.speechSynthesis.getVoices()
    const loadVoices = () => window.speechSynthesis.getVoices()
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
    return () =>
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices)
  }, [])

  const stop = useCallback(() => {
    if (!isSupported) return
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!isSupported) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    const voice = pickBestPtBrVoice()
    if (voice) utterance.voice = voice
    utterance.lang = 'pt-BR'
    utterance.rate = 0.95
    utterance.onend = () => {
      setIsSpeaking(false)
      onEnd?.()
    }
    utterance.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.speak(utterance)
    setIsSpeaking(true)
  }, [])

  useEffect(() => stop, [stop])

  return { isSupported, isSpeaking, speak, stop }
}
