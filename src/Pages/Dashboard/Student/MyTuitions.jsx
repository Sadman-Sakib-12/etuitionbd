// MyTuitions.jsx
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FaEdit, FaTrash } from 'react-icons/fa'

const MyTuitions = () => {
    const [activeTab,setActiveTab]=useState()
  const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
  })

  const { data, isLoading } = useQuery({
    queryKey: ['allTuitions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tuition')
      return res.data
    }
  })

  const tuitions = data || []

  const approvedTuitions = tuitions.filter(t => t.status === activeTab)

  if (isLoading) return <div>Loading...</div>

  return (
<div className="w-full min-h-[calc(100vh-40px)] p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">My Tuitions</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {['Approved', 'Pending', 'Rejected'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tuition Cards */}
      {/* {filteredTuitions.length === 0 ? (
        <p className="text-gray-500">No {activeTab.toLowerCase()} tuitions found.</p>
      ) : ( */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedTuitions.map(tuition => (
            <div
              key={tuition._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">Subject: {tuition.subject}</h3>
                <p>Class: {tuition.class}</p>
                <p>Location: {tuition.location}</p>
                <p>Budget: ${tuition.budget}</p>
                <p className={`mt-2 font-semibold ${
                  tuition.status === 'Approved'
                    ? 'text-green-600'
                    : tuition.status === 'Pending'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}>
                  Status: {tuition.status}
                </p>
              </div>

              {/* Only allow Edit/Delete for Pending or Rejected */}
              {(tuition.status === 'Pending' || tuition.status === 'Rejected') && (
                <div className="flex justify-end gap-3 mt-4">
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                    <FaEdit /> Edit
                  </button>
                  <button className="flex items-center gap-1 text-red-600 hover:text-red-800">
                    <FaTrash /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      {/* )} */}
    </div>

  )
}

export default MyTuitions
