import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

export default function JobCard({ job }) {
  return (
    <article className="glass-panel rounded-[1.75rem] p-6 transition duration-200 hover:-translate-y-1 hover:border-white/25">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{job.company}</p>
          <h3 className="mt-2 text-xl font-semibold text-white headline">{job.title}</h3>
        </div>
        <StatusBadge tone={job.status}>{job.status}</StatusBadge>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{job.description}</p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-300">
        <span className="rounded-full bg-white/6 px-3 py-1">{job.location}</span>
        <span className="rounded-full bg-white/6 px-3 py-1">{job.type}</span>
        <span className="rounded-full bg-white/6 px-3 py-1">{job.salary}</span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {job.tags?.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-900/80 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Job ID {job.id}</span>
        <Link className="text-sm font-semibold text-amber-300 hover:text-amber-200" to={`/jobs/${job.id}`}>
          View details
        </Link>
      </div>
    </article>
  )
}