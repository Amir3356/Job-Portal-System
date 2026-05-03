import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jobAPI, applicationAPI } from '../services/api';
import Loading from '../components/UI/Loading';

const Dashboard = () => {
  const { user, isEmployer, isJobSeeker } = useAuth();
  const [data, setData] = useState({ jobs: [], applications: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      if (isEmployer) {
        const response = await jobAPI.getAll({ employer_id: user.id });
        setData({ jobs: response.data.jobs, applications: [] });
      } else if (isJobSeeker) {
        const response = await applicationAPI.getMyApplications();
        setData({ jobs: [], applications: response.data.applications });
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">
            {isEmployer ? 'Manage your job postings and applications' : 'Track your job applications'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">
                  {isEmployer ? 'Active Jobs' : 'Applications'}
                </p>
                <p className="text-3xl font-bold text-primary-600">
                  {isEmployer ? data.jobs.length : data.applications.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {isJobSeeker && (
            <>
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Pending</p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {data.applications.filter(app => app.status === 'pending').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Accepted</p>
                    <p className="text-3xl font-bold text-green-600">
                      {data.applications.filter(app => app.status === 'accepted').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Employer Dashboard */}
        {isEmployer && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Job Postings</h2>
              <Link to="/jobs/create" className="btn-primary">
                Post New Job
              </Link>
            </div>

            {data.jobs.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-gray-600 mb-4">You haven't posted any jobs yet</p>
                <Link to="/jobs/create" className="btn-primary">
                  Post Your First Job
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {data.jobs.map((job) => (
                  <div key={job.id} className="card">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                        <p className="text-gray-600 mb-2">{job.location} • {job.type}</p>
                        <p className="text-sm text-gray-500">
                          Posted {new Date(job.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/jobs/${job.id}/edit`} className="btn-secondary">
                          Edit
                        </Link>
                        <Link to={`/jobs/${job.id}/applications`} className="btn-primary">
                          View Applications
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Job Seeker Dashboard */}
        {isJobSeeker && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Applications</h2>

            {data.applications.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-gray-600 mb-4">You haven't applied to any jobs yet</p>
                <Link to="/jobs" className="btn-primary">
                  Browse Jobs
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {data.applications.map((application) => (
                  <div key={application.id} className="card">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{application.job?.title}</h3>
                        <p className="text-gray-600 mb-2">{application.job?.company}</p>
                        <p className="text-sm text-gray-500">
                          Applied {new Date(application.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          application.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          application.status === 'accepted' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                        <Link to={`/jobs/${application.job?.id}`} className="btn-secondary">
                          View Job
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
