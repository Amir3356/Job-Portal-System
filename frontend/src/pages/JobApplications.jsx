import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobAPI, applicationAPI } from '../services/api';
import Loading from '../components/UI/Loading';

const JobApplications = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [jobResponse, applicationsResponse] = await Promise.all([
        jobAPI.getById(id),
        applicationAPI.getByJob(id),
      ]);
      
      setJob(jobResponse.data.job);
      setApplications(applicationsResponse.data.applications || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      alert('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await applicationAPI.updateStatus(applicationId, newStatus);
      
      // Update local state
      setApplications(applications.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      ));
      
      alert(`Application ${newStatus} successfully!`);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update application status');
    }
  };

  if (loading) return <Loading />;
  if (!job) return <div className="text-center py-12">Job not found</div>;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Job Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-primary-600 hover:text-primary-700 mb-4 flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          
          <div className="card">
            <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
            <p className="text-gray-600 mb-4">{job.company} • {job.location}</p>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                {applications.length} Application{applications.length !== 1 ? 's' : ''}
              </span>
              <span className="text-gray-600 text-sm">
                Posted {new Date(job.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Applications</h2>

          {applications.length === 0 ? (
            <div className="card text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-600 text-lg">No applications yet</p>
              <p className="text-gray-500 text-sm mt-2">Applications will appear here when job seekers apply</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div key={application.id} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">
                        {application.user?.name || 'Anonymous'}
                      </h3>
                      <p className="text-gray-600 mb-2">{application.user?.email}</p>
                      
                      {/* Additional Info */}
                      <div className="space-y-1 text-sm text-gray-600 mb-2">
                        {application.phone && (
                          <p className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {application.phone}
                          </p>
                        )}
                        {application.years_of_experience !== null && application.years_of_experience !== undefined && (
                          <p className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {application.years_of_experience} years of experience
                          </p>
                        )}
                        {application.portfolio_url && (
                          <p className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            <a href={application.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                              Portfolio/LinkedIn
                            </a>
                          </p>
                        )}
                        {application.resume_path && (
                          <p className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <a 
                              href={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'}/storage/${application.resume_path}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-primary-600 hover:underline"
                            >
                              Download CV
                            </a>
                          </p>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-500">
                        Applied {new Date(application.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      application.status === 'accepted' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>

                  {application.cover_letter && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Cover Letter</h4>
                      <p className="text-gray-600 whitespace-pre-line">{application.cover_letter}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {application.status === 'pending' && (
                    <div className="flex gap-3 pt-4 border-t">
                      <button
                        onClick={() => handleStatusUpdate(application.id, 'accepted')}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(application.id, 'rejected')}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {application.status !== 'pending' && (
                    <div className="pt-4 border-t">
                      <button
                        onClick={() => handleStatusUpdate(application.id, 'pending')}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Reset to Pending
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplications;
