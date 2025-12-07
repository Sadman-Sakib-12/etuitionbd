import React from 'react'

const Tutors = () => {
  return (
    <div>
      <h1>Tutors</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {/* map? */}
        <div className='bg-white p-4 shadow flex flex-col items-center'>
          <img src="" alt="" className='w-24 h-24 rounded-full mb-4' />
          <h3 className='font-bold text-lg mb-1'>name</h3>
         
          <p>qualifications</p>
          <p>experience</p>
           <p>expectedSalary</p>
          <button className='bg-indigo-600 text-white px-4 py-2 rounded mt-2'>View Profile</button>
        </div>

      </div>
    </div>
  )
}

export default Tutors