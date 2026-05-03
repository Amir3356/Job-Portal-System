import { useState } from 'react'
import api from '../services/api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function submit(e){
    e.preventDefault()
    try{
      const res = await api.post('/login', { email, password })
      console.log(res.data)
      alert('Logged in (token available in response)')
    }catch(err){
      alert('Login failed')
    }
  }

  return (
    <form onSubmit={submit} className="max-w-md">
      <h1 className="text-2xl mb-4">Login</h1>
      <input className="w-full p-2 border mb-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input type="password" className="w-full p-2 border mb-2" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      <button className="px-4 py-2 bg-blue-600 text-white">Login</button>
    </form>
  )
}
