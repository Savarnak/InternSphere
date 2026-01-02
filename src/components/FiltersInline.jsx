import React, { Fragment, useMemo, useState } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { FiChevronDown, FiMapPin, FiBriefcase, FiDatabase, FiTag } from 'react-icons/fi'

export default function FiltersInline({ facets, selected, onChange }) {
  const [showMore, setShowMore] = useState(false)

  const primary = useMemo(() => ([
    { key: 'locations', label: 'Location', icon: FiMapPin, options: facets.locations },
    { key: 'modes', label: 'Work Mode', icon: FiBriefcase, options: facets.modes },
  ]), [facets])

  const advanced = useMemo(() => ([
    { key: 'sources', label: 'Source', icon: FiDatabase, options: facets.sources },
    { key: 'skills', label: 'Skills', icon: FiTag, options: facets.skills },
  ]), [facets])

  const isChecked = (key, val) => (selected[key] || []).includes(val)
  const toggle = (key, val) => {
    const curr = selected[key] || []
    const exists = curr.includes(val)
    const next = exists ? curr.filter((v) => v !== val) : [...curr, val]
    onChange[key](next)
  }

  const Group = ({ g, limit }) => (
    <fieldset className="rounded-xl bg-white/60 dark:bg-slate-900/40 backdrop-blur p-3 border border-white/40 dark:border-white/10">
      <legend className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500 mb-2">
        <g.icon className="opacity-70" /> {g.label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {(limit ? g.options.slice(0, limit) : g.options).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(g.key, opt)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              isChecked(g.key, opt)
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white/70 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
            aria-pressed={isChecked(g.key, opt)}
          >
            {opt}
          </button>
        ))}
        {limit && g.options.length > limit && (
          <button type="button" className="px-3 py-1.5 rounded-lg text-sm border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/40" onClick={() => setShowMore(true)}>
            + more
          </button>
        )}
      </div>
      {showMore && g.key === 'skills' && (
        <div className="mt-2 flex flex-wrap gap-2">
          {g.options.slice(8).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(g.key, opt)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                isChecked(g.key, opt)
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white/70 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              aria-pressed={isChecked(g.key, opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </fieldset>
  )

  return (
    <div className="rounded-2xl bg-white/60 dark:bg-slate-900/40 backdrop-blur p-3 border border-white/40 dark:border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {primary.map((g) => (
          <Group key={g.key} g={g} />
        ))}
      </div>
      <Disclosure as={Fragment}>
        {({ open }) => (
          <div className="mt-3">
            <Disclosure.Button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
              <FiChevronDown className={`transition ${open ? 'rotate-180' : ''}`} />
              <span>More Filters</span>
            </Disclosure.Button>
            <Transition as={Fragment} enter="transition ease-out duration-150" enterFrom="opacity-0 -translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Disclosure.Panel>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {advanced.map((g) => (
                    <Group key={g.key} g={g} limit={g.key === 'skills' ? 8 : undefined} />
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-500">Skills help improve match accuracy.</p>
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
    </div>
  )
}
