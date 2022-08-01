import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isPending, error } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto my-14 p-5">
      <h2 className="text-2xl font-bold pb-2 mb-4 border-b-2 border-gray-400">Login</h2>
      <label className="block mb-2">
        <span className="block mb-1 font-bold">email:</span>
        <input 
          type="email" 
          className="input-base" 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label className="block mb-2">
        <span className="block mb-1 font-bold">password:</span>
        <input 
          type="password" 
          className="input-base" 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      { !isPending &&<button className="button-base">Login</button> }
      { isPending && <button className="button-base" disabled>loading...</button> }
      { error && <p className="error-badge">{error}</p> }

    </form>
  )
}