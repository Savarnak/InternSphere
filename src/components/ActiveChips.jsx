import React from 'react'

export default function ActiveChips({ selections, onRemove, onClearAll }) {
  const { locations = [], sources = [], modes = [], skills = [] } = selections || {}
  const chips = [
    ...locations.map((v) => ({ key: `loc:${v}`, facet: 'locations', value: v })),
    ...sources.map((v) => ({ key: `src:${v}`, facet: 'sources', value: v })),
    ...modes.map((v) => ({ key: `mode:${v}`, facet: 'modes', value: v })),
    ...skills.map((v) => ({ key: `skill:${v}`, facet: 'skills', value: v })),
  ]

  if (chips.length === 0) return null

  return (
    <div className="mt-2 flex items-center justify-between gap-2">
      <div className="flex gap-2 overflow-x-auto scrollbar-thin pr-1" role="list" aria-label="Active filters">
        {chips.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => onRemove[c.facet] && onRemove[c.facet](c.value)}
            className="shrink-0 inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 px-3 py-1 text-xs hover:bg-slate-50 dark:hover:bg-slate-800"
            aria-label={`Remove ${c.value}`}
          >
            <span>{c.value}</span>
            <span aria-hidden>×</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onClearAll}
        className="text-sm text-slate-600 dark:text-slate-300 hover:underline"
      >
        Clear all
      </button>
    </div>
  )
}
