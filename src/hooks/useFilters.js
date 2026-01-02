import { useState } from 'react'

export default function useFilters() {
  const [query, setQuery] = useState('')
  const [selectedLocations, setSelectedLocations] = useState([])
  const [selectedSources, setSelectedSources] = useState([])
  const [selectedModes, setSelectedModes] = useState([])
  const [selectedSkills, setSelectedSkills] = useState([])

  return {
    query,
    setQuery,
    selectedLocations,
    setSelectedLocations,
    selectedSources,
    setSelectedSources,
    selectedModes,
    setSelectedModes,
    selectedSkills,
    setSelectedSkills,
  }
}
