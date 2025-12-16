import React from 'react'
import { ClipLoader } from 'react-spinners'

const LoadingSpin = () => {
  return (
    <div className='mx-auto max-w-10 p-5 mt-40 mb-60 grid grid-cols-4'>
        <ClipLoader/>
    </div>
  )
}

export default LoadingSpin