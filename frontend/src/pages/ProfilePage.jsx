import Button from '../components/Button'

export default function ProfilePage() {
  return (
    <section className="glass-panel rounded-[2rem] p-8">
      <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Profile</div>
      <h2 className="headline mt-2 text-3xl font-bold text-white">Build a profile that sells your fit.</h2>
      <form className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block md:col-span-1">
          <span className="text-sm text-slate-300">Headline</span>
          <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-amber-300" placeholder="Senior Full-stack Developer" />
        </label>
        <label className="block md:col-span-1">
          <span className="text-sm text-slate-300">Location</span>
          <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-amber-300" placeholder="Remote / Lagos / Berlin" />
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm text-slate-300">Skills</span>
          <textarea className="mt-2 min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-amber-300" placeholder="Laravel, React, MySQL, Tailwind, API design" />
        </label>
        <div className="md:col-span-2">
          <Button>Save profile</Button>
        </div>
      </form>
    </section>
  )
}