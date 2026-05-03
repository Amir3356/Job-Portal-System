import { Link } from 'react-router-dom'
import Button from '../components/Button'
import StatCard from '../components/StatCard'
import { roleHighlights, sampleStats } from '../utils/mockData'

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
          <span className="inline-flex rounded-full bg-amber-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300 ring-1 ring-amber-300/20">
            Full-stack hiring platform
          </span>
          <h1 className="headline mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
            A focused job portal for admins, employers, and job seekers.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Built for secure auth, role-aware dashboards, job discovery, applications with CV uploads, and a clean API-first workflow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as={Link} to="/jobs">Browse Jobs</Button>
            <Link className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10" to="/register">
              Create Account
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {sampleStats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        <aside className="glass-panel rounded-[2rem] p-8">
          <div className="headline text-2xl font-bold text-white">Roles at a glance</div>
          <div className="mt-6 space-y-5">
            {Object.entries(roleHighlights).map(([role, items]) => (
              <div key={role} className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500">{role.replace('_', ' ')}</div>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  )
}