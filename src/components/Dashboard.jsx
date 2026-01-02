import React, { Fragment, useMemo } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FiBarChart2, FiTrendingUp, FiX } from 'react-icons/fi'
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

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/40 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Dialog.Panel className="w-full max-w-3xl transform rounded-2xl border border-white/40 dark:border-white/10 bg-white/85 dark:bg-slate-900/80 backdrop-blur p-5 shadow-glass">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-brand-600 text-white"><FiBarChart2 /></div>
                    <Dialog.Title className="text-lg font-semibold">Impact Dashboard</Dialog.Title>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/70 dark:bg-slate-900/60 border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-white/90 dark:hover:bg-slate-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    aria-label="Close dashboard"
                  >
                    <FiX />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-xl p-4 bg-white/70 dark:bg-slate-900/50 border border-white/40 dark:border-white/10">
                    <p className="text-sm text-slate-500">Internships viewed</p>
                    <p className="text-2xl font-semibold mt-1">{data.views || 0}</p>
                    <p className="text-xs text-slate-500 mt-1">Unique: {(data.viewedIds || []).length}</p>
                  </div>
                  <div className="rounded-xl p-4 bg-white/70 dark:bg-slate-900/50 border border-white/40 dark:border-white/10">
                    <p className="text-sm text-slate-500">Domains explored</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {topDomains.length === 0 ? (
                        <span className="text-xs text-slate-500">No data yet</span>
                      ) : (
                        topDomains.map(([s, c]) => (
                          <span key={s} className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                            {s} · {c}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="rounded-xl p-4 bg-white/70 dark:bg-slate-900/50 border border-white/40 dark:border-white/10">
                    <p className="text-sm text-slate-500 flex items-center gap-2"><FiTrendingUp /> Skill growth trend</p>
                    <div className="mt-2 space-y-1 max-h-28 overflow-auto pr-1">
                      {trend.length === 0 ? (
                        <p className="text-xs text-slate-500">No activity yet</p>
                      ) : (
                        trend.map((t) => (
                          <div key={t.day} className="flex items-center justify-between text-xs">
                            <span className="text-slate-600 dark:text-slate-300">{t.day}</span>
                            <span className="font-medium">{t.count}</span>
                          </div>
                        ))
                      )}
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
