import React from 'react'
import { FiSearch } from 'react-icons/fi'

export default function SearchBar({ value, onChange }) {
  return (
    <label className="relative block w-full" aria-label="Search internships">
      <span className="sr-only">Search internships</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
        <FiSearch />
      </span>
      <input
        type="text"
        placeholder="Search by role, company, or skill..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 backdrop-blur px-10 py-3 text-sm md:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
      />
    </label>
  )
}
