const toneClasses = {
  featured: 'bg-amber-400/15 text-amber-300 ring-1 ring-amber-300/25',
  new: 'bg-sky-400/15 text-sky-300 ring-1 ring-sky-300/25',
  hot: 'bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-300/25',
  submitted: 'bg-blue-400/15 text-blue-200 ring-1 ring-blue-200/25',
  review: 'bg-amber-400/15 text-amber-200 ring-1 ring-amber-200/25',
  shortlisted: 'bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-200/25',
}

export default function StatusBadge({ tone = 'featured', children }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${toneClasses[tone] ?? toneClasses.featured}`}>{children}</span>
}