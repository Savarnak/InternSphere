import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { FiChevronDown, FiFilter } from 'react-icons/fi'

export default function ResultsHeader({ count, sort, onChangeSort, focusEnabled, activeCount = 0, onOpenFilters }) {
  const options = [
    { key: 'match', label: 'Match' },
    { key: 'latest', label: 'Latest' },
  ]
  const current = options.find((o) => o.key === sort) || options[0]

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">{count} {count === 1 ? 'internship' : 'internships'} found</h2>
        {focusEnabled && (
          <span className="px-2 py-1 text-xs rounded-md bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-brand-800">Focus Mode</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 text-sm"
        >
          <FiFilter className="text-brand-600" />
          <span>Filters{activeCount > 0 ? ` (${activeCount})` : ''}</span>
        </button>

        <Listbox value={current} onChange={(o) => onChangeSort(o.key)}>
          <div className="relative w-40">
            <Listbox.Button className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 backdrop-blur px-3 py-2 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm">
              <span>Sort: {current.label}</span>
              <FiChevronDown className="opacity-70" />
            </Listbox.Button>
            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Listbox.Options className="absolute right-0 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg focus:outline-none z-50">
                {options.map((o) => (
                  <Listbox.Option key={o.key} value={o} className={({ active }) => `cursor-pointer select-none px-3 py-2 text-sm ${active ? 'bg-slate-100 dark:bg-slate-800' : ''}`}>
                    {o.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  )
}
