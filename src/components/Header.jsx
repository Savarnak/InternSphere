import React, { useEffect, useState } from 'react'
import { FiLayers, FiUser, FiBarChart2 } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle.jsx'
import SearchBar from './SearchBar.jsx'
import Logo from './Logo.jsx'

export default function Header({ onOpenProfile, onOpenDashboard, searchValue, onSearchChange }) {
  const [compact, setCompact] = useState(false)
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/95 dark:bg-slate-950/95 border-b border-white/30 dark:border-white/10 shadow-lg transition-all duration-200 ${compact ? 'py-2' : 'py-3 md:py-4'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-white/40 dark:border-white/10 shadow-glass">
            <Logo size={28} />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-semibold tracking-tight">InternSphere</h1>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">Find internships from multiple sources in one place</p>
          </div>
        </div>
        <div className="hidden md:flex flex-1 items-center max-w-2xl mx-4">
          <SearchBar value={searchValue} onChange={onSearchChange} />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenProfile}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border border-white/40 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 backdrop-blur text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition"
          >
            <FiUser />
            <span className="hidden sm:inline">Profile</span>
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={onOpenDashboard}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg px-3 py-2 border border-white/40 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 backdrop-blur text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition"
          >
            <FiBarChart2 />
            <span>Dashboard</span>
          </button>
          {/* Star button removed as requested */}
        </div>
      </div>
    </header>
  )
}
