import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'applicationStatus'
const STATUSES = ['Applied', 'Interview', 'Rejected', 'Offer']

export function useApplicationStatus() {
  const [map, setMap] = useState({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setMap(JSON.parse(raw) || {})
    } catch (_) {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
    } catch (_) {}
  }, [map])

  const getStatus = (id) => map[id] || ''
  const setStatus = (id, status) =>
    setMap((m) => {
      const next = { ...m }
      if (!status) delete next[id]
      else next[id] = status
      return next
    })
  const clearStatus = (id) => setStatus(id, '')

  return { getStatus, setStatus, clearStatus, STATUSES, map }
}
