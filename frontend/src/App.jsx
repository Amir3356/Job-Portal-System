import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './layouts/AppShell'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import JobsPage from './pages/JobsPage'
import JobDetailsPage from './pages/JobDetailsPage'
import ApplicationsPage from './pages/ApplicationsPage'
import ProfilePage from './pages/ProfilePage'

function ProtectedRoute({ children }) {
	const { isAuthenticated, isReady } = useAuth()

	if (!isReady) {
		return <div className="px-6 py-20 text-center text-slate-300">Loading session...</div>
	}

	return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<AppShell />}>
					<Route index element={<HomePage />} />
					<Route path="/login" element={<AuthPage />} />
					<Route path="/register" element={<AuthPage />} />
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<DashboardPage />
							</ProtectedRoute>
						}
					/>
					<Route path="/jobs" element={<JobsPage />} />
					<Route path="/jobs/:jobId" element={<JobDetailsPage />} />
					<Route
						path="/applications"
						element={
							<ProtectedRoute>
								<ApplicationsPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<ProfilePage />
							</ProtectedRoute>
						}
					/>
				</Route>
			</Routes>
		</AuthProvider>
	)
}
