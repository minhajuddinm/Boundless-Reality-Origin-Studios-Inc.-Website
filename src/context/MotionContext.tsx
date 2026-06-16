import React, { createContext, useContext, useState, useEffect } from 'react'

interface MotionContextValue {
  motionEnabled: boolean
  toggleMotion: () => void
}

const MotionContext = createContext<MotionContextValue>({
  motionEnabled: true,
  toggleMotion: () => {},
})

export function MotionProvider({ children }: { children: React.ReactNode }) {
  // Start with motion enabled; then check OS preference
  const [motionEnabled, setMotionEnabled] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) setMotionEnabled(false)
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setMotionEnabled(false)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggleMotion = () => setMotionEnabled((v) => !v)

  return (
    <MotionContext.Provider value={{ motionEnabled, toggleMotion }}>
      {children}
    </MotionContext.Provider>
  )
}

export function useMotion() {
  return useContext(MotionContext)
}
