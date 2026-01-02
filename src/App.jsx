import React, { useMemo, useEffect, useState, Fragment } from 'react'
import { FiSearch } from 'react-icons/fi'
import Header from './components/Header.jsx'
import Filters from './components/Filters.jsx'
import FiltersInline from './components/FiltersInline.jsx'
import InternshipCard from './components/InternshipCard.jsx'
import EmptyState from './components/EmptyState.jsx'
import Footer from './components/Footer.jsx'
import internships from './data/internships.js'
import { filterInternships, getFacetOptions } from './utils/filter.js'
import useFilters from './hooks/useFilters.js'
import BackgroundDecor from './components/BackgroundDecor.jsx'
import StudentProfileDialog from './components/StudentProfileDialog.jsx'
import useStudentProfile from './hooks/useStudentProfile.js'
import { recommend, recommendWithScores } from './utils/recommend.js'
// useState imported above from react
// Removed useFocusMode
import RoleDetail from './components/RoleDetail.jsx'
import useAnalytics from './hooks/useAnalytics.js'
import Dashboard from './components/Dashboard.jsx'
import ResultsHeader from './components/ResultsHeader.jsx'
import FiltersSheet from './components/FiltersSheet.jsx'
import ActiveChips from './components/ActiveChips.jsx'
import { sortByLatest, sortByMatch } from './utils/sort.js'
import { Transition } from '@headlessui/react'

export default function App() {
  const [profileOpen, setProfileOpen] = useState(false)
  // Focus mode removed
  const [selected, setSelected] = useState(null)
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [sortKey, setSortKey] = useState('match') // 'match' | 'latest'
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [heroHidden, setHeroHidden] = useState(false)
  const [showFiltersDesktop, setShowFiltersDesktop] = useState(false)
  const {
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
  } = useFilters()
  const { profile, updateField, reset } = useStudentProfile()
  // Auto-hide hero after user scrolls
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 200) setHeroHidden(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  // no-op: focus mode removed

  // Auto-collapse expanded desktop filters on scroll down
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 150 && showFiltersDesktop) setShowFiltersDesktop(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [showFiltersDesktop])

  const facets = useMemo(() => getFacetOptions(internships), [])
  const filtered = useMemo(
    () =>
      filterInternships(internships, {
        query,
        locations: selectedLocations,
        sources: selectedSources,
        modes: selectedModes,
        skills: selectedSkills,
      }),
    [query, selectedLocations, selectedSources, selectedModes, selectedSkills]
  )

  const recs = useMemo(() => recommendWithScores(profile, internships, 6), [profile])
  const maxRecScore = useMemo(() => {
    if (!recs || recs.length === 0) return 1
    return Math.max(...recs.map((r) => r.score), 1)
  }, [recs])
  const hasProfile = Object.values(profile || {}).some((v) => v)
  const { recordView } = useAnalytics()
  const matchScoresMap = useMemo(() => {
    if (!hasProfile) return null
    const map = new Map()
    // derive scores for all internships using existing recommendWithScores baseline
    // simple approach: score items present in recommend list; others get 0
    recs.forEach(({ item, score }) => map.set(item.id, score))
    return map
  }, [hasProfile, recs])

  // Focus highlight removed
  const getHighlightLevel = () => 0

  const sorted = useMemo(() => {
    const base = filtered
    if (sortKey === 'latest') return sortByLatest(base)
    if (sortKey === 'match' && matchScoresMap) return sortByMatch(base, matchScoresMap)
    return base
  }, [filtered, sortKey, matchScoresMap])

  // Active filter count for badges
  const activeCount = selectedLocations.length + selectedSources.length + selectedModes.length + selectedSkills.length

  // If no results, auto-expand desktop filters to help recover
  useEffect(() => {
    if (sorted.length === 0 && window.innerWidth >= 768) {
      setShowFiltersDesktop(true)
    }
  }, [sorted.length])

  const openDetail = (item) => {
    setSelected(item)
    try { recordView(item) } catch (_) {}
  }
  const closeDetail = () => setSelected(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      <BackgroundDecor />
      <Header
        onOpenProfile={() => setProfileOpen(true)}
        onOpenDashboard={() => setDashboardOpen(true)}
        searchValue={query}
        onSearchChange={setQuery}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!heroHidden && (
          <section className="mt-6 md:mt-10">
            <div className="glass-card rounded-2xl p-6 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold">Find internships that match you</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Search and filter opportunities across sources in one place.</p>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  Explore Internships
                </button>
              </div>
            </div>
          </section>
        )}

        {hasProfile && recs.length > 0 && (
          <section className="mt-6 md:mt-10">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold">Recommended for You</h2>
              <button
                type="button"
                onClick={() => setProfileOpen(true)}
                className="text-sm text-brand-700 dark:text-brand-300 hover:underline"
              >
                Edit profile
              </button>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {recs.map(({ item, score }) => (
                <InternshipCard key={`rec-${item.id}`} data={item} score={score} progress={Math.max(0, Math.min(1, score / maxRecScore))} onOpen={openDetail} focusedId={selected?.id} />
              ))}
            </div>
          </section>
        )}

        <section id="results" className="mt-6 md:mt-10">
          <div className="grid grid-cols-1 gap-6">
            <div className="w-full">
              <div className="mb-3 pb-2 border-b border-white/40 dark:border-white/10">
                <ResultsHeader
                  count={sorted.length}
                  sort={sortKey}
                  onChangeSort={setSortKey}
                  activeCount={activeCount}
                  onOpenFilters={() => {
                    if (window.innerWidth < 768) setMobileFiltersOpen(true)
                    else setShowFiltersDesktop((v) => !v)
                  }}
                />
                {/* Desktop slide-down filters */}
                {
                  <Transition
                    show={showFiltersDesktop}
                    as={Fragment}
                    enter="transition ease-out duration-150"
                    enterFrom="opacity-0 -translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="mt-3">
                      <FiltersInline
                        facets={facets}
                        selected={{
                          locations: selectedLocations,
                          sources: selectedSources,
                          modes: selectedModes,
                          skills: selectedSkills,
                        }}
                        onChange={{
                          locations: setSelectedLocations,
                          sources: setSelectedSources,
                          modes: setSelectedModes,
                          skills: setSelectedSkills,
                        }}
                      />
                    </div>
                  </Transition>
                }
                <ActiveChips
                  selections={{
                    locations: selectedLocations,
                    sources: selectedSources,
                    modes: selectedModes,
                    skills: selectedSkills,
                  }}
                  onRemove={{
                    locations: (val) => setSelectedLocations(selectedLocations.filter((v) => v !== val)),
                    sources: (val) => setSelectedSources(selectedSources.filter((v) => v !== val)),
                    modes: (val) => setSelectedModes(selectedModes.filter((v) => v !== val)),
                    skills: (val) => setSelectedSkills(selectedSkills.filter((v) => v !== val)),
                  }}
                  onClearAll={() => {
                    setSelectedLocations([])
                    setSelectedSources([])
                    setSelectedModes([])
                    setSelectedSkills([])
                  }}
                />
              </div>
              {sorted.length === 0 ? (
                <EmptyState query={query} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {sorted.map((item) => (
                    <InternshipCard
                      key={item.id}
                      data={item}
                      onOpen={openDetail}
                      focusedId={selected?.id}
                      highlightLevel={getHighlightLevel(item.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <StudentProfileDialog
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        profile={profile}
        updateField={updateField}
        reset={reset}
      />

      <RoleDetail open={!!selected} onClose={closeDetail} item={selected} />

      <Dashboard open={dashboardOpen} onClose={() => setDashboardOpen(false)} />

      {/* Mobile Filters Floating Button */}
      <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="sm:hidden fixed right-4 bottom-20 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 bg-brand-600 text-white shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
          aria-label="Open filters"
        >
          <span>Filters</span>
          {(() => {
            const count = selectedLocations.length + selectedSources.length + selectedModes.length + selectedSkills.length
            return count > 0 ? (
              <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white/20 px-1 text-xs font-medium">{count}</span>
            ) : null
          })()}
        </button>

      <FiltersSheet
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        facets={facets}
        selected={{
          locations: selectedLocations,
          sources: selectedSources,
          modes: selectedModes,
          skills: selectedSkills,
        }}
        onChange={{
          locations: setSelectedLocations,
          sources: setSelectedSources,
          modes: setSelectedModes,
          skills: setSelectedSkills,
        }}
      />
    </div>
  )
}
