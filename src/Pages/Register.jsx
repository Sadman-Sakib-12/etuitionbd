import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, replace, useLocation, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'
import { saveOrUpdateUser } from '../utils'

const Register = () => {
  const {
    signInWithGoogle,
    creatUserWithEamil } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'
  // const [formData,setFormData]=useState()
  const { register, handleSubmit, formState: { errors }, } = useForm()
  const onSubmit = async data => {
    const { name, email, password } = data
    try {
      const result = await creatUserWithEamil(email, password)
      await saveOrUpdateUser({
        name, 
        email,
        role:data.role,
        phone:data.phone
      })
      // await updateProfile(name)
      navigate(from, { replace: true })
    }
    catch (err) {
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
      <div className="hero-content mx-auto p-5 flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-[300px] md:w-[400px] shadow-2xl">
          <div className="card-body w-[300px] md:w-96 ">
            <h1 className='text-center font-bold text-2xl'>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate='' action=''>
              <fieldset className="fieldset">

                <label className='label' >Name</label>
                <input type="text" name="name" className='input' placeholder='Name'

                  {...register('name', {
                    required: "Name is required",
                    maxLength: {
                      value: 20,
                      message: 'Name cannot be too long'
                    }
                  })}
                />
                {
                  errors.name && (
                    <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>
                  )
                }

                <label className="label">Email</label>
                <input type="email" name="email" className="input" placeholder="Email"

                  {...register('email', {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,}$/,
                      message: 'Please enter avlid emaill address'
                    }
                  })}

                />
                {
                  errors.email && (
                    <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>
                  )
                }

                {/* <label className='label'>Photo-URL</label>
                <input type="url" className='input' name="photo" placeholder='Photo-URL' /> */}

                <div className='relative'>

                  <label className="font-bold ">Password</label>
                  <input name="password" className="input" placeholder="Password"
                    {...register('password', {
                      required: "Password is required",
                      maxLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })} />
                  {
                    errors.password&& (
                      <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>
                    )
                  }
                  <span className='absolute right-[20px] top-[34px] cursor-pointer z-10'>

                    {/* onClick={() => setShow(!show)}  */}
                    {/* {
                      show ? <FaEye/> : <IoEyeOff />
                    } */}
                  </span>
                </div>
                <label className="font-bold ">Role selection</label>
                <select className="input" name='role'>
                  <option value="Student">Student</option>
                  <option value="Tutor">Tutor</option>
                </select>
                <label className="font-bold ">Phone</label>
                <input className="input" type="text" name="phone" placeholder='Phone' required
                  {...register('phone', {
                    required: "Phone is required",
                    maxLength: {
                      value: 11,
                      message: 'Phone Number must be at least 11 characters'
                    }
                  })}
                />
                {
                  errors.phone && (
                    <p className='text-red-500 text-xs mt-1'>{errors.phone.message}</p>
                  )
                }

                <button type='submit' className="btn btn-neutral mt-4">Register</button>
                <button onClick={handleGoogleSignIn} className='flex btn border-black items-center justify-center gap-2 ' type='button'>
                  <img className='w-5 h-5' src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" />
                  Continue with Google
                </button>
                <div>
                  <p>Already have an account?
                    <Link className='text-blue-600 underline' to="/login">Login</Link>
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

export default Register