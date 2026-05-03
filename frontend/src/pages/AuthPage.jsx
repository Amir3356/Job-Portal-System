import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useAuth } from '../hooks/useAuth'

const initialForm = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: 'job_seeker',
}

export default function AuthPage() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isRegister = pathname.includes('register')
  const { isAuthenticated, login, register, error, setError } = useAuth()
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const payload = isRegister
        ? form
        : { email: form.email, password: form.password }

      if (isRegister) {
        await register(payload)
        setMessage('Registration successful. Redirecting to your dashboard.')
      } else {
        await login(payload)
        setMessage('Welcome back. Redirecting to your dashboard.')
      }

      navigate('/dashboard')
    } catch (authError) {
      setError(authError?.response?.data?.message ?? 'Authentication failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="glass-panel rounded-[2rem] p-8">
        <div className="headline text-3xl font-bold text-white">{isRegister ? 'Create account' : 'Sign in'}</div>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Use the API-backed session to access role-based dashboards, manage jobs, and track applications.
        </p>
        <div className="mt-8 space-y-4 text-sm text-slate-300">
          <p>• Secure token auth with Laravel Sanctum</p>
          <p>• Admin, employer, and job seeker access paths</p>
          <p>• Responsive interface and reusable components</p>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] p-8">
        <form className="space-y-5" onSubmit={submit}>
          {isRegister && (
            <label className="block">
              <span className="text-sm font-medium text-slate-300">Full name</span>
              <input
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Amina Khan"
                required
              />
            </label>
          )}

          <label className="block">
            <span className="text-sm font-medium text-slate-300">Email</span>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="name@company.com"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-300">Password</span>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300"
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="••••••••"
              required
            />
          </label>

          {isRegister && (
            <>
              <label className="block">
                <span className="text-sm font-medium text-slate-300">Confirm password</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300"
                  type="password"
                  value={form.password_confirmation}
                  onChange={(event) => setForm({ ...form, password_confirmation: event.target.value })}
                  placeholder="••••••••"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-300">Role</span>
                <select
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-amber-300"
                  value={form.role}
                  onChange={(event) => setForm({ ...form, role: event.target.value })}
                >
                  <option value="job_seeker">Job Seeker</option>
                  <option value="employer">Employer</option>
                </select>
              </label>
            </>
          )}

          {(error || message) && (
            <div className={`rounded-2xl px-4 py-3 text-sm ${error ? 'bg-rose-500/10 text-rose-200' : 'bg-emerald-500/10 text-emerald-200'}`}>
              {error || message}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}
          </Button>
        </form>
      </section>
    </div>
  )
}