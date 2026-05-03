import { useEffect, useState } from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'

export default function Jobs(){
  const [jobs, setJobs] = useState([])

  useEffect(()=>{
    (async ()=>{
      const res = await api.get('/jobs')
      setJobs(res.data.data || res.data)
    })()
  },[])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>
      <div className="grid gap-4">
        {jobs.map(job=> (
          <div key={job.id} className="p-4 border rounded">
            <h2 className="text-lg font-semibold"><Link to={`/jobs/${job.id}`}>{job.title}</Link></h2>
            <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
