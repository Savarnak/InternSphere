import React, { Fragment, useMemo } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FiBarChart2, FiTrendingUp, FiX, FiEye, FiGrid } from 'react-icons/fi'
import useAnalytics from '../hooks/useAnalytics.js'

export default function Dashboard({ open, onClose }) {
  const { data } = useAnalytics()

  const topDomains = useMemo(() => {
    const entries = Object.entries(data.domains || {})
    entries.sort((a, b) => b[1] - a[1])
    return entries.slice(0, 8)
  }, [data])

  const trend = useMemo(() => {
    // Build a simple count per day of unique skills seen
    const byDay = {}
    for (const row of data.skillsTimeline || []) {
      const day = (row.date || '').slice(0, 10)
      byDay[day] = byDay[day] || new Set()
      for (const s of row.skills || []) byDay[day].add(s)
    }
    const points = Object.entries(byDay)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([day, set]) => ({ day, count: (set && set.size) || 0 }))
    return points
  }, [data])

  const maxTrend = Math.max(1, ...trend.map((t) => t.count))
  const maxDomain = Math.max(1, ...topDomains.map(([, c]) => c))

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/40 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Dialog.Panel className="w-full max-w-3xl transform rounded-2xl border border-white/40 dark:border-white/10 bg-white/85 dark:bg-slate-900/80 backdrop-blur p-0 shadow-glass overflow-hidden">
                <div className="relative">
                  <div className="h-24 bg-gradient-to-r from-brand-600 via-indigo-500 to-emerald-500" />
                  <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 dark:bg-slate-900/70 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-white/90 dark:hover:bg-slate-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
                    aria-label="Close dashboard"
                  >
                    <FiX />
                  </button>
                  <div className="px-5 -mt-10">
                    <div className="flex items-end justify-between">
                      <div className="text-white drop-shadow">
                        <Dialog.Title className="text-xl font-semibold">Impact Dashboard</Dialog.Title>
                        <p className="text-sm opacity-90">Your exploration stats (local to this device)</p>
                      </div>
                      <div className="hidden md:flex items-center gap-2 text-white/90">
                        <FiBarChart2 />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-xl p-4 bg-white/70 dark:bg-slate-900/50 border border-white/40 dark:border-white/10">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">Internships viewed</p>
                        <FiEye className="text-slate-400" />
                      </div>
                      <p className="text-2xl font-semibold mt-1">{data.views || 0}</p>
                      <p className="text-xs text-slate-500 mt-1">Unique: {(data.viewedIds || []).length}</p>
                    </div>
                    <div className="rounded-xl p-4 bg-white/70 dark:bg-slate-900/50 border border-white/40 dark:border-white/10">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">Domains explored</p>
                        <FiGrid className="text-slate-400" />
                      </div>
                      <div className="mt-3 space-y-2">
                        {topDomains.length === 0 ? (
                          <span className="text-xs text-slate-500">No data yet</span>
                        ) : (
                          topDomains.map(([s, c]) => (
                            <div key={s} className="text-xs">
                              <div className="flex items-center justify-between">
                                <span className="text-slate-600 dark:text-slate-300">{s}</span>
                                <span className="font-medium">{c}</span>
                              </div>
                              <div className="mt-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                <div className="h-full bg-brand-600/80" style={{ width: `${Math.round((c / maxDomain) * 100)}%` }} />
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="rounded-xl p-4 bg-white/70 dark:bg-slate-900/50 border border-white/40 dark:border-white/10">
                      <p className="text-sm text-slate-500 flex items-center gap-2"><FiTrendingUp /> Skill growth trend</p>
                      <div className="mt-3 space-y-2 max-h-36 overflow-auto pr-1">
                        {trend.length === 0 ? (
                          <p className="text-xs text-slate-500">No activity yet</p>
                        ) : (
                          trend.map((t) => (
                            <div key={t.day} className="text-xs">
                              <div className="flex items-center justify-between">
                                <span className="text-slate-600 dark:text-slate-300">{t.day}</span>
                                <span className="font-medium">{t.count}</span>
                              </div>
                              <div className="mt-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                <div className="h-full bg-emerald-500/80" style={{ width: `${Math.round((t.count / maxTrend) * 100)}%` }} />
                              </div>
                            </div>
                          ))
                        )}
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
