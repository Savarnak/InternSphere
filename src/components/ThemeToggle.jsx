import React, { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const applyTheme = (isDark) => {
      const root = document.documentElement
      const body = document.body
      root.classList.toggle('dark', isDark)
      if (body) body.classList.toggle('dark', isDark)
      setDark(isDark)
    }

    const loadInitial = () => {
      const saved = localStorage.getItem('theme')
      const prefers = mq.matches
      const isDark = saved ? saved === 'dark' : prefers
      applyTheme(isDark)
    }

    // Initial
    loadInitial()

    // Respond to system changes if user hasn't explicitly chosen
    const onChange = () => {
      const saved = localStorage.getItem('theme')
      if (!saved) applyTheme(mq.matches)
    }
    mq.addEventListener?.('change', onChange)

    // Cross-tab sync
    const onStorage = (e) => {
      if (e.key === 'theme') loadInitial()
    }
    window.addEventListener('storage', onStorage)

    return () => {
      mq.removeEventListener?.('change', onChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const toggle = () => {
    const next = !dark
    const root = document.documentElement
    const body = document.body
    root.classList.toggle('dark', next)
    if (body) body.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    setDark(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border border-white/40 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 backdrop-blur text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition"
      aria-label="Toggle dark mode"
    >
      {dark ? <FiSun /> : <FiMoon />}
      <span className="hidden sm:inline">{dark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
