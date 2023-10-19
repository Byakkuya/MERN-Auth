import {Link} from 'react-router-dom'
import {useState} from 'react'
import { set } from 'mongoose'

export const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      

    }
    catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id='username'
         className='bg-slate-100 p-3 rounded-lg'
         onChange={handlechange}/>
        <input type="email" placeholder='Email' id='email'
         className='bg-slate-100 p-3 rounded-lg'
         onChange={handlechange}/>
        <input type="password" placeholder='Password' id='password'
         className='bg-slate-100 p-3 rounded-lg'
         onChange={handlechange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-30 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>

      </form>
      <div className='flex mt-5 gap-2'>
        <p>Have an account </p>
        <Link to='/sign-in'>
        <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'something went wrong'}</p>
    
    
    </div>
  )
}
