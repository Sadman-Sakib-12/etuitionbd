import React, { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'
import { saveOrUpdateUser } from '../utils'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Mail, Lock, ShieldCheck, UserCheck, GraduationCap } from 'lucide-react'

const Login = () => {
  const { user, signInWithGoogle, signIn } = useAuth()
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  if (user) return <Navigate to={from} replace={true} />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const email = form.email.value.trim()
    const password = form.password.value.trim()

    try {
      const { user } = await signIn(email, password)
      await saveOrUpdateUser({
        name: user?.displayName || 'User',
        email: user?.email,
        image: user?.photoURL || ''
      })
      toast.success('Welcome Back!')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err?.message || 'Invalid Credentials')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      const { user } = await signInWithGoogle()
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })
      toast.success('Google Login Successful')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error('Google Login Failed')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = (type) => {
    const form = document.getElementById('login-form')
    if (type === 'student') {
      form.email.value = 'dadmansakib8531@gmail.com'
      form.password.value = '123456'
    } else if (type === 'tutor') {
      form.email.value = 'shihanhasan45@gmail.com'
      form.password.value = '123456'
    } else if (type === 'admin') {
      form.email.value = 'sakibal753@gmail.com'
      form.password.value = '123456'
    }
    toast.success(`${type.toUpperCase()} Credentials Loaded!`)
  }

  return (
    <div className="flex items-center justify-center p-4 md:p-10 font-sans">
      <div className=" shadow-2xl rounded-[32px] overflow-hidden w-full max-w-5xl flex flex-col md:flex-row min-h-[600px] border border-slate-100">


        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-4xl font-black  mb-2 tracking-tight">
              Login <span className="text-blue-600">Now</span>
            </h2>
            <p className="text-slate-500 font-medium">Please enter your details to login</p>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            <button
              type="button" onClick={() => handleDemoLogin('student')}
              className="flex flex-col items-center justify-center gap-1   py-3 rounded-2xl text-[10px] font-black uppercase border border-slate-100  transition-all shadow-sm group"
            >
              <GraduationCap size={16} className="text-blue-500 group-hover:scale-110 transition-transform" /> Student
            </button>
            <button
              type="button" onClick={() => handleDemoLogin('tutor')}
              className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl text-[10px] font-black uppercase border border-emerald-100 transition-all shadow-sm group"
            >
              <UserCheck size={16} className="text-emerald-500 group-hover:scale-110 transition-transform" /> Tutor
            </button>
            <button
              type="button" onClick={() => handleDemoLogin('admin')}
              className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl text-[10px] font-black uppercase border border-slate-100 transition-all shadow-sm group"
            >
              <ShieldCheck size={16} className="text-rose-500 group-hover:scale-110 transition-transform" /> Admin
            </button>
          </div>
          <form id="login-form" onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold  uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2  group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  type="email" name="email" placeholder="Your email"
                  className="w-full pl-11 pr-4 py-3.5  border-none rounded-2xl focus:ring-2 focus:ring-blue-600/20 outline-none transition-all "
                  required
                />
              </div>
            </div>

            <div className="space-y-1 relative">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold  uppercase tracking-wider">Password</label>
                <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot password?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2  group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  type={show ? 'text' : 'password'} name="password" placeholder="Your password"
                  className="w-full pl-11 pr-12 py-3.5  border-none rounded-2xl focus:ring-2 focus:ring-blue-600/20 outline-none transition-all "
                  required
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors">
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full  py-4 rounded-2xl font-bold  shadow-lg ]"
            >
              {loading ? 'Processing...' : 'Login'}
            </button>


            <div className="relative py-1">
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black"><span className="">OR</span></div>
            </div>

            <button
              type="button" onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 border-2 border-slate-100 rounded-2xl py-3.5  font-bold"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5" />
              Continue with Google
            </button>

            <p className="text-center  text-sm font-medium pt-2">
              Don't have an account? <Link to="/register" className="text-blue-600 hover:underline font-bold">Register</Link>
            </p>
          </form>
        </div>

        <div className=" md:flex flex-1 items-center justify-center p-12 relative border-l border-slate-50">
          <div className="text-center">
            <img
              src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7883.jpg"
              alt="Login" className="w-full max-w-[400px] h-auto rounded-3xl "
            />
            <div className="mt-8 space-y-2">
              <h3 className="text-2xl font-bold ">Smart Tutoring Platform</h3>
              <p className=" text-sm max-w-xs mx-auto leading-relaxed">
                Connect with the best tutors and students in your area with one click.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login