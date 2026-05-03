import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

export default function JobDetails(){
  const { id } = useParams()
  const [job, setJob] = useState(null)

  useEffect(()=>{
    (async ()=>{
      const res = await api.get(`/jobs/${id}`)
      setJob(res.data)
    })()
  },[id])

  if(!job) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
      <div className="mt-4">
        <p>{job.description}</p>
      </div>
    </div>
  )
}
