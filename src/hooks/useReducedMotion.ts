import { useState, useEffect } from 'react'

/**
 * Returns true if the user prefers reduced motion (OS setting)
 * OR if they've toggled the manual motion-off control on the site.
 */
export function useReducedMotion(): boolean {
  const [osPrefers, setOsPrefers] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setOsPrefers(mq.matches)
    const handler = (e: MediaQueryListEvent) => setOsPrefers(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return osPrefers
}
