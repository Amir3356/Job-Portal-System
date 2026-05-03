import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/Button'

const navLinkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm transition ${isActive ? 'bg-white/12 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`

export default function AppShell() {
  const { user, logout } = useAuth()

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
      <header className="glass-panel sticky top-4 z-20 rounded-[1.75rem] px-5 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20">
              JP
            </div>
            <div>
              <div className="headline text-lg font-bold text-white">Job Portal System</div>
              <div className="text-xs uppercase tracking-[0.3em] text-slate-400">Hire faster. Apply smarter.</div>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-2">
            <NavLink className={navLinkClass} to="/">
              Home
            </NavLink>
            <NavLink className={navLinkClass} to="/jobs">
              Jobs
            </NavLink>
            <NavLink className={navLinkClass} to="/applications">
              Applications
            </NavLink>
            <NavLink className={navLinkClass} to="/profile">
              Profile
            </NavLink>
            <NavLink className={navLinkClass} to="/dashboard">
              Dashboard
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden text-right sm:block">
                  <div className="text-sm font-semibold text-white">{user.name}</div>
                  <div className="text-xs uppercase tracking-[0.25em] text-slate-400">{user.role}</div>
                </div>
                <Button variant="ghost" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link className="text-sm text-slate-300 hover:text-white" to="/login">
                  Login
                </Link>
                <Link className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <Outlet />
      </main>
    </div>
  )
}