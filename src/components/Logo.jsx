import React from 'react'

export default function Logo({ size = 32 }) {
  const s = typeof size === 'number' ? `${size}` : size
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="InternSphere logo"
    >
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="60%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <filter id="glass" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.25 0" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#g)" />
      <g filter="url(#glass)">
        <path d="M14 28c0-5.523 4.477-10 10-10h6" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity=".95"/>
        <circle cx="30" cy="18" r="3" fill="#fff" opacity=".95"/>
        <path d="M17 34h14" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".9"/>
      </g>
    </svg>
  )
}
