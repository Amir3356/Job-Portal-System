import { useEffect, useMemo, useState } from 'react'
import JobCard from '../components/JobCard'
import { jobsApi } from '../services/api'
import { sampleJobs } from '../utils/mockData'

export default function JobsPage() {
  const [query, setQuery] = useState('')
  const [jobs, setJobs] = useState(sampleJobs)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadJobs = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await jobsApi.list()
        if (!isMounted) return
        setJobs(response.data ?? response.jobs ?? sampleJobs)
      } catch {
        if (!isMounted) return
        setJobs(sampleJobs)
        setError('API unavailable. Showing curated sample jobs.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadJobs()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredJobs = useMemo(
    () => jobs.filter((job) => `${job.title} ${job.company} ${job.location} ${job.tags?.join(' ')}`.toLowerCase().includes(query.toLowerCase())),
    [jobs, query],
  )

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[2rem] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Browse jobs</div>
            <h2 className="headline mt-2 text-3xl font-bold text-white">Search jobs with filters and quick details.</h2>
          </div>
          <label className="block w-full max-w-xl">
            <span className="text-sm text-slate-300">Search</span>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-amber-300"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, company, location, or skill"
            />
          </label>
        </div>
        {error && <div className="mt-4 rounded-2xl bg-amber-500/10 px-4 py-3 text-sm text-amber-200">{error}</div>}
      </section>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="glass-panel h-64 rounded-[1.75rem] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}