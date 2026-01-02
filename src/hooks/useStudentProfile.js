import { useEffect, useState } from 'react'

const STORAGE_KEY = 'studentProfile'

const defaultProfile = {
  year: '',
  domain: '',
  location: '',
  availability: '',
}

export default function useStudentProfile() {
  const [profile, setProfile] = useState(defaultProfile)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setProfile({ ...defaultProfile, ...JSON.parse(raw) })
    } catch (_) {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    } catch (_) {}
  }, [profile])

  const updateField = (key, value) => setProfile((p) => ({ ...p, [key]: value }))
  const reset = () => setProfile(defaultProfile)

  return { profile, setProfile, updateField, reset }
}
