import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'
import { saveOrUpdateUser } from '../utils'
import { FaEye } from 'react-icons/fa6'

const Login = () => {
  const { user,
    signInWithGoogle,
    signIn, } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'

  const hanldesubmit = async event => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const password = form.password.value
    try {
      const { user } = await signIn(email, password)
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL
      })
      navigate(from, { replace: true })
    } catch (err) {
      console.log(err)
    }
  }
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle()

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })
      navigate(from, { replace: true })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <div className="hero-content mx-auto mt-10 mb-10 flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-[350px] md:w-[400px] shadow-md">
          <div className="card-body md:w-96 mx-auto">
            <h1 className='text-center font-bold text-2xl'>Login</h1>
            <form onSubmit={hanldesubmit}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" required />
                <div className='relative'>
                  <label className="label">Password</label>
                  <input name="password" className="input" placeholder="Password"  required/>
                  {/* type={show?'text':'password'} */}
                  <span className='absolute right-[20px] top-[34px] cursor-pointer z-10'>
                    {/* {
                      show ?<FaEye />:<IoEyeOff />
                    } */}
                  </span>
                </div>
                <div>
                  <button type='button' className="link link-hover">Forgot password?</button>
                </div>
                <button type="submit" className="btn btn-neutral mt-4">Login</button>
                <button onClick={handleGoogleSignIn} className='flex btn border-black items-center justify-center gap-2 ' type='button' >
                  <img className='w-5 h-5' src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" />
                  Continue with Google
                </button>

                <div>
                  <p>Don’t have an account?

                    <Link className='text-blue-600 underline' to='/regiter'>Regiters here</Link>
                  </p>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login