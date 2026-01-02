import React, { Fragment, useMemo, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiX, FiBookOpen, FiStar, FiUserCheck } from 'react-icons/fi'
import Badge from './Badge.jsx'
import { explainFrom } from '../utils/explain.js'

export default function RoleDetail({ open, onClose, item }) {
  const [explain, setExplain] = useState(true)
  const sections = useMemo(() => {
    if (!item) return null
    return explainFrom(item.description || '', item.skills || [])
  }, [item])

  if (!item) return null

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/40 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <AnimatePresence>
              {open && (
                <motion.div layoutId={`card-${item.id}`} className="w-full max-w-3xl">
                  <div className="rounded-2xl border border-white/40 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 backdrop-blur shadow-glass overflow-hidden">
                    <div className="relative">
                      <div className="h-28 bg-gradient-to-r from-brand-600 via-indigo-500 to-emerald-500" />
                      <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 dark:bg-slate-900/70 border border-white/50 dark:border-white/10 text-white hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
                        aria-label="Close"
                      >
                        <FiX />
                      </button>
                      <div className="px-5 -mt-10">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="text-2xl font-semibold tracking-tight break-words">{item.title}</h3>
                            <p className="text-sm text-slate-100/90 break-words">{item.company}</p>
                          </div>
                          <div className="shrink-0">
                            <Badge variant={item.source}>{item.source}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 space-y-4">
                      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800">{item.location}</span>
                        <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800">{item.mode}</span>
                        {item.postedAt && <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800">{item.postedAt}</span>}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {(item.skills || []).slice(0, 10).map((s) => (
                          <span key={s} className="text-xs px-2 py-1 rounded-lg bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-200 border border-brand-100 dark:border-brand-800">{s}</span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setExplain((v) => !v)}
                            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                              explain ? 'bg-brand-600 text-white border-brand-600' : 'bg-white/70 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <FiBookOpen />
                            <span>Explain this role</span>
                          </button>
                        </div>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500"
                          aria-label={`Apply for ${item.title} at ${item.company} on official site`}
                        >
                          <span>Apply</span>
                          <FiExternalLink />
                        </a>
                      </div>

                      {!explain && item.description && (
                        <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{item.description}</p>
                      )}

                      {explain && sections && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="rounded-xl p-4 bg-white/70 dark:bg-slate-900/50 border border-white/40 dark:border-white/10">
                            <h4 className="font-medium flex items-center gap-2"><FiUserCheck /> What you’ll do</h4>
                            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{sections.what || 'Build features, fix bugs, and collaborate with the team.'}</p>
                          </div>
                          <div className="rounded-xl p-4 bg-white/70 dark:bg-slate-900/50 border border-white/40 dark:border-white/10">
                            <h4 className="font-medium flex items-center gap-2"><FiStar /> Skills needed</h4>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {sections.skills.map((s) => (
                                <span key={s} className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">{s}</span>
                              ))}
                            </div>
                          </div>
                          <div className="rounded-xl p-4 bg-white/70 dark:bg-slate-900/50 border border-white/40 dark:border-white/10">
                            <h4 className="font-medium">Who should apply</h4>
                            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{sections.who || 'Students excited to learn, collaborate, and ship user value.'}</p>
                          </div>
                          <div className="rounded-xl p-4 bg-white/70 dark:bg-slate-900/50 border border-white/40 dark:border-white/10">
                            <h4 className="font-medium">Growth opportunities</h4>
                            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{sections.growth || 'Exposure to reviews, tooling, and modern practices.'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
