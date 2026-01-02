import React, { Fragment, useEffect, useMemo, useRef } from 'react'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { FiCheck, FiChevronDown, FiUser, FiZap, FiMapPin, FiBookOpen, FiClock, FiX } from 'react-icons/fi'

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate']
const domains = ['Frontend', 'Backend', 'Full Stack', 'Data Science', 'UI/UX', 'Mobile', 'DevOps', 'Cybersecurity']
const locations = ['Remote', 'Bengaluru', 'Hyderabad', 'Mumbai', 'Pune', 'Chennai', 'Delhi']
const availability = ['1 month', '2 months', '3 months', '6 months']

function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</label>
      {children}
    </div>
  )
}

function Select({ value, onChange, options, placeholder }) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 backdrop-blur px-3 py-2 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-brand-500">
          <span className="truncate text-sm">{value || placeholder}</span>
          <FiChevronDown className="ml-2 opacity-70" />
        </Listbox.Button>
        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
          <Listbox.Options className="absolute mt-1 max-h-72 sm:max-h-80 w-full overflow-auto rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg focus:outline-none z-50">
            {options.map((opt) => (
              <Listbox.Option key={opt} value={opt} className={({ active }) => `cursor-pointer select-none px-3 py-2 text-sm ${active ? 'bg-brand-50 dark:bg-slate-800' : ''}`}>
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {selected && <FiCheck />}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default function StudentProfileDialog({ open, onClose, profile, updateField, reset }) {
  const onSave = () => onClose(true)
  const initialRef = useRef(profile)
  useEffect(() => {
    if (open) initialRef.current = { ...profile }
  }, [open])

  const hasChanges = useMemo(() => {
    const a = initialRef.current || {}
    const b = profile || {}
    return (
      (a.year || '') !== (b.year || '') ||
      (a.domain || '') !== (b.domain || '') ||
      (a.location || '') !== (b.location || '') ||
      (a.availability || '') !== (b.availability || '')
    )
  }, [profile])

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => onClose(false)}>
        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Dialog.Panel className="w-full max-w-lg transform rounded-2xl border border-white/40 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 backdrop-blur shadow-glass max-h-[85vh] overflow-y-auto">
                <button
                  type="button"
                  onClick={() => onClose(false)}
                  className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/70 dark:bg-slate-900/60 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-white/90 dark:hover:bg-slate-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  aria-label="Close profile"
                >
                  <FiX />
                </button>
                <div className="relative">
                  <div className="h-28 bg-gradient-to-r from-brand-600 via-indigo-500 to-emerald-500 rounded-t-2xl shadow-[inset_0_-10px_30px_rgba(255,255,255,0.15)]"></div>
                  <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl pointer-events-none" />
                  <div className="px-5 -mt-12">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-white text-brand-700 shadow-glass"><FiUser /></div>
                      <div>
                        <Dialog.Title className="text-lg font-semibold">Your Profile</Dialog.Title>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Personalize recommendations with your interests</p>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs" aria-live="polite">
                      {profile.year && <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer" onClick={() => document.querySelector('#field-year')?.focus()}>{profile.year}</span>}
                      {profile.domain && <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer" onClick={() => document.querySelector('#field-domain')?.focus()}>{profile.domain}</span>}
                      {profile.location && <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer" onClick={() => document.querySelector('#field-location')?.focus()}>{profile.location}</span>}
                      {profile.availability && <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer" onClick={() => document.querySelector('#field-availability')?.focus()}>{profile.availability}</span>}
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Year of study">
                      <div className="flex items-center gap-2" id="field-year">
                        <FiBookOpen className="opacity-70" />
                        <Select value={profile.year} onChange={(v) => updateField('year', v)} options={years} placeholder="Select year" />
                      </div>
                    </Field>
                    <Field label="Domain interest">
                      <div className="flex flex-col gap-2" id="field-domain">
                        <div className="flex items-center gap-2">
                          <FiZap className="opacity-70" />
                          <Select value={profile.domain} onChange={(v) => updateField('domain', v)} options={domains} placeholder="Select domain" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {['Frontend', 'Backend', 'Data Science', 'UI/UX'].map((d) => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => updateField('domain', d)}
                              className={`px-3 py-1.5 rounded-full text-xs border transition transform active:scale-95 ${profile.domain === d ? 'bg-brand-600 text-white border-brand-600 ring-1 ring-brand-400 shadow-sm' : 'bg-white/70 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                              aria-pressed={profile.domain === d}
                            >
                              <span className="inline-block align-middle mr-1">{d}</span>
                              {profile.domain === d && <FiCheck className="inline align-middle" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </Field>
                    <Field label="Preferred location">
                      <div className="flex flex-col gap-2" id="field-location">
                        <div className="flex items-center gap-2">
                          <FiMapPin className="opacity-70" />
                          <Select value={profile.location} onChange={(v) => updateField('location', v)} options={locations} placeholder="Select location" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {['Remote', 'Bengaluru', 'Mumbai'].map((loc) => (
                            <button
                              key={loc}
                              type="button"
                              onClick={() => updateField('location', loc)}
                              className={`px-3 py-1.5 rounded-full text-xs border transition transform active:scale-95 ${profile.location === loc ? 'bg-emerald-600 text-white border-emerald-600 ring-1 ring-emerald-400 shadow-sm' : 'bg-white/70 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                              aria-pressed={profile.location === loc}
                            >
                              <span className="inline-block align-middle mr-1">{loc}</span>
                              {profile.location === loc && <FiCheck className="inline align-middle" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </Field>
                    <Field label="Availability (months)">
                      <div className="flex items-center gap-2" id="field-availability">
                        <FiClock className="opacity-70" />
                        <Select value={profile.availability} onChange={(v) => updateField('availability', v)} options={availability} placeholder="Select duration" />
                      </div>
                    </Field>
                  </div>

                  <div className="pt-2 md:pt-2">
                    <div className="md:static sticky bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/70 backdrop-blur border-t border-white/40 dark:border-white/10 px-0 md:px-0 py-3 flex items-center justify-between">
                      <button type="button" onClick={reset} className="text-sm text-slate-600 dark:text-slate-300 hover:underline">Reset</button>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => onClose(false)} className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm">Cancel</button>
                        <button type="button" onClick={onSave} className={`px-3 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 ${hasChanges ? 'motion-safe:animate-softpulse' : ''}`}>Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
