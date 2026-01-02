import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-10 md:mt-16 border-t border-white/40 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-slate-600 dark:text-slate-300 flex flex-col md:flex-row items-center justify-between gap-2">
        <p>
          © {new Date().getFullYear()} InternSphere. For demonstration only. Data is mocked.
        </p>
        <p>
          Built with React, Vite, and Tailwind.
        </p>
      </div>
    </footer>
  )
}
