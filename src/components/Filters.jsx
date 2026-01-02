import React, { Fragment, useMemo } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { FiChevronDown, FiFilter } from 'react-icons/fi'

function Checkbox({ label, checked, onChange, id }) {
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
    </div>
  )
}

export default function Filters({ facets, selected, onChange }) {
  const groups = useMemo(() => [
    { key: 'locations', label: 'Location', options: facets.locations },
    { key: 'sources', label: 'Source', options: facets.sources },
    { key: 'modes', label: 'Work Mode', options: facets.modes },
    { key: 'skills', label: 'Skills', options: facets.skills },
  ], [facets])

  const isChecked = (key, val) => selected[key].includes(val)
  const toggle = (key, val) => {
    const exists = selected[key].includes(val)
    const next = exists ? selected[key].filter((v) => v !== val) : [...selected[key], val]
    onChange[key](next)
  }

  return (
    <div className="mt-4">
      <Disclosure defaultOpen>
        {({ open }) => (
          <div className="border-t md:border-t-0 border-slate-200 dark:border-slate-800 mt-2 pt-3">
            <Disclosure.Button className="w-full flex items-center justify-between rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
              <div className="flex items-center gap-2">
                <FiFilter className="text-brand-600" />
                <span className="font-medium">Filters</span>
              </div>
              <FiChevronDown className={`transition ${open ? 'rotate-180' : ''}`} />
            </Disclosure.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 -translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Disclosure.Panel className="pt-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {groups.map((g) => (
                    <fieldset key={g.key} className="rounded-xl bg-white/60 dark:bg-slate-900/40 backdrop-blur p-3 border border-white/40 dark:border-white/10">
                      <legend className="text-xs uppercase tracking-wide text-slate-500 mb-2">{g.label}</legend>
                      <div className="flex flex-wrap gap-2">
                        {g.options.map((opt) => (
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
                    </fieldset>
                  ))}
                </div>
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
    </div>
  )
}
