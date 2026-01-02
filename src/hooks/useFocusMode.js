import { useEffect, useState } from 'react'

const STORAGE_KEY = 'focusMode'

export default function useFocusMode() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw != null) setEnabled(raw === 'true')
    } catch (_) {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(enabled))
    } catch (_) {}
  }, [enabled])

  const toggle = () => setEnabled((v) => !v)

  return { enabled, setEnabled, toggle }
}
