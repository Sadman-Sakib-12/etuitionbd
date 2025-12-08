import React from 'react'
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole'

const ProfileSettings = () => {
  const {user}=useAuth()
  const [role,isRoleLoading]=useRole()
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>

        <div className='flex flex-col items-center p-4 -mt-16'>
          {/* Profile Image */}
          <div className='relative'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24 border-2 border-white'
            />
            <input
              type='file'
              accept='image/*'
              className='absolute bottom-0 right-0 w-8 h-8 opacity-0 cursor-pointer'
              title='Change Profile Picture'
            />
          </div>

          {/* Role */}
          <p className='p-2 px-4 text-xs text-white bg-lime-500 rounded-full mt-2'>
            {role}
          </p>

          {/* User ID */}
          <p className='mt-2 text-sm font-medium text-gray-800'>
            User ID: {user?.uid}
          </p>

          <div className='w-full p-4 mt-4 rounded-lg'>
            <div className='flex flex-col md:flex-row md:justify-between gap-4 text-gray-700'>
              <div className='flex flex-col w-full md:w-1/2'>
                <label className='text-sm mb-1'>Name</label>
                <input
                  type='name'
                  value={user?.displayName}
                  readOnly
                  className='border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                />
              </div>

              <div className='flex flex-col w-full md:w-1/2'>
                <label className='text-sm mb-1'>Email</label>
                <input
                  type='email'
                  value={user?.email}
                  readOnly
                  className='border border-gray-300 rounded px-3 py-1 bg-gray-100 cursor-not-allowed'
                />
              </div>
            </div>

            <div className='flex gap-4 mt-4 justify-center md:justify-end'>
              <button
                className='bg-lime-500 px-6 py-1 rounded-lg text-white hover:bg-lime-700 transition'
              >
                Update
              </button>
              <button className='bg-lime-500 px-6 py-1 rounded-lg text-white hover:bg-lime-700 transition'>
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings