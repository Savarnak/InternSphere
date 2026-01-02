import React from 'react'

export default function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="absolute top-1/2 -left-24 h-80 w-80 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -bottom-24 right-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(transparent,transparent,rgba(0,0,0,0.02))] dark:bg-[radial-gradient(transparent,transparent,rgba(255,255,255,0.03))]" />
    </div>
  )
}
