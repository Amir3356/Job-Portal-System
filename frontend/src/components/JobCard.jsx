import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>
        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
          {job.type}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="flex items-center text-gray-600 text-sm">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </span>
        <span className="flex items-center text-gray-600 text-sm">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {job.salary}
        </span>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills?.slice(0, 3).map((skill, index) => (
          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
            {skill}
          </span>
        ))}
        {job.skills?.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
            +{job.skills.length - 3} more
          </span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Posted {new Date(job.created_at).toLocaleDateString()}
        </span>
        <Link
          to={`/jobs/${job.id}`}
          className="btn-primary"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
