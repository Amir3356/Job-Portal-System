export default function Button({ children, className = '', variant = 'primary', type = 'button', as: Component = 'button', ...props }) {
  const variants = {
    primary: 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-lg shadow-amber-400/20',
    ghost: 'bg-white/5 text-white hover:bg-white/10 border border-white/10',
    accent: 'bg-sky-400 text-slate-950 hover:bg-sky-300 shadow-lg shadow-sky-400/20',
  }

  return (
    <Component
      type={Component === 'button' ? type : undefined}
      className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}