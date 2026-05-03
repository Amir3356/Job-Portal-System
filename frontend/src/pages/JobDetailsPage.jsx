import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/Button'
import StatusBadge from '../components/StatusBadge'
import { applicationsApi } from '../services/api'
import { sampleJobs } from '../utils/mockData'

export default function JobDetailsPage() {
  const { jobId } = useParams()
  const job = useMemo(() => sampleJobs.find((item) => String(item.id) === String(jobId)) ?? sampleJobs[0], [jobId])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ cover_letter: '', cv: null })

  const submit = async (event) => {
    event.preventDefault()
    const payload = new FormData()
    payload.append('job_id', job.id)
    payload.append('cover_letter', form.cover_letter)
    if (form.cv) payload.append('cv', form.cv)

    setLoading(true)
    setMessage('')

    try {
      await applicationsApi.apply(payload)
      setMessage('Application submitted successfully.')
    } catch {
      setMessage('API unavailable. Your application is ready to wire to the backend endpoint.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="glass-panel rounded-[2rem] p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">{job.company}</p>
            <h1 className="headline mt-2 text-4xl font-bold text-white">{job.title}</h1>
          </div>
          <StatusBadge tone={job.status}>{job.status}</StatusBadge>
        </div>
        <p className="mt-5 text-slate-300">{job.description}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
          <span className="rounded-full bg-white/5 px-4 py-2">{job.location}</span>
          <span className="rounded-full bg-white/5 px-4 py-2">{job.type}</span>
          <span className="rounded-full bg-white/5 px-4 py-2">{job.salary}</span>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] p-8">
        <h2 className="headline text-2xl font-bold text-white">Apply now</h2>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <label className="block">
            <span className="text-sm text-slate-300">Cover letter</span>
            <textarea
              className="mt-2 min-h-40 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-amber-300"
              value={form.cover_letter}
              onChange={(event) => setForm({ ...form, cover_letter: event.target.value })}
              placeholder="Explain why you are a strong fit for this role."
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-300">CV upload</span>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-amber-400 file:px-4 file:py-2 file:font-semibold file:text-slate-950"
              type="file"
              onChange={(event) => setForm({ ...form, cv: event.target.files?.[0] ?? null })}
              accept=".pdf,.doc,.docx"
            />
          </label>

          {message && <div className="rounded-2xl bg-sky-500/10 px-4 py-3 text-sm text-sky-200">{message}</div>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit application'}
          </Button>
        </form>
      </section>
    </div>
  )
}