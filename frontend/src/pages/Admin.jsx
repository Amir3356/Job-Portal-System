import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Loading from '../components/UI/Loading';

const Admin = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    fetchData();
  }, [isAdmin, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'stats') {
        const response = await api.get('/admin/dashboard');
        setStats(response.data.stats);
      } else if (activeTab === 'users') {
        const response = await api.get('/admin/users');
        setUsers(response.data.users);
      } else if (activeTab === 'jobs') {
        const response = await api.get('/admin/jobs');
        setJobs(response.data.jobs);
      } else if (activeTab === 'applications') {
        const response = await api.get('/admin/applications');
        setApplications(response.data.applications);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await api.delete(`/admin/users/${id}`);
      alert('User deleted successfully');
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    
    try {
      await api.delete(`/admin/jobs/${id}`);
      alert('Job deleted successfully');
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete job');
    }
  };

  const handleDeleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    
    try {
      await api.delete(`/admin/applications/${id}`);
      alert('Application deleted successfully');
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete application');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'stats'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Statistics
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'users'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'jobs'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Jobs
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'applications'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Applications
          </button>
        </div>

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="grid md:grid-cols-4 gap-6">
            <div className="card bg-blue-50">
              <h3 className="text-gray-600 text-sm mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.total_users}</p>
            </div>
            <div className="card bg-green-50">
              <h3 className="text-gray-600 text-sm mb-2">Employers</h3>
              <p className="text-3xl font-bold text-green-600">{stats.total_employers}</p>
            </div>
            <div className="card bg-purple-50">
              <h3 className="text-gray-600 text-sm mb-2">Job Seekers</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.total_job_seekers}</p>
            </div>
            <div className="card bg-orange-50">
              <h3 className="text-gray-600 text-sm mb-2">Total Jobs</h3>
              <p className="text-3xl font-bold text-orange-600">{stats.total_jobs}</p>
            </div>
            <div className="card bg-yellow-50">
              <h3 className="text-gray-600 text-sm mb-2">Total Applications</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats.total_applications}</p>
            </div>
            <div className="card bg-yellow-100">
              <h3 className="text-gray-600 text-sm mb-2">Pending</h3>
              <p className="text-3xl font-bold text-yellow-700">{stats.pending_applications}</p>
            </div>
            <div className="card bg-green-100">
              <h3 className="text-gray-600 text-sm mb-2">Accepted</h3>
              <p className="text-3xl font-bold text-green-700">{stats.accepted_applications}</p>
            </div>
            <div className="card bg-red-100">
              <h3 className="text-gray-600 text-sm mb-2">Rejected</h3>
              <p className="text-3xl font-bold text-red-700">{stats.rejected_applications}</p>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">Joined</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        user.role === 'admin' ? 'bg-red-100 text-red-700' :
                        user.role === 'employer' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-2">{job.company} • {job.location}</p>
                    <p className="text-sm text-gray-500">
                      Posted by: {job.user?.name} | {new Date(job.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{app.user?.name}</h3>
                    <p className="text-gray-600 mb-1">Applied for: {app.job?.title}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      Phone: {app.phone} | {new Date(app.created_at).toLocaleDateString()}
                    </p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteApplication(app.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
