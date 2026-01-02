import React from 'react'

const palette = {
  linkedin: 'text-sky-800 bg-sky-100 border-sky-200 dark:text-sky-200 dark:bg-sky-900/30 dark:border-sky-800',
  indeed: 'text-indigo-800 bg-indigo-100 border-indigo-200 dark:text-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-800',
  internshala: 'text-cyan-800 bg-cyan-100 border-cyan-200 dark:text-cyan-200 dark:bg-cyan-900/30 dark:border-cyan-800',
  'company site': 'text-emerald-800 bg-emerald-100 border-emerald-200 dark:text-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800',
}

export default function Badge({ children, variant }) {
  const key = String(variant || '').toLowerCase()
  const color = palette[key] || 'text-slate-800 bg-slate-100 border-slate-200 dark:text-slate-200 dark:bg-slate-800/40 dark:border-slate-700'
  return (
    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium border shadow-sm ${color}`}>
      {children}
    </span>
  )
}
