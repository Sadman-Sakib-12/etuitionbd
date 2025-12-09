import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useAuth from '../hooks/useAuth'

const Tuitions = () => {
  const { user } = useAuth()
  const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true
  })
  const { data, isLoading, error } = useQuery({
    queryKey: ['allTuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tuition')
      return res.data
    }
  })
  const tuition = data || []
  const approvedTuitions = tuition.filter(t => t.status === 'Approved')


  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-40px)]">
      <h1 className="text-2xl font-bold mb-6">Available Tuitions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {approvedTuitions.map((tuition) => (
          <div key={tuition._id} className="bg-white p-4 rounded shadow flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg mb-2">{tuition.subject}</h3>
              <p>Class: {tuition.class}</p>
              <p>Location: {tuition.location}</p>
              <p>Budget: ${tuition.budget}</p>
              {/* <p>Status: <span className="text-green-600 font-semibold">{tuition.status}</span></p> */}
            </div>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Apply</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tuitions
