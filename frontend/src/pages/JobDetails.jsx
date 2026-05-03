import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobAPI, applicationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/UI/Loading';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isJobSeeker } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [formData, setFormData] = useState({
    cover_letter: '',
    phone: '',
    years_of_experience: '',
    portfolio_url: '',
    cv: null,
  });
  const [cvFileName, setCvFileName] = useState('');

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await jobAPI.getById(id);
      setJob(response.data.job);
    } catch (error) {
      console.error('Failed to fetch job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Validation
    if (!formData.phone) {
      alert('Phone number is required');
      return;
    }

    setApplying(true);
    try {
      // Create FormData for file upload
      const applicationData = new FormData();
      applicationData.append('cover_letter', formData.cover_letter);
      applicationData.append('phone', formData.phone);
      applicationData.append('years_of_experience', formData.years_of_experience);
      applicationData.append('portfolio_url', formData.portfolio_url);
      if (formData.cv) {
        applicationData.append('cv', formData.cv);
      }

      await applicationAPI.apply(id, applicationData);
      alert('Application submitted successfully!');
      setShowApplyModal(false);
      
      // Reset form
      setFormData({
        cover_letter: '',
        phone: '',
        years_of_experience: '',
        portfolio_url: '',
        cv: null,
      });
      setCvFileName('');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, cv: file });
      setCvFileName(file.name);
    }
  };

  if (loading) return <Loading />;
  if (!job) return <div className="text-center py-12">Job not found</div>;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="card mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-xl text-gray-600">{job.company}</p>
            </div>
            <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-medium">
              {job.type}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {job.location}
            </span>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {job.salary}
            </span>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Posted {new Date(job.created_at).toLocaleDateString()}
            </span>
          </div>

          {isJobSeeker && (
            <button
              onClick={() => setShowApplyModal(true)}
              className="btn-primary w-full md:w-auto"
            >
              Apply Now
            </button>
          )}
        </div>

        <div className="card mb-6">
          <h2 className="text-2xl font-bold mb-4">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>

        {job.requirements && (
          <div className="card mb-6">
            <h2 className="text-2xl font-bold mb-4">Requirements</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
          </div>
        )}

        {job.skills && job.skills.length > 0 && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Apply Modal */}
        {showApplyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 my-8">
              <h3 className="text-2xl font-bold mb-4">Apply for {job.title}</h3>
              
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. +251912345678"
                    className="input-field"
                  />
                </div>

                {/* Years of Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    name="years_of_experience"
                    value={formData.years_of_experience}
                    onChange={handleInputChange}
                    min="0"
                    max="50"
                    placeholder="e.g. 3"
                    className="input-field"
                  />
                </div>

                {/* Portfolio URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio / LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="portfolio_url"
                    value={formData.portfolio_url}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="input-field"
                  />
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload CV/Resume (Optional)
                  </label>
                  <div className="mt-1 flex items-center gap-4">
                    <label className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 transition-colors">
                        <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-sm text-gray-600">
                          {cvFileName || 'Choose any file'}
                        </span>
                      </div>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {cvFileName && (
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {cvFileName}
                    </div>
                  )}
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    name="cover_letter"
                    value={formData.cover_letter}
                    onChange={handleInputChange}
                    rows={6}
                    className="input-field"
                    placeholder="Tell us why you're a great fit for this role..."
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6 pt-4 border-t">
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
                <button
                  onClick={() => {
                    setShowApplyModal(false);
                    setFormData({
                      cover_letter: '',
                      phone: '',
                      years_of_experience: '',
                      portfolio_url: '',
                      cv: null,
                    });
                    setCvFileName('');
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
