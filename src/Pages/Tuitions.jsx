import React from 'react'

const Tuitions = () => {
  return (
    <div>
      <h1>Tuitions</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='bg-white p-4 rounded shadow flex flex-col justify-between'>
          <div>
              <h3 className='font-bold text-lg mb-2'>Subject</h3>
              <p>Class</p>
              <p>Location</p>
              <p>Budget</p>
              <p>Status</p>
          </div>
          <button className='mt-4 bg-green-600 text-white px-4 py-2 rounded'>Apply</button>
        </div>
      </div>




    </div>
  )
}

export default Tuitions