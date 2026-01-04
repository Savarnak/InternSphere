import React from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { Menu, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'


export default function InternshipCard({ data, score, progress, onOpen, focusedId, highlightLevel = 0 }) {
  const { title, company, location, source, mode, skills, url, postedAt } = data
  const isFocused = focusedId && focusedId === data.id
  return (
    <motion.article
      layoutId={`card-${data.id}`}
      layout
      transition={{ layout: { duration: 0.18 } }}
      onClick={() => onOpen && onOpen(data)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen && onOpen(data)
        }
      }}
      aria-selected={isFocused}
      className={`group cursor-pointer rounded-2xl border bg-white/70 dark:bg-slate-900/50 backdrop-blur shadow-glass hover:shadow-xl transition overflow-hidden hover:-translate-y-0.5 ${
        isFocused
          ? 'border-brand-300/70 dark:border-brand-400/40 ring-2 ring-brand-400/50'
          : 'border-white/40 dark:border-white/10 hover:border-brand-200/60 dark:hover:border-brand-400/30'
      } ${highlightLevel > 0 ? 'ring-1 ring-brand-400/30 border-brand-200/50' : ''}`}
    >
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight group-hover:text-brand-700 dark:group-hover:text-brand-400 transition">{title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{company}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          {(() => {
            const loc = (location || '').trim()
            const m = (mode || '').trim()
            const isRemoteDup = m.toLowerCase() === 'remote' && loc.toLowerCase().includes('remote')
            return (
              <>
                <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800">{loc}</span>
                {!isRemoteDup && <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800">{m}</span>}
              </>
            )
          })()}
          {postedAt && (() => {
            const ts = Date.parse(postedAt)
            const nice = Number.isNaN(ts)
              ? postedAt
              : new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
            return (
              <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800" title={postedAt}>{nice}</span>
            )
          })()}
        </div>

        {false && (
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 6).map((s) => (
              <span
                key={s}
                className="text-xs px-2 py-1 rounded-lg bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-200 border border-brand-100 dark:border-brand-800 transition-transform duration-150 will-change-transform hover:scale-[1.06]"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {false && typeof progress === 'number' && progress >= 0 && (
          <div className="mt-1" aria-label={`Match score ${Math.round(progress * 100)}%`}>
            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-brand-600 dark:bg-brand-500 transition-all duration-500 ease-out" style={{ width: `${Math.round(progress * 100)}%` }} />
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Match score: {Math.round(progress * 100)}%</div>
          </div>
        )}

        <div className="mt-2 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
          <span className="text-xs text-slate-500 dark:text-slate-400">View details →</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 transition motion-safe:group-hover:animate-softpulse"
            aria-label={`Apply for ${title} at ${company} on official site`}
          >
            <span>Apply on Official Site</span>
            <FiExternalLink />
          </a>
        </div>
      </div>
    </motion.article>
  )
}
