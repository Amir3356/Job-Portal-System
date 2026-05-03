import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { applicationAPI } from '../services/api';
import Loading from '../components/UI/Loading';

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    cover_letter: '',
    phone: '',
    years_of_experience: '',
    portfolio_url: '',
    cv: null,
  });
  const [cvFileName, setCvFileName] = useState('');
  const [existingCv, setExistingCv] = useState('');

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      const response = await applicationAPI.getById(id);
      const app = response.data.application;
      
      setFormData({
        cover_letter: app.cover_letter || '',
        phone: app.phone || '',
        years_of_experience: app.years_of_experience || '',
        portfolio_url: app.portfolio_url || '',
        cv: null,
      });
      
      if (app.resume_path) {
        setExistingCv(app.resume_path);
      }
    } catch (error) {
      console.error('Failed to fetch application:', error);
      alert('Failed to load application');
      navigate('/dashboard');
    } finally {
      setLoading(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phone) {
      alert('Phone number is required');
      return;
    }

    setSaving(true);
    try {
      const applicationData = new FormData();
      
      if (formData.cover_letter) {
        applicationData.append('cover_letter', formData.cover_letter);
      }
      applicationData.append('phone', formData.phone);
      if (formData.years_of_experience) {
        applicationData.append('years_of_experience', formData.years_of_experience);
      }
      if (formData.portfolio_url) {
        applicationData.append('portfolio_url', formData.portfolio_url);
      }
      if (formData.cv && formData.cv instanceof File) {
        applicationData.append('cv', formData.cv);
      }

      await applicationAPI.updateApplication(id, applicationData);
      alert('Application updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update application');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Application</h1>
          <p className="text-gray-600">Update your application details</p>
        </div>

        <form onSubmit={handleSubmit} className="card">
          <div className="space-y-4">
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
                type="text"
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
                Upload New CV/Resume (Optional)
              </label>
              
              {existingCv && !cvFileName && (
                <div className="mb-2 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Current CV: <a 
                      href={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'}/storage/${existingCv}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Download
                    </a>
                  </p>
                </div>
              )}
              
              <div className="mt-1 flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 transition-colors">
                    <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-600">
                      {cvFileName || 'Choose new file (optional)'}
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
              type="submit"
              disabled={saving}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditApplication;
