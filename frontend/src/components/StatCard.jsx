export default function StatCard({ label, value, change }) {
  return (
    <div className="glass-panel rounded-3xl p-5">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-3 text-3xl font-semibold text-white headline">{value}</div>
      <div className="mt-2 text-sm text-emerald-300">{change}</div>
    </div>
  )
}