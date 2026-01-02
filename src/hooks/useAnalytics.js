import { useEffect, useState } from 'react'

const KEY = 'impactAnalytics'

const defaultData = {
  views: 0,
  viewedIds: [],
  domains: {},
  skillsTimeline: [], // [{ date: ISO, skills: ['React','SQL'] }]
}

export default function useAnalytics() {
  const [data, setData] = useState(defaultData)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setData({ ...defaultData, ...JSON.parse(raw) })
    } catch (_) {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(data))
    } catch (_) {}
  }, [data])

  const recordView = (item) => {
    setData((d) => {
      const viewedIds = d.viewedIds.includes(item.id) ? d.viewedIds : [...d.viewedIds, item.id]
      const views = d.views + 1
      const domains = { ...d.domains }
      if (item.skills && item.skills.length) {
        item.skills.forEach((s) => {
          const key = s
          domains[key] = (domains[key] || 0) + 1
        })
      }
      const skillsTimeline = [...d.skillsTimeline, { date: new Date().toISOString(), skills: item.skills || [] }]
      return { ...d, views, viewedIds, domains, skillsTimeline }
    })
  }

  return { data, recordView }
}
