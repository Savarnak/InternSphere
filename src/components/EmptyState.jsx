import React from 'react'

export default function EmptyState({ query }) {
  return (
    <div className="glass-card rounded-2xl p-8 text-center">
      <h3 className="text-lg font-semibold">No results</h3>
      <p className="mt-1 text-slate-600 dark:text-slate-300">
        {query ? (
          <>
            We couldn't find any internships matching <span className="font-medium">"{query}"</span> with current filters.
          </>
        ) : (
          <>Try adjusting your filters.</>
        )}
      </p>
    </div>
  )
}
