import { sampleApplications } from '../utils/mockData'

export default function ApplicationsPage() {
  return (
    <section className="glass-panel rounded-[2rem] p-8">
      <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Applications</div>
      <h2 className="headline mt-2 text-3xl font-bold text-white">Track every application in one place.</h2>
      <div className="mt-6 space-y-4">
        {sampleApplications.map((application) => (
          <div key={application.id} className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/50 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm text-slate-400">{application.company}</div>
              <div className="mt-1 text-lg font-semibold text-white">{application.role}</div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-200">{application.status}</span>
              <span className="text-slate-400">Updated {application.updatedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}