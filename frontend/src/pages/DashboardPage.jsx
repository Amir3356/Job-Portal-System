import { useAuth } from '../hooks/useAuth'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'
import { sampleApplications, sampleJobs, sampleStats } from '../utils/mockData'

export default function DashboardPage() {
  const { user } = useAuth()
  const role = user?.role ?? 'guest'

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[2rem] p-8">
        <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Dashboard</div>
        <h2 className="headline mt-3 text-3xl font-bold text-white">Welcome{user?.name ? `, ${user.name}` : ''}</h2>
        <p className="mt-4 max-w-3xl text-slate-300">
          {role === 'admin' && 'Monitor users, jobs, and platform activity from one place.'}
          {role === 'employer' && 'Manage your company profile, jobs, and candidate pipeline.'}
          {role === 'job_seeker' && 'Keep track of jobs, applications, and your profile readiness.'}
          {role === 'guest' && 'Sign in to unlock role-aware actions and workflow tools.'}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {sampleStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel rounded-[2rem] p-6">
          <h3 className="headline text-2xl font-bold text-white">{role === 'employer' ? 'Recent applicants' : 'Recommended jobs'}</h3>
          <div className="mt-6 space-y-4">
            {sampleJobs.slice(0, 2).map((job) => (
              <div key={job.id} className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-slate-400">{job.company}</div>
                    <div className="mt-1 text-lg font-semibold text-white">{job.title}</div>
                  </div>
                  <StatusBadge tone={job.status}>{job.status}</StatusBadge>
                </div>
                <div className="mt-4 text-sm text-slate-300">{job.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-6">
          <h3 className="headline text-2xl font-bold text-white">Application activity</h3>
          <div className="mt-6 space-y-4">
            {sampleApplications.map((application) => (
              <div key={application.id} className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-slate-400">{application.company}</div>
                    <div className="mt-1 text-lg font-semibold text-white">{application.role}</div>
                  </div>
                  <span className="text-sm text-emerald-300">{application.status}</span>
                </div>
                <div className="mt-4 text-xs uppercase tracking-[0.25em] text-slate-500">Updated {application.updatedAt}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}