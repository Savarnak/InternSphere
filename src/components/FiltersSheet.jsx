import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FiFilter, FiX } from 'react-icons/fi'
import Filters from './Filters.jsx'

export default function FiltersSheet({ open, onClose, facets, selected, onChange }) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 sm:hidden" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/40 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 flex min-h-0 items-end">
            <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="translate-y-full" enterTo="translate-y-0" leave="ease-in duration-150" leaveFrom="translate-y-0" leaveTo="translate-y-full">
              <Dialog.Panel className="w-full rounded-t-2xl bg-white dark:bg-slate-900 border-t border-white/40 dark:border-white/10 p-4 shadow-glass">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-brand-600 text-white"><FiFilter /></div>
                    <Dialog.Title className="text-lg font-semibold">Filters</Dialog.Title>
                  </div>
                  <button type="button" onClick={onClose} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/70 dark:bg-slate-900/60 border border-white/50 dark:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" aria-label="Close filters">
                    <FiX />
                  </button>
                </div>

                <div className="mt-3">
                  <Filters facets={facets} selected={selected} onChange={onChange} />
                </div>

                <div className="mt-3 flex justify-end">
                  <button type="button" onClick={onClose} className="px-3 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Done</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
