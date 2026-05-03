import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Jobs from './pages/Jobs'
import JobDetails from './pages/JobDetails'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
	return (
		<BrowserRouter>
			<nav className="p-4 border-b">
				<Link to="/" className="mr-4">Jobs</Link>
				<Link to="/login" className="mr-4">Login</Link>
				<Link to="/register">Register</Link>
			</nav>
			<main className="p-4">
				<Routes>
					<Route path="/" element={<Jobs/>} />
					<Route path="/jobs/:id" element={<JobDetails/>} />
					<Route path="/login" element={<Login/>} />
					<Route path="/register" element={<Register/>} />
				</Routes>
			</main>
		</BrowserRouter>
	)
}
