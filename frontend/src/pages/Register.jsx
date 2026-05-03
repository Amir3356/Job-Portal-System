import { useState } from 'react'
import api from '../services/api'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')

  async function submit(e){
    e.preventDefault()
    try{
      const res = await api.post('/register', { name, email, password, password_confirmation })
      console.log(res.data)
      alert('Registered')
    }catch(err){
      alert('Registration failed')
    }
  }

  return (
    <form onSubmit={submit} className="max-w-md">
      <h1 className="text-2xl mb-4">Register</h1>
      <input className="w-full p-2 border mb-2" value={name} onChange={e=>setName(e.target.value)} placeholder="Name" />
      <input className="w-full p-2 border mb-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input type="password" className="w-full p-2 border mb-2" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      <input type="password" className="w-full p-2 border mb-2" value={password_confirmation} onChange={e=>setPasswordConfirmation(e.target.value)} placeholder="Confirm Password" />
      <button className="px-4 py-2 bg-green-600 text-white">Register</button>
    </form>
  )
}
